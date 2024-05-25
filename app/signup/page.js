"use client";

import SignupForm from "../components/SignupForm/SignupForm";
import Styles from "./signup.module.css";

export default function LoginPage() {
  return (
    <main className={Styles["main"]}>
      <SignupForm />
    </main>
  );
}
