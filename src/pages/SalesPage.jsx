import { httpsCallable } from 'firebase/functions';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import SalesModal from '../components/SalesModal';
import { useAuth } from '../contexts/AuthContext';
import { db, functions } from '../services/firebase';
import { validateOneDecimal } from '../utils/validation';

export default function SalesPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({ cuff_enabled: false });
  const [form, setForm] = useState({ type: 'hard', product_id: '', quantity: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const productSnap = await getDocs(collection(db, 'products'));
      setProducts(productSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      const settingsSnap = await getDocs(query(collection(db, 'settings'), limit(1)));
      if (!settingsSnap.empty) setSettings(settingsSnap.docs[0].data());
    }
    load();
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((p) => p.type === form.type),
    [products, form.type],
  );

  const submitSale = async ({ cuff, amount_received }) => {
    setError('');
    try {
      const geolocation = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000 },
        ),
      );

      const fn = httpsCallable(functions, 'createSale');
      await fn({
        user_id: user.uid,
        product_id: form.product_id,
        quantity: Number(form.quantity),
        amount_received,
        cuff,
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
        personal_use: false,
      });
      setModalOpen(false);
      setForm({ type: form.type, product_id: '', quantity: '' });
    } catch (e) {
      setError(e.message || 'Sale failed.');
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Fast Sale Entry</h1>
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Product Type
            <select
              className="mt-1 w-full rounded border p-2"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value, product_id: '' }))}
            >
              <option value="hard">Hard</option>
              <option value="soft">Soft</option>
            </select>
          </label>
          <label className="text-sm">
            Product
            <select
              className="mt-1 w-full rounded border p-2"
              value={form.product_id}
              onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))}
            >
              <option value="">Select product</option>
              {filteredProducts.map((p) => (
                <option value={p.id} key={p.id}>{p.name} ({p.total_quantity})</option>
              ))}
            </select>
          </label>
          <label className="text-sm md:col-span-2">
            Quantity (1 decimal max)
            <input
              type="text"
              className="mt-1 w-full rounded border p-2"
              value={form.quantity}
              onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
            />
          </label>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          className="mt-4 w-full rounded bg-emerald-600 py-2 text-white"
          onClick={() => {
            if (!form.product_id || !validateOneDecimal(form.quantity)) {
              setError('Select product and enter valid quantity (1 decimal max).');
              return;
            }
            setModalOpen(true);
          }}
        >
          Continue to Payment
        </button>
      </div>
      <SalesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cuffEnabled={settings.cuff_enabled}
        onSubmit={submitSale}
      />
    </section>
  );
}
