import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "NaviGO",
  description: "NaviGO",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function PublicLayout({
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
        {children}
      </body>
    </html>
  );
}
