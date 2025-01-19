import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User
export function loginUser(user) {
    return async (dispatch) => {
      try {
        console.log('Sending user data:', user);
        const { data } = await request.post("/api/auth/login", user);
        console.log('Server response:', data);
        dispatch(authActions.login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      }
    }
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  }
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      console.log('Registering user:', user);
      const { data } = await request.post("/api/auth/register", user);
      console.log('Registration response:', data);
      dispatch(authActions.register(data.message));
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      if (errorMessage === "Email already registered.") {
        toast.error("Email is already registered. Please use another email.");
      } else if (errorMessage.includes("username already exists")) {
        toast.error("Username is already taken. Please choose another one.");
      } else {
        toast.error(errorMessage);
      }
    }
  }
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      console.log(`Verifying email for user ID: ${userId}, Token: ${token}`);
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.error("Error verifying email:", error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  }
}
