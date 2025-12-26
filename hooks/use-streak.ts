// import { useState, useEffect, useCallback } from "react";

// const API_URL = "http://localhost:3000"; 

// export function useStreak(userId: string) {
//   const [heatmap, setHeatmap] = useState<Record<string, number>>({});
//   const [streak, setStreak] = useState(0);

//   const fetchStreak = useCallback(async () => {
//     try {
//       const res = await fetch(`${API_URL}/streak/${userId}`);
//       const data = await res.json();
//       setHeatmap(data);
//     } catch (e) {
//       console.error("Failed to fetch streak", e);
//     }
//   }, [userId]);

//   const logActivity = async () => {
//     try {
//       const today = new Date().toISOString().split("T")[0];
//       setHeatmap(prev => ({ ...prev, [today]: (prev[today] || 0) + 1 }));

//       await fetch(`${API_URL}/streak/log`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: parseInt(userId) }),
//       });
      
//       fetchStreak(); 
//     } catch (e) {
//       console.error("Failed to log activity", e);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchStreak();
//   }, [userId, fetchStreak]);

//   return { heatmap, logActivity };
// }
import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3000";

export interface HeatmapData {
  [date: string]: number;
}

export function useStreak(userId: string) {
  const [heatmap, setHeatmap] = useState<HeatmapData>({});
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHeatmap = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/streak/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch heatmap");

      const data: HeatmapData = await res.json();
      setHeatmap(data);
    } catch (err) {
      console.error("useStreak: fetchHeatmap failed", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const logActivity = useCallback(async () => {
    if (!userId) return;

    const today = new Date().toISOString().split("T")[0];

    setHeatmap((prev) => ({
      ...prev,
      [today]: (prev[today] || 0) + 1,
    }));

    try {
      const res = await fetch(`${API_URL}/streak/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: Number(userId) }),
      });

      if (!res.ok) throw new Error("Failed to log activity");

      const result = await res.json();

      if (typeof result.streak === "number") {
        setCurrentStreak(result.streak);
      }

      fetchHeatmap();
    } catch (err) {
      console.error("useStreak: logActivity failed", err);
    }
  }, [userId, fetchHeatmap]);

  useEffect(() => {
    fetchHeatmap();
  }, [fetchHeatmap]);

  return {
    heatmap,
    currentStreak,
    loading,
    logActivity,
    refresh: fetchHeatmap,
  };
}
