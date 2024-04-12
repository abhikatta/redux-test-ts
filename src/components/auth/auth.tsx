import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../be-firebase/firebase-config";
import { useState } from "react";
import { login, signup } from "../../be-firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [forLoginIn, setForLoginIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      {forLoginIn ? "Log In:" : "Register:"}
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter a password"></input>
        {!forLoginIn && (
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"></input>
        )}
      </div>
      <button
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
      <p>
        {forLoginIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <a
          onClick={() => {
            setForLoginIn((prev) => !prev);
          }}>
          {!forLoginIn ? "Login" : "Sign Up"}
        </a>
      </p>
    </div>
  );
};

export default Auth;
