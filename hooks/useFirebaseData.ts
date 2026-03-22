// hooks/useFirebaseData.ts
"use client";

import { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue, update as fbUpdate } from "firebase/database";

export interface Case {
  id: string;
  callerName: string;
  phone: string;
  transcript: string;
  service: string;
  locationText: string;
  coordinates?: { lat: number; lng: number };
  urgencyScore: number;
  status: "pending" | "dispatched" | "resolved";
  timestamp?: number;
}

export function useFirebaseData() {
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // call this to update a case’s fields
  const updateCase = async (id: string, updates: Partial<Case>) => {
    try {
      await fbUpdate(ref(database, `cases/${id}`), updates);
      return true;
    } catch {
      setError("Failed to update case");
      return false;
    }
  };

  useEffect(() => {
    const casesRef = ref(database, "cases");
    const unsub = onValue(
      casesRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, val]) => ({ id, ...(val as any) })) as Case[];
        setCases(list);
        setIsLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to load cases");
        setIsLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return { cases, isLoading, error, updateCase };
}
