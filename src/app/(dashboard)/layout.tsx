import { LeftBar } from "@/components/left-bar";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar />
        <div className="m-[100px]">
            <LeftBar />
            {children}
        </div>
    </>
  );
}
