"use client";
import { restaurants_slc } from "@/constants/restaurants";
import { createSupabaseClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";
import RestaurantChip from "../ui/RestaurantChip";
import { useRestaurant } from "@/lib/supabase/useRestaurant";
import PredictionChip from "../ui/PredictionChip";
const supabase = createSupabaseClient();
interface CustomerData {
  restaurant: string;
  count: number;
}
//bg-[#f8f8f8]

export default function Menu() {
  const { getLatestCustomers } = useRestaurant();
  const [count, setCount] = useState<number>(0); // Initialize count
  const [time, setTime] = useState<string>("00:00");

  useEffect(() => {
    getLatestCustomers().then((data) => setCount(data[0].count));

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT", //from updated
          schema: "public",
          table: "customersRealTime", //new db
        },
        (payload: any) => {
          console.log("Received payload:", payload);
          const updatedData: CustomerData = payload.new;
          setCount(updatedData.count);
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
    <div className="z-50 flex flex-col gap-2 p-3 md:p-6 pt-4 border w-full md:w-fit rounded-lg bg-[#1b1c25] border-[#151515]">
      <div className="flex place-items-baseline gap-2">
        <h1 className="font-mono text-[44px] md:text-[50px] text-white">
          {time}
        </h1>
        <h2 className="text-[38px] md:text-[40px] text-white">iwantTimmies</h2>
      </div>

      <RestaurantChip
        key={"Tim Hortons SLC"}
        name={"Tim Hortons SLC"}
        times={"10:00 - 19:30"}
        count={count}
      />
    </div>
  );
}
