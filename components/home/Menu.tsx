"use client";
import { restaurants_slc } from "@/constants/restaurants";
import { createSupabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import RestaurantChip from "../ui/RestaurantChip";
import { useRestaurant } from "@/lib/supabase/useRestaurant";
const supabase = createSupabaseClient();
interface CustomerData {
  restaurants: string;
  customers: number;
}

export default function Menu() {
  const { getLatestCustomers } = useRestaurant();
  const [count, setCount] = useState<number>(0); // Initialize count
  const [time, setTime] = useState<string>("00:00");

  useEffect(() => {
    getLatestCustomers().then((data) => setCount(data[0].customers));

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "customersAtRestaurantsV2",
        },
        (payload: any) => {
          console.log("Received payload:", payload);
          const updatedData: CustomerData = payload.new;
          setCount(updatedData.customers);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentTime = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="absolute top-4 left-4 z-50 flex flex-col gap-2 p-6 pt-4  border w-fit rounded-lg">
      <div className="flex place-items-baseline gap-3">
        <h1 className="text-[64px]">{time}</h1>
        <h2 className="text-[64px]">loolines</h2>
      </div>

      <RestaurantChip
        key={"Tim Hortons"}
        name={"Tim Hortons"}
        times={"10:00 - 19:30"}
        count={count}
      />
    </div>
  );
}
