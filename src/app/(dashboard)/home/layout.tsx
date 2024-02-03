import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'home',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}
