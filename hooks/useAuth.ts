import { firebaseConfig } from "@/lib/firebase";
import { authService } from "@/services";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useLoading from "./useLoading";

const useAuth = () => {
  const { loading, withLoading } = useLoading();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const logout = (message?: string) => {
    return withLoading(async () => {
      const currentUser = Cookies.get("currentUser");
      const tokens = currentUser ? JSON.parse(currentUser).tokens : null;

      if (tokens) {
        const response = await authService.logout(tokens.accessToken);

        if (response.status == 200) {
          Cookies.remove("currentUser", {
            domain:
              process.env.NODE_ENV === "production"
                ? process.env.NEXT_PUBLIC_DOMAIN_NAME
                : "",
            path: "/",
          });

          toast.success(message || "Logged out successfully!", {
            position: "top-center",
          });

          window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}?redirect_uri=${window.location.href}`;
          return;
        } else {
          toast.error("Failed to logout, try again later...");
        }
      } else {
        toast.error("No valid session found to logout.");
      }
    });
  };

  const logoutGoogle = () => auth.signOut();

  return {
    logout,
    logoutGoogle,
    loading,
  };
};

export default useAuth;
