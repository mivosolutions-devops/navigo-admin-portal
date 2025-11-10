// useCurrentUser.ts

import { authService, usersService } from "@/services";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setUserState } from "@/lib/redux/features/user/userSlice";
import { toast } from "sonner";
import useLoading from "./useLoading";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import { z } from "zod";
import { AccountFormSchema } from "@/lib/schemas";

export const useCurrentUser = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { loading, withLoading } = useLoading();
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const fetchUserProfile = async () => {
    try {
      const response = await usersService.getMe({});
      if (response && response.status === 200) {
        const { profile } = response.data;
        const { phoneNumber, email, firstName, lastName } = profile.account;
        const { profilePicture, roles } = profile;
        dispatch(
          setUserState({
            ...user,
            phoneNumber,
            email,
            firstName,
            lastName,
            roles,
            profilePicture,
          }),
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
    profilePicture,
  }: z.infer<typeof AccountFormSchema>) => {
    try {
      return withLoading(async () => {
        if (profilePicture) {
          const uploadURL = (await handleUploadFile(
            "Profile-Images",
            profilePicture,
          )) as string;
          if (!firstName && !lastName && !email && !phoneNumber) {
            const response = await authService.updateProfilePicture(
              uploadURL,
              process.env.NEXT_PUBLIC_API_BASE_URL!,
            );
            if (response.status === 200) {
              toast.success("successfully updated the profile picture!!", {
                position: "top-center",
              });
            } else {
              throw new Error("Failed to update the profile picture!!");
            }
          } else {
            const responses = await Promise.allSettled([
              authService.updateProfilePicture(
                uploadURL,
                process.env.NEXT_PUBLIC_API_BASE_URL!,
              ),
              authService.updateUserProfile(
                { firstName, lastName, email, phoneNumber },
                user,
              ),
            ]);
            console.log(responses);
          }
        } else {
          if (firstName || lastName || email || phoneNumber) {
            const response = await authService.updateUserProfile(
              { firstName, lastName, email, phoneNumber },
              user,
            );
            if (response.status === 200) {
              toast.success("successfully updated the your profile data!!", {
                position: "top-center",
              });
            } else {
              throw new Error("Failed to update your profile data");
            }
          }
        }
      });
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  const handleUploadFile = (folder: string, file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, `/${folder}/${file.name}-${v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
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
        },
      );
    });
  };

  return {
    user,
    loading,
    uploadProgress,
    uploadStatus,
    fetchUserProfile,
    updateUserProfile,
  };
};
