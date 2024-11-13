import React from "react";
import { PersonStanding } from "lucide-react";

export default function Button({
  variant,
  amount,
  onClick,
}: {
  variant: "tardy" | "quick";
  amount: number;
  onClick?: () => void;
}) {
  const quickStyle = "bg-[#4FB268] text-[#00FF73]";
  const tardy = "bg-[#B24F50] text-[#FF7684]";

  return (
    <button
      className={`px-2 py-1 border gap-2 flex rounded-lg items-center text-2xl ${
        variant == "quick" ? quickStyle : tardy
      }`}
      onClick={onClick}
    >
      <PersonStanding />
      <p className="font-semibold">{amount}</p>
    </button>
  );
}
