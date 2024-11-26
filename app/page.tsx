"use client";
import Dots from "@/components/home/Dots";
import Menu from "@/components/home/Menu";

export default function Home() {
  return (
    <div
      className="w-full h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(/nmvfff.png)` }}
    >
      <Menu />
      <Dots />
    </div>
  );
}
