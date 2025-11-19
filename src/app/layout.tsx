import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { KeycloakProvider } from "@/contexts/KeycloakContext";
import StoreProvider from "@/providers/StoreProvider";

export const metadata = {
  title: "NaviGO - Admin Portal",
  description: "NaviGO - Admin Portal",
  icons: {
    icon: "/favicon.ico"
  }
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          "w-full min-h-screen bg-background antialiased",
          fontSans.className
        )}
      >
        <KeycloakProvider>
          <StoreProvider>
            <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </StoreProvider>
        </KeycloakProvider>
      </body>
    </html>
  );
}
