export default function SalesModal({ open, onClose, cuffEnabled, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
        <h2 className="text-lg font-semibold">Payment details</h2>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const cuff = fd.get('cuff') === 'on';
            const amount = cuff ? 0 : Number(fd.get('amount_received'));
            onSubmit({ cuff, amount_received: amount });
          }}
        >
          <label className="block text-sm">
            Amount received
            <input
              type="number"
              step="0.01"
              min="0"
              name="amount_received"
              className="mt-1 w-full rounded border p-2"
              disabled={cuffEnabled === true ? false : true}
              required
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="cuff" disabled={!cuffEnabled} />
            Mark as CUFF (unpaid)
          </label>
          {!cuffEnabled && <p className="text-xs text-amber-600">CUFF is disabled by admin settings.</p>}
          <div className="flex justify-end gap-2">
            <button type="button" className="rounded border px-3 py-1" onClick={onClose}>Cancel</button>
            <button type="submit" className="rounded bg-emerald-600 px-3 py-1 text-white">Save sale</button>
          </div>
        </form>
      </div>
    </div>
  );
}
