const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.createSale = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  }

  const {
    user_id,
    product_id,
    quantity,
    amount_received,
    cuff,
    latitude,
    longitude,
    personal_use = false,
  } = data;

  if (!/^\d+(\.\d)?$/.test(String(quantity))) {
    throw new functions.https.HttpsError('invalid-argument', 'Quantity must have max 1 decimal.');
  }

  return db.runTransaction(async (trx) => {
    const productRef = db.collection('products').doc(product_id);
    const settingsRef = db.collection('settings').limit(1);
    const userRef = db.collection('users').doc(context.auth.uid);

    const [productSnap, settingsSnap, userSnap] = await Promise.all([
      trx.get(productRef),
      trx.get(settingsRef),
      trx.get(userRef),
    ]);

    if (!productSnap.exists) throw new functions.https.HttpsError('not-found', 'Product not found');
    if (!userSnap.exists) throw new functions.https.HttpsError('permission-denied', 'User profile missing');

    const role = userSnap.data().role;
    if (!['admin', 'worker'].includes(role)) {
      throw new functions.https.HttpsError('permission-denied', 'Role unauthorized');
    }

    const product = productSnap.data();
    const settings = settingsSnap.empty
      ? { cuff_enabled: false, commission_type: 'percentage', commission_value: 0, personal_use_discount: 1 }
      : settingsSnap.docs[0].data();

    if (cuff && !settings.cuff_enabled) {
      throw new functions.https.HttpsError('failed-precondition', 'Cuff disabled.');
    }

    const qty = Number(quantity);
    if (Number(product.total_quantity) - qty < 0) {
      throw new functions.https.HttpsError('failed-precondition', 'Insufficient inventory.');
    }

    const unitPrice = personal_use
      ? Number(product.cost_price) * Number(settings.personal_use_discount)
      : Number(product.sell_price);
    const total_expected = Number((qty * unitPrice).toFixed(2));

    let commission = 0;
    if (settings.commission_type === 'percentage') {
      commission = Number((total_expected * Number(settings.commission_value || 0)).toFixed(2));
    } else {
      commission = Number(settings.commission_value || 0);
    }

    const saleRef = db.collection('sales').doc();
    trx.set(saleRef, {
      user_id: user_id || context.auth.uid,
      product_id,
      type: product.type,
      quantity: qty,
      total_expected,
      amount_received: cuff ? 0 : Number(amount_received || 0),
      cuff: Boolean(cuff),
      latitude,
      longitude,
      commission,
      personal_use,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    trx.update(productRef, {
      total_quantity: Number((Number(product.total_quantity) - qty).toFixed(1)),
    });

    trx.set(db.collection('inventory_logs').doc(), {
      product_id,
      change_amount: -qty,
      reason: personal_use ? 'personal_use' : 'sale',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { ok: true, total_expected, commission };
  });
});
