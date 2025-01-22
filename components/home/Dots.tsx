"use client";
import React, { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useRestaurant } from "@/lib/supabase/useRestaurant";

const supabase = createSupabaseClient();

export default function Dots() {
  const { getLatestCustomers } = useRestaurant();
  const [count, setCount] = useState<number>(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Fetch initial count
    getLatestCustomers().then((data) => {
      if (data && data.length > 0) {
        const customerCount = Math.min(data[0].count, 80);
        setCount(customerCount);
        generateRandomPositions(customerCount);
      }
    });

    // Subscribe to real-time updates
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT", //from Updated
          schema: "public",
          table: "customersRealTime", //new db
        },
        (payload) => {
          const updatedCount = Math.min(payload.new.count, 50);
          setCount(updatedCount);
          generateRandomPositions(updatedCount);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Generate random positions for dots
  const generateRandomPositions = (dotCount: number) => {
    const newPositions = Array.from({ length: dotCount }, () => ({
      x: 50 + Math.random() * 40, // Random percentage for X
      y: 20 + Math.random() * 20, // Random percentage for Y
    }));
    setPositions(newPositions);
  };

  return (
    <div className="absolute inset-0">
      {positions.map((pos, index) => (
        <div
          key={index}
          className={`absolute rounded-full border-2 ${
            count <= 30
              ? "bg-spotGreen border-borderGreen"
              : "bg-spotRed border-borderRed"
          }`}
          style={{
            width: "20px",
            height: "20px",
            left: `${pos.x}%`,
            bottom: `${pos.y}%`,
          }}
        />
      ))}
    </div>
  );
}
