import { ContentSection } from "@/components/layout/ContentSection";
import AuthProvider from "@/lib/auth/AuthProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 초기 테마를 설정하는 함수

  return (
    <html lang="en" suppressHydrationWarning className="h-full w-full">
      <body className={`${inter.className} h-full w-full`}>
        <AuthProvider>
          <ContentSection>{children}</ContentSection>
        </AuthProvider>
      </body>
    </html>
  );
}
