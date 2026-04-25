import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../services/firebase';

const defaultProduct = { name: '', type: 'hard', total_quantity: 0, cost_price: 0, sell_price: 0 };

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [settingsDocId, setSettingsDocId] = useState('');
  const [settings, setSettings] = useState({ cuff_enabled: true, commission_type: 'percentage', commission_value: 0.1, personal_use_discount: 0.1 });

  async function refresh() {
    const [productsSnap, salesSnap, settingsSnap] = await Promise.all([
      getDocs(collection(db, 'products')),
      getDocs(collection(db, 'sales')),
      getDocs(collection(db, 'settings')),
    ]);
    setProducts(productsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setSales(salesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    if (!settingsSnap.empty) {
      setSettingsDocId(settingsSnap.docs[0].id);
      setSettings(settingsSnap.docs[0].data());
    }
  }

<<<<<<< Updated upstream
  useEffect(() => {
    refresh();
  }, []);
=======
<<<<<<< ours
  useEffect(() => { refresh(); }, []);
=======
  useEffect(() => {
    refresh();
  }, []);
>>>>>>> theirs
>>>>>>> Stashed changes

  const dashboard = useMemo(() => {
    const totalExpected = sales.reduce((sum, s) => sum + Number(s.total_expected || 0), 0);
    const totalReceived = sales.reduce((sum, s) => sum + Number(s.amount_received || 0), 0);
    const cuffOutstanding = sales.filter((s) => s.cuff).reduce((sum, s) => sum + Number(s.total_expected || 0), 0);
    const remainingInventory = products.reduce((sum, p) => sum + Number(p.total_quantity || 0), 0);
    return { totalExpected, totalReceived, cuffOutstanding, remainingInventory };
  }, [sales, products]);

  return (
    <section className="space-y-4">
<<<<<<< Updated upstream
      <div>
        <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-300">Manage settings, products, and monitor sales performance.</p>
=======
<<<<<<< ours
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="grid gap-3 md:grid-cols-4">
        <Stat label="Expected" value={dashboard.totalExpected} />
        <Stat label="Received" value={dashboard.totalReceived} />
        <Stat label="Cuff Outstanding" value={dashboard.cuffOutstanding} />
        <Stat label="Inventory Remaining" value={dashboard.remainingInventory} />
>>>>>>> Stashed changes
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <Stat label="Expected" value={dashboard.totalExpected} />
        <Stat label="Received" value={dashboard.totalReceived} />
        <Stat label="CUFF Outstanding" value={dashboard.cuffOutstanding} />
        <Stat label="Inventory" value={dashboard.remainingInventory} />
      </div>

      <div className="glass-card">
        <h2 className="font-semibold text-white">Settings</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm flex items-center gap-2 text-slate-200">
            <input type="checkbox" checked={settings.cuff_enabled} onChange={(e) => setSettings((s) => ({ ...s, cuff_enabled: e.target.checked }))} />
            Enable CUFF
          </label>
<<<<<<< Updated upstream
          <label className="text-sm text-slate-200">
            Commission Type
            <select className="field-input" value={settings.commission_type} onChange={(e) => setSettings((s) => ({ ...s, commission_type: e.target.value }))}>
=======
          <label className="text-sm">Commission Type
            <select className="mt-1 w-full rounded border p-2" value={settings.commission_type} onChange={(e) => setSettings((s) => ({ ...s, commission_type: e.target.value }))}>
=======
      <div>
        <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-300">Manage settings, products, and monitor sales performance.</p>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <Stat label="Expected" value={dashboard.totalExpected} />
        <Stat label="Received" value={dashboard.totalReceived} />
        <Stat label="CUFF Outstanding" value={dashboard.cuffOutstanding} />
        <Stat label="Inventory" value={dashboard.remainingInventory} />
      </div>

      <div className="glass-card">
        <h2 className="font-semibold text-white">Settings</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="text-sm flex items-center gap-2 text-slate-200">
            <input type="checkbox" checked={settings.cuff_enabled} onChange={(e) => setSettings((s) => ({ ...s, cuff_enabled: e.target.checked }))} />
            Enable CUFF
          </label>
          <label className="text-sm text-slate-200">
            Commission Type
            <select className="field-input" value={settings.commission_type} onChange={(e) => setSettings((s) => ({ ...s, commission_type: e.target.value }))}>
>>>>>>> theirs
>>>>>>> Stashed changes
              <option value="percentage">percentage</option>
              <option value="flat">flat</option>
            </select>
          </label>
<<<<<<< Updated upstream
          <label className="text-sm text-slate-200">
            Commission Value
            <input className="field-input" type="number" step="0.01" value={settings.commission_value} onChange={(e) => setSettings((s) => ({ ...s, commission_value: Number(e.target.value) }))} />
=======
<<<<<<< ours
          <label className="text-sm">Commission Value
            <input className="mt-1 w-full rounded border p-2" type="number" step="0.01" value={settings.commission_value} onChange={(e) => setSettings((s) => ({ ...s, commission_value: Number(e.target.value) }))} />
>>>>>>> Stashed changes
          </label>
          <label className="text-sm text-slate-200">
            Personal Use Discount
            <input className="field-input" type="number" step="0.01" value={settings.personal_use_discount} onChange={(e) => setSettings((s) => ({ ...s, personal_use_discount: Number(e.target.value) }))} />
          </label>
        </div>
        <button
          className="btn-primary mt-3"
          onClick={async () => {
            if (settingsDocId) await updateDoc(doc(db, 'settings', settingsDocId), settings);
          }}
<<<<<<< Updated upstream
        >
          Save settings
        </button>
=======
        >Save settings</button>
=======
          <label className="text-sm text-slate-200">
            Commission Value
            <input className="field-input" type="number" step="0.01" value={settings.commission_value} onChange={(e) => setSettings((s) => ({ ...s, commission_value: Number(e.target.value) }))} />
          </label>
          <label className="text-sm text-slate-200">
            Personal Use Discount
            <input className="field-input" type="number" step="0.01" value={settings.personal_use_discount} onChange={(e) => setSettings((s) => ({ ...s, personal_use_discount: Number(e.target.value) }))} />
          </label>
        </div>
        <button
          className="btn-primary mt-3"
          onClick={async () => {
            if (settingsDocId) await updateDoc(doc(db, 'settings', settingsDocId), settings);
          }}
        >
          Save settings
        </button>
>>>>>>> theirs
>>>>>>> Stashed changes
      </div>

      <ProductManager onAdded={refresh} />

<<<<<<< Updated upstream
      <div className="glass-card">
        <h2 className="font-semibold text-white">All sales</h2>
=======
<<<<<<< ours
      <div className="rounded-xl bg-white p-4 shadow">
        <h2 className="font-semibold">All sales</h2>
>>>>>>> Stashed changes
        <div className="mt-3 overflow-auto text-sm">
          <table className="min-w-full text-slate-200">
            <thead>
              <tr className="text-slate-400">
                <th className="px-2 py-1 text-left">Product</th>
                <th className="px-2 py-1 text-left">Qty</th>
                <th className="px-2 py-1 text-left">Expected</th>
                <th className="px-2 py-1 text-left">Received</th>
                <th className="px-2 py-1 text-left">CUFF</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
<<<<<<< Updated upstream
=======
                <tr key={s.id} className="border-t">
                  <td>{s.product_id}</td><td>{s.quantity}</td><td>{s.total_expected}</td><td>{s.amount_received}</td><td>{s.cuff ? 'Yes' : 'No'}</td>
=======
      <div className="glass-card">
        <h2 className="font-semibold text-white">All sales</h2>
        <div className="mt-3 overflow-auto text-sm">
          <table className="min-w-full text-slate-200">
            <thead>
              <tr className="text-slate-400">
                <th className="px-2 py-1 text-left">Product</th>
                <th className="px-2 py-1 text-left">Qty</th>
                <th className="px-2 py-1 text-left">Expected</th>
                <th className="px-2 py-1 text-left">Received</th>
                <th className="px-2 py-1 text-left">CUFF</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
>>>>>>> Stashed changes
                <tr key={s.id} className="border-t border-white/10">
                  <td className="px-2 py-1">{s.product_id}</td>
                  <td className="px-2 py-1">{s.quantity}</td>
                  <td className="px-2 py-1">{s.total_expected}</td>
                  <td className="px-2 py-1">{s.amount_received}</td>
                  <td className="px-2 py-1">{s.cuff ? 'Yes' : 'No'}</td>
<<<<<<< Updated upstream
=======
>>>>>>> theirs
>>>>>>> Stashed changes
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProductManager({ onAdded }) {
  const [product, setProduct] = useState(defaultProduct);

  return (
<<<<<<< Updated upstream
    <div className="glass-card">
      <h2 className="font-semibold text-white">Products (CRUD + inventory adjust)</h2>
=======
<<<<<<< ours
    <div className="rounded-xl bg-white p-4 shadow">
      <h2 className="font-semibold">Products (CRUD + inventory adjust)</h2>
>>>>>>> Stashed changes
      <div className="mt-3 grid gap-2 md:grid-cols-5">
        <input className="field-input" placeholder="Name" value={product.name} onChange={(e) => setProduct((p) => ({ ...p, name: e.target.value }))} />
        <select className="field-input" value={product.type} onChange={(e) => setProduct((p) => ({ ...p, type: e.target.value }))}>
          <option value="hard">hard</option>
          <option value="soft">soft</option>
        </select>
        <input className="field-input" type="number" placeholder="Qty" value={product.total_quantity} onChange={(e) => setProduct((p) => ({ ...p, total_quantity: Number(e.target.value) }))} />
        <input className="field-input" type="number" placeholder="Cost" value={product.cost_price} onChange={(e) => setProduct((p) => ({ ...p, cost_price: Number(e.target.value) }))} />
        <input className="field-input" type="number" placeholder="Sell" value={product.sell_price} onChange={(e) => setProduct((p) => ({ ...p, sell_price: Number(e.target.value) }))} />
      </div>
      <button
<<<<<<< Updated upstream
        className="btn-primary mt-3"
=======
        className="mt-3 rounded bg-emerald-600 px-3 py-1 text-white"
=======
    <div className="glass-card">
      <h2 className="font-semibold text-white">Products (CRUD + inventory adjust)</h2>
      <div className="mt-3 grid gap-2 md:grid-cols-5">
        <input className="field-input" placeholder="Name" value={product.name} onChange={(e) => setProduct((p) => ({ ...p, name: e.target.value }))} />
        <select className="field-input" value={product.type} onChange={(e) => setProduct((p) => ({ ...p, type: e.target.value }))}>
          <option value="hard">hard</option>
          <option value="soft">soft</option>
        </select>
        <input className="field-input" type="number" placeholder="Qty" value={product.total_quantity} onChange={(e) => setProduct((p) => ({ ...p, total_quantity: Number(e.target.value) }))} />
        <input className="field-input" type="number" placeholder="Cost" value={product.cost_price} onChange={(e) => setProduct((p) => ({ ...p, cost_price: Number(e.target.value) }))} />
        <input className="field-input" type="number" placeholder="Sell" value={product.sell_price} onChange={(e) => setProduct((p) => ({ ...p, sell_price: Number(e.target.value) }))} />
      </div>
      <button
        className="btn-primary mt-3"
>>>>>>> theirs
>>>>>>> Stashed changes
        onClick={async () => {
          await addDoc(collection(db, 'products'), product);
          setProduct(defaultProduct);
          onAdded();
        }}
<<<<<<< Updated upstream
      >
        Create product
      </button>
=======
<<<<<<< ours
      >Create product</button>
=======
      >
        Create product
      </button>
>>>>>>> theirs
>>>>>>> Stashed changes
    </div>
  );
}

function Stat({ label, value }) {
<<<<<<< Updated upstream
=======
<<<<<<< ours
  return <div className="rounded-xl bg-white p-4 shadow"><div className="text-xs text-slate-500">{label}</div><div className="text-xl font-bold">{Number(value).toFixed(2)}</div></div>;
=======
>>>>>>> Stashed changes
  return (
    <div className="glass-card p-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-lg font-bold text-white">{Number(value).toFixed(2)}</div>
    </div>
  );
<<<<<<< Updated upstream
=======
>>>>>>> theirs
>>>>>>> Stashed changes
}
