import type { Metadata } from "next";
import "../globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "sonner";
import SessionProvider from "@/providers/SessionProvider";
import Sidebar from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Nav from "@/components/nav";
import RQProvider from "@/providers/rq-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NaviGO - SUPER ADMIN",
  description: "NaviGO - Admin",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.svg",
        href: "/favicon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.svg",
        href: "/favicon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "w-full min-h-screen bg-background antialiased",
          fontSans.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StoreProvider>
            <SessionProvider>
              <RQProvider>
                <main className="w-full h-full max-h-screen overflow-y-hidden flex justify-between px-6">
                  <Sidebar />
                  <div className="w-[83%] h-full flex flex-col">
                    <Nav />
                    <ScrollArea className="w-full h-[90vh] !no-scrollbar">
                      {children}
                    </ScrollArea>
                  </div>
                </main>
              </RQProvider>
            </SessionProvider>
          </StoreProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
