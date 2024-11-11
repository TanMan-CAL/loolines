import { PersonStanding } from "lucide-react";
import React from "react";

export default function Restaurant({
  name,
  times,
  amount,
}: {
  name: string;
  times: string;
  amount: number;
}) {
  return (
    <div className="flex items-center w-[420px] justify-between">
      <div className="flex flex-col">
        <p className="text-[16px] font-medium">{name}</p>
        <p className="text-[#434242]">{times}</p>
      </div>

      <div className="px-2 py-1 border gap-2 flex rounded-lg items-center bg-[#4FB268] ">
        <PersonStanding color="#00FF73" />
        <p className="text-[24px] text-[#00FF73] font-semibold">{amount}</p>
      </div>
    </div>
  );
}
