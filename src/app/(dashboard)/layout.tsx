"use client";

import Sidebar from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Nav from "@/components/nav";
import RQProvider from "@/providers/rq-provider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useSyncKeycloakUser } from "@/hooks/useSyncKeycloakUser";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Sync Keycloak user data to Redux
  useSyncKeycloakUser();

  return (
    <RQProvider>
      <ProtectedRoute>
        <main className='w-full h-full max-h-screen overflow-y-hidden flex justify-between px-6'>
          <Sidebar />
          <div className='w-[83%] h-full flex flex-col'>
            <Nav />
            <ScrollArea className='w-full h-[90vh] !no-scrollbar'>
              {children}
            </ScrollArea>
          </div>
        </main>
      </ProtectedRoute>
    </RQProvider>
  );
}
