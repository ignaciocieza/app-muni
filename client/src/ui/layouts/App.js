import React from "react";
import Main from "./Main";
import Header from "./Header";
import AsideBar from "./aside-bar/AsideBar";
import "./app.styles.css";

export default function App() {
  return (
    <>
      <Header />
      <AsideBar />
      <Main />
    </>
  );
}
