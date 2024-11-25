import React from "react";
import Button from "./ui/Button";

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

      <Button variant={"tardy"} amount={23} />
    </div>
  );
}
