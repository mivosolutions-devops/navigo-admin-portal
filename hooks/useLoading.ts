import { useState } from "react";
import { toast } from "sonner";

const useLoading = (initialLoading: boolean = false) => {
  const [loading, setLoading] = useState(initialLoading);

  const withLoading = async <T>(fetchFunction: () => Promise<T>) => {
    try {
      setLoading(true);
      return await fetchFunction();
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data.message ||
            error.message ||
            "Action failed, try again!",
          {
            position: "top-center",
          },
        );
      } else {
        toast.error(
          "Network error, check your internet connection and try again!",
          {
            position: "top-center",
          },
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoading };
};

export default useLoading;
