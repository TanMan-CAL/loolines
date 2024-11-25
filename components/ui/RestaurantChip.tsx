import React from "react";
import { PersonStanding } from "lucide-react";

function PeopleChip({ count }: { count: number }) {
  const quickStyle = "bg-[#4FB268] text-[#00FF73]";
  const tardyStyle = "bg-[#B24F50] text-[#FF7684]";

  return (
    <div
      className={`px-2 py-1 border gap-2 flex rounded-lg items-center text-2xl ${
        count < 15 ? quickStyle : tardyStyle
      }`}
    >
      <PersonStanding />
      <p className="font-semibold">{count}</p>
    </div>
  );
}

export default function Restaurant({
  name,
  times,
  count,
}: {
  name: string;
  times: string;
  count: number;
}) {
  return (
    <div className="flex items-center w-[420px] justify-between">
      <div className="flex flex-col">
        <p className="text-[16px] font-medium">{name}</p>
        <p className="text-[#5b5b5b]">{times}</p>
      </div>

      <PeopleChip count={count} />
    </div>
  );
}
