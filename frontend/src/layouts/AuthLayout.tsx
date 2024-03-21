import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="container flex-1 py-10 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
