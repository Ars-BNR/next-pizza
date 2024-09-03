import { Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Главная",
  description: "Когда вкуснее некуда",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header hasCart={true} hasSearch={true} />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
