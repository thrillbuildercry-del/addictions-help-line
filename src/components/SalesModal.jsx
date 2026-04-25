<<<<<<< Updated upstream
import { useState } from 'react';

=======
<<<<<<< ours
>>>>>>> Stashed changes
export default function SalesModal({ open, onClose, cuffEnabled, onSubmit }) {
  const [cuff, setCuff] = useState(false);

  if (!open) return null;

  return (
<<<<<<< Updated upstream
=======
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
        <h2 className="text-lg font-semibold">Payment details</h2>
=======
import { useState } from 'react';

export default function SalesModal({ open, onClose, cuffEnabled, onSubmit }) {
  const [cuff, setCuff] = useState(false);

  if (!open) return null;

  return (
>>>>>>> Stashed changes
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/60 p-3 sm:items-center">
      <div className="glass-card w-full max-w-md p-5">
        <h2 className="text-lg font-semibold text-white">Payment details</h2>
        <p className="mt-1 text-sm text-slate-300">Capture payment received or mark as CUFF.</p>

<<<<<<< Updated upstream
=======
>>>>>>> theirs
>>>>>>> Stashed changes
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
<<<<<<< Updated upstream
=======
<<<<<<< ours
            const cuff = fd.get('cuff') === 'on';
>>>>>>> Stashed changes
            const amount = cuff ? 0 : Number(fd.get('amount_received'));
            onSubmit({ cuff, amount_received: amount });
            setCuff(false);
          }}
        >
<<<<<<< Updated upstream
          <label className="block text-sm text-slate-200">
=======
          <label className="block text-sm">
=======
            const amount = cuff ? 0 : Number(fd.get('amount_received'));
            onSubmit({ cuff, amount_received: amount });
            setCuff(false);
          }}
        >
          <label className="block text-sm text-slate-200">
>>>>>>> theirs
>>>>>>> Stashed changes
            Amount received
            <input
              type="number"
              step="0.01"
              min="0"
              name="amount_received"
<<<<<<< Updated upstream
              className="field-input"
              disabled={cuff}
              required={!cuff}
=======
<<<<<<< ours
              className="mt-1 w-full rounded border p-2"
              disabled={cuffEnabled === true ? false : true}
              required
>>>>>>> Stashed changes
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" checked={cuff} onChange={(e) => setCuff(e.target.checked)} disabled={!cuffEnabled} />
            Mark as CUFF (unpaid)
          </label>

          {!cuffEnabled && <p className="text-xs text-amber-300">CUFF is disabled by admin settings.</p>}

          <div className="flex justify-end gap-2">
<<<<<<< Updated upstream
=======
            <button type="button" className="rounded border px-3 py-1" onClick={onClose}>Cancel</button>
            <button type="submit" className="rounded bg-emerald-600 px-3 py-1 text-white">Save sale</button>
=======
              className="field-input"
              disabled={cuff}
              required={!cuff}
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" checked={cuff} onChange={(e) => setCuff(e.target.checked)} disabled={!cuffEnabled} />
            Mark as CUFF (unpaid)
          </label>

          {!cuffEnabled && <p className="text-xs text-amber-300">CUFF is disabled by admin settings.</p>}

          <div className="flex justify-end gap-2">
>>>>>>> Stashed changes
            <button type="button" className="btn-secondary" onClick={() => { setCuff(false); onClose(); }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save sale
            </button>
<<<<<<< Updated upstream
=======
>>>>>>> theirs
>>>>>>> Stashed changes
          </div>
        </form>
      </div>
    </div>
  );
}
