import { useNavigate } from "react-router-dom";
import { AuthType } from "./firebase-config";
import { toast } from "sonner";

const logout = async (
  signOut: Function,
  auth: AuthType,
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    if (error instanceof Error) {
      console.log("something went wrong:", error.message);
    }
    console.log("something went wrong:", error);
  }
};

const signup = async (
  email: string,
  password: string,
  confirmPassword: string,
  createUserWithEmailAndPassword: Function,
  auth: AuthType,
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    if (email && password && confirmPassword && password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Logging in!");
      navigate("/");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("something went wrong:", error.message);
      toast.error("Error Signing up!");
    }
    console.log("something went wrong:", error);
  }
};

const login = async (
  email: string,
  password: string,
  signInWithEmailAndPassword: Function,
  auth: AuthType,
  navigate: ReturnType<typeof useNavigate>
) => {
  try {
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logging in!");

      navigate("/");
    } else {
      console.log("missing creds");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("something went wrong:", error.message);
      toast.error("Error Logging in!");
    }
    console.log("something went wrong:", error);
  }
};

export { logout, login, signup };
