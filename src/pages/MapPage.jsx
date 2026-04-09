import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
      <h1 className="text-xl font-semibold">Sales Map</h1>
      <p className="text-sm text-slate-600">Map SDK can be plugged in with Mapbox token. Location aggregates shown below.</p>
      <div className="rounded-xl bg-white p-4 shadow">
        {grouped.map((g, i) => (
          <div key={i} className="border-b py-2 text-sm last:border-b-0">
            <div><b>Lat/Lng:</b> {g.latitude}, {g.longitude}</div>
            <div><b>Sales:</b> {g.count}</div>
            <div><b>Total revenue:</b> {g.revenue.toFixed(2)}</div>
          </div>
        ))}
        {grouped.length === 0 && <p className="text-sm">No geotagged sales yet.</p>}
      </div>
    </section>
  );
}
