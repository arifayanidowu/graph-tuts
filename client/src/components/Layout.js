import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children, onToggle }) {
  return (
    <>
      <Navbar onToggle={onToggle} />
      {children}
    </>
  );
}
