"use client";
import Image from "next/image";
import Restaurant from "../components/Restaurant";
import { restaurants_slc } from "@/constants/restaurants";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

interface CustomerData {
  restaurants: string;
  customers: number;
}

export default function Home() {
  const [count, setCount] = useState<number | null>(null); // Initialize count

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
        },
        (payload: any) => {
          console.log("Received payload:", payload);
          const updatedData: CustomerData = payload.new; // Assuming 'new' contains the updated row
          setCount(updatedData.customers); // Update count with the new customer data
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-dvh gap-2 p-8">
      <div className="flex place-items-baseline gap-2">
        <h1 className="text-[64px]">12:30</h1>
        <h2 className="text-[32px]">loolines</h2>
      </div>

      <div className="flex flex-col gap-4">
        {restaurants_slc.map((restaurant) => (
          <Restaurant
            key={restaurant.name}
            name={restaurant.name}
            times={restaurant.hours}
            amount={12}
          />
        ))}
      </div>
      <div className="flex justify-center p-4 bg-green-200">
        <p className="text-xl justify-center">
          Number of people: {count !== null ? count : "Loading..."}
        </p>
      </div>
    </div>
  );
}
