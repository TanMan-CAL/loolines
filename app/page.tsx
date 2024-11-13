import Image from "next/image";
import Restaurant from "../components/Restaurant";
import { restaurants_slc } from "@/constants/restaurants";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-dvh gap-2 p-8">
      <div className="flex place-items-baseline gap-2">
        <h1 className="text-[64px]">12:30</h1>
        <h2 className="text-[32px]">loolines</h2>
      </div>

      <div className="flex flex-col gap-4">
        {restaurants_slc.map((restaurant) => (
          <Restaurant
            name={restaurant.name}
            times={restaurant.hours}
            amount={12}
          />
        ))}
      </div>
    </div>
  );
}
