'use client';

import { LeftBar } from "@/components/leftbar";
import { Navbar } from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const whole_path = usePathname();
  const pathname_map = ['/home', '/assets', '/statistics', '/about'];
  const pathname = pathname_map.find((path) => whole_path.startsWith(path)) as string;

  return (
    <>
        <Navbar />
        <div className="absolute mt-[150px] w-full">
            <LeftBar active={pathname} />
            <div className="ml-[400px]">
              {children}
            </div>
        </div>
    </>
  );
}
