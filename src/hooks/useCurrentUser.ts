import { usersService } from "@/services";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setUserState } from "@/lib/redux/features/user/userSlice";
import { toast } from "sonner";
import useLoading from "./useLoading";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { z } from "zod";
import { AccountFormSchema } from "@/lib/schemas";

export const useCurrentUser = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { loading } = useLoading();
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

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

  const _handleUploadFile = (folder: string, file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, `/${folder}/${file.name}-${v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
          console.log(progress);

          switch (snapshot.state) {
            case "paused":
              setUploadStatus("paused");
            // break;
            case "running":
              setUploadStatus("uploading...");
            // break;
            case "canceled":
              setUploadStatus("cancelled");
            // break;
            case "error":
              setUploadStatus("error");
            // break;
            case "success":
              setUploadStatus("success");
            // break;
          }
        },
        (error) => {
          toast.error(error.message, { position: "top-center" });
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((error: any) => {
              toast.error(error.message);
              reject(error);
            });
        }
      );
    });
  };

  return {
    user,
    loading,
    uploadProgress,
    uploadStatus,
    fetchUserProfile,
    updateUserProfile
  };
};
