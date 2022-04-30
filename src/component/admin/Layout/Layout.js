import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  const [rightbar, setRightbar] = useState(false);
  const rightbarToggle = () => {
    setRightbar(!rightbar);
  };

  const [search, setSearch] = useState(false);
  const searchToggle = () => {
    setSearch(!search);
  };

  const [mode, setMode] = useState(
    localStorage.getItem("srs-theme") === "dark" ? true : false
  );

  return (
    <>
      <Header
        rightbarToggle={rightbarToggle}
        searchToggle={searchToggle}
        search={search}
        setMode={setMode}
        mode={mode}
      />
      <div
        className="wrapper"
        onClick={() => {
          setRightbar(false);
          setSearch(false);
        }}
      >
        <Sidebar mode={mode} />
        <div className="main-panel" style={{ backgroundColor: "#E6E6E6" }}>
          <div className="main-content">
            <div className="content-wrapper animated fadeIn">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
      <div className="sidenav-overlay" id="gadotMenuHide"></div>
    </>
  );
};

export default React.memo(Layout);
