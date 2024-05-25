"use client";

import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { useStore } from "@/app/store/app-store";
import { useEffect } from "react";

export const App = (props) => {
  const store = useStore();

  useEffect(() => {
    store.checkAuth();
  }, []);

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default App;
