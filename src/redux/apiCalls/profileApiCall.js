import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get User Profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await request.get(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      toast.success(data.message);

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Profile
export function updateProfile(userId, profile) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(
        `/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await request.get(
        `/api/users/count`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get All Users Profile (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const { data } = await request.get(
        `/api/users/profile`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
