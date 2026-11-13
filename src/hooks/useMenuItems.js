import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { MENU_ITEMS } from "@/data/menu";

// The counter's catalog. Falls back to the house list while the kitchen
// database loads (or if it is empty), so the page never renders bare.
export default function useMenuItems() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    base44.entities.Product.list({ sort: "sort_order", limit: 100 })
      .then((result) => {
        const rows = Array.isArray(result) ? result : result?.items || [];
        if (alive && rows.length > 0) setItems(rows);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { items, loading };
}