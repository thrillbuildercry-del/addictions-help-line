import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { db } from '../services/firebase';

export default function MapPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getDocs(collection(db, 'sales')).then((snap) => {
      setSales(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    sales.forEach((s) => {
      if (typeof s.latitude !== 'number' || typeof s.longitude !== 'number') return;
      const key = `${Number(s.latitude).toFixed(4)},${Number(s.longitude).toFixed(4)}`;
      const current = map.get(key) || { count: 0, revenue: 0, latitude: s.latitude, longitude: s.longitude };
      current.count += 1;
      current.revenue += Number(s.amount_received || 0);
      map.set(key, current);
    });
    return [...map.values()];
  }, [sales]);

  return (
    <section className="space-y-3">
      <div>
        <h1 className="text-xl font-semibold text-white">Sales Map</h1>
        <p className="text-sm text-slate-300">Location clusters for recorded sales. Map SDK can be plugged in here.</p>
      </div>

      <div className="glass-card">
        {grouped.map((g, i) => (
          <div key={i} className="border-b border-white/10 py-2 text-sm text-slate-200 last:border-b-0">
            <div>
              <b>Lat/Lng:</b> {g.latitude}, {g.longitude}
            </div>
            <div>
              <b>Sales:</b> {g.count}
            </div>
            <div>
              <b>Total revenue:</b> {g.revenue.toFixed(2)}
            </div>
          </div>
        ))}
        {grouped.length === 0 && <p className="text-sm text-slate-300">No geotagged sales yet.</p>}
      </div>
    </section>
  );
}
