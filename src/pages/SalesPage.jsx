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
<<<<<<< Updated upstream
  const [success, setSuccess] = useState('');
=======
<<<<<<< ours
=======
  const [success, setSuccess] = useState('');
>>>>>>> theirs
>>>>>>> Stashed changes

  useEffect(() => {
    async function load() {
      const productSnap = await getDocs(collection(db, 'products'));
      setProducts(productSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      const settingsSnap = await getDocs(query(collection(db, 'settings'), limit(1)));
      if (!settingsSnap.empty) setSettings(settingsSnap.docs[0].data());
    }
    load();
  }, []);

<<<<<<< Updated upstream
  const filteredProducts = useMemo(() => products.filter((p) => p.type === form.type), [products, form.type]);

  const submitSale = async ({ cuff, amount_received }) => {
    setError('');
    setSuccess('');
=======
<<<<<<< ours
  const filteredProducts = useMemo(
    () => products.filter((p) => p.type === form.type),
    [products, form.type],
  );

  const submitSale = async ({ cuff, amount_received }) => {
    setError('');
=======
  const filteredProducts = useMemo(() => products.filter((p) => p.type === form.type), [products, form.type]);

  const submitSale = async ({ cuff, amount_received }) => {
    setError('');
    setSuccess('');
>>>>>>> theirs
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      setSuccess('Sale saved successfully.');
=======
<<<<<<< ours
=======
      setSuccess('Sale saved successfully.');
>>>>>>> theirs
>>>>>>> Stashed changes
    } catch (e) {
      setError(e.message || 'Sale failed.');
    }
  };

  return (
    <section className="space-y-4">
<<<<<<< Updated upstream
      <div className="glass-card">
        <h1 className="text-xl font-semibold text-white">Fast Sale Entry</h1>
        <p className="mt-1 text-sm text-slate-300">Mobile-friendly quick flow for field workers.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm text-slate-200">
            Product Type
            <select
              className="field-input"
=======
<<<<<<< ours
      <h1 className="text-xl font-semibold">Fast Sale Entry</h1>
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            Product Type
            <select
              className="mt-1 w-full rounded border p-2"
=======
      <div className="glass-card">
        <h1 className="text-xl font-semibold text-white">Fast Sale Entry</h1>
        <p className="mt-1 text-sm text-slate-300">Mobile-friendly quick flow for field workers.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm text-slate-200">
            Product Type
            <select
              className="field-input"
>>>>>>> theirs
>>>>>>> Stashed changes
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value, product_id: '' }))}
            >
              <option value="hard">Hard</option>
              <option value="soft">Soft</option>
            </select>
          </label>
<<<<<<< Updated upstream

          <label className="text-sm text-slate-200">
            Product
            <select
              className="field-input"
=======
<<<<<<< ours
          <label className="text-sm">
            Product
            <select
              className="mt-1 w-full rounded border p-2"
=======

          <label className="text-sm text-slate-200">
            Product
            <select
              className="field-input"
>>>>>>> theirs
>>>>>>> Stashed changes
              value={form.product_id}
              onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))}
            >
              <option value="">Select product</option>
              {filteredProducts.map((p) => (
<<<<<<< Updated upstream
                <option value={p.id} key={p.id}>
                  {p.name} ({p.total_quantity})
                </option>
=======
<<<<<<< ours
                <option value={p.id} key={p.id}>{p.name} ({p.total_quantity})</option>
>>>>>>> Stashed changes
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-200 md:col-span-2">
            Quantity (1 decimal max)
            <input
              type="text"
<<<<<<< Updated upstream
              className="field-input"
=======
              className="mt-1 w-full rounded border p-2"
=======
                <option value={p.id} key={p.id}>
                  {p.name} ({p.total_quantity})
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-200 md:col-span-2">
            Quantity (1 decimal max)
            <input
              type="text"
              className="field-input"
>>>>>>> theirs
>>>>>>> Stashed changes
              value={form.quantity}
              onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
            />
          </label>
        </div>
<<<<<<< Updated upstream

        {error && <p className="mt-3 rounded-xl border border-rose-400/30 bg-rose-400/10 p-2 text-sm text-rose-200">{error}</p>}
        {success && <p className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-2 text-sm text-emerald-200">{success}</p>}

        <button
          className="btn-primary mt-4 w-full"
=======
<<<<<<< ours
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          className="mt-4 w-full rounded bg-emerald-600 py-2 text-white"
=======

        {error && <p className="mt-3 rounded-xl border border-rose-400/30 bg-rose-400/10 p-2 text-sm text-rose-200">{error}</p>}
        {success && <p className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-2 text-sm text-emerald-200">{success}</p>}

        <button
          className="btn-primary mt-4 w-full"
>>>>>>> theirs
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

      <SalesModal open={modalOpen} onClose={() => setModalOpen(false)} cuffEnabled={settings.cuff_enabled} onSubmit={submitSale} />
=======
<<<<<<< ours
      <SalesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cuffEnabled={settings.cuff_enabled}
        onSubmit={submitSale}
      />
=======

      <SalesModal open={modalOpen} onClose={() => setModalOpen(false)} cuffEnabled={settings.cuff_enabled} onSubmit={submitSale} />
>>>>>>> theirs
>>>>>>> Stashed changes
    </section>
  );
}
