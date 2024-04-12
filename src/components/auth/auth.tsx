import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../be-firebase/firebase-config";
import { useState } from "react";
import { login, signup } from "../../be-firebase/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Auth = () => {
  const [forLoginIn, setForLoginIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center mt-[10%]">
      <Toaster />
      <p className="text-xl font-sans font-bold">
        {forLoginIn ? "Log In to Continue!" : "Register for a new account!"}
      </p>
      <div className=" w-full h-full flex flex-col justify-center items-center mt-5 gap-5">
        <input
          className="px-4 py-2 rounded-md outline-none"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"></input>
        <input
          className="px-4 py-2 rounded-md outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter a password"></input>
        {!forLoginIn && (
          <input
            className="px-4 py-2 rounded-md outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"></input>
        )}
      </div>
      <button
        className="mt-5 px-4 py-2 rounded-md outline-none bg-slate-500 text-white hover:bg-slate-800"
        onClick={
          forLoginIn
            ? () =>
                login(
                  email,
                  password,
                  signInWithEmailAndPassword,
                  auth,
                  navigate
                )
            : () =>
                signup(
                  email,
                  password,
                  confirmPassword,
                  createUserWithEmailAndPassword,
                  auth,
                  navigate
                )
        }>
        Submit
      </button>
      <div className="w-auto h-auto mt-5 flex flex-col items-center justify-between ">
        <p>
          {forLoginIn ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setForLoginIn((prev) => !prev);
            }}
            className=" hover:underline hover:underline-offset-2 cursor-pointer">
            {!forLoginIn ? " Login" : " Sign Up"}
          </span>
        </p>
        <p
          className="mt-5 px-10 py-1 rounded-md outline-none bg-yellow-300 text-black hover:bg-yellow-600"
          onClick={async () => {
            await signInWithPopup(auth, new GoogleAuthProvider());
            navigate("/");
            toast.success("Logging in!");
          }}>
          Login with Google
        </p>
      </div>
    </div>
  );
};

export default Auth;
