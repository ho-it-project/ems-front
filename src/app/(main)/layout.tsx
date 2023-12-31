import { ContentSection } from "@/components/layout/ContentSection";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import LayoutProvider from "@/providers/LayoutProvider";
import { LoadingProvider } from "@/providers/LoadingProvider";
import { SWRProvider } from "@/providers/SwrProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
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
        <SWRProvider>
          <LoadingProvider>
            <LayoutProvider>
              <AuthProvider>
                <LayoutWrapper>
                  <ContentSection>{children}</ContentSection>
                  <Toaster />
                </LayoutWrapper>
              </AuthProvider>
            </LayoutProvider>
          </LoadingProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
