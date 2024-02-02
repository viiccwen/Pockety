import { LeftBar } from "@/components/leftbar";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar />
        <div className="absolute mt-[150px] w-full">
            <LeftBar />
            <div className="ml-[400px]">
              {children}
            </div>
        </div>
    </>
  );
}
