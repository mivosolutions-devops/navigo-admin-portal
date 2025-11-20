import { usersService } from "@/services";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setUserState } from "@/lib/redux/features/user/userSlice";
import { toast } from "sonner";
import useLoading from "./useLoading";
import { z } from "zod";
import { AccountFormSchema } from "@/lib/schemas";

export const useCurrentUser = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { loading } = useLoading();

  const fetchUserProfile = async () => {
    try {
      const response = await usersService.getMe();
      if (response && response.status === 200) {
        const { profile } = response.data;
        const { phoneNumber, email, firstName, lastName } = profile.account;
        const { profilePicture } = profile;
        dispatch(
          setUserState({
            ...user,
            id: user.id || "",
            username: user.username || "",
            email: email || user.email || "",
            emailVerified: user.emailVerified || false,
            firstName: firstName || user.firstName || "",
            lastName: lastName || user.lastName || "",
            phoneNumber: phoneNumber || user.phoneNumber || "",
            profilePicture: profilePicture || user.profilePicture || "",
            roles: user.roles || []
          })
        );
      } else {
        throw new Error("Failed to get user profile, try again later!!");
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  const updateUserProfile = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    profilePicture
  }: z.infer<typeof AccountFormSchema>) => {
    console.log(firstName, lastName, email, phoneNumber, profilePicture);
    // Profile update functionality removed - auth service no longer available
    toast.error("Profile update functionality is not available", {
      position: "top-center"
    });
  };

  return {
    user,
    loading,
    fetchUserProfile,
    updateUserProfile
  };
};
