import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(localStorage.getItem("srs-theme"));

  useEffect(() => {
    if (props.mode) {
      setMode("dark");
    } else {
      setMode(null);
    }
  }, [mode, props.mode]);

  return (
    <div
      className="app-sidebar menu-fixed"
      data-background-color={mode === "dark" ? "black" : "man-of-steel"}
      data-scroll-to-active="true"
    >
      <div
        className="sidebar-header"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        <div className="logo clearfix">
          <a
            className="logo-text float-left"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <div className="logo-img">
              <img src="/logo.png" alt="" style={{ width: "50px" }} />
            </div>
            <span className="text">MISHEEL</span>
          </a>
          <a
            className="nav-close d-block d-lg-block d-xl-none"
            id="gadotCollapse"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <i className="ft-x" />
          </a>
        </div>
      </div>

      <div
        className="sidebar-content main-menu-content scrollbar"
        style={{ marginTop: "20px" }}
      >
        <div className="nav-container">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li
              className={
                location.pathname === "/admin"
                  ? "has-sub nav-item active"
                  : "has-sub nav-item"
              }
            >
              <Link to="/admin" id="gadotMenuHide">
                <i className="ft-home" />
                <span>Нүүр хуудас</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/brand"
                  ? "has-sub nav-item active"
                  : "has-sub nav-item"
              }
            >
              <Link to="/brand" id="gadotMenuHide">
                <div className="custom-logo">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="feather feather-bar-chart-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs></defs> <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>

                <span>Брэнд</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/product"
                  ? "has-sub nav-item active"
                  : "has-sub nav-item"
              }
            >
              <Link to="/product" id="gadotMenuHide">
                <i className="ft-shopping-bag" />
                <span>Бүтээгдэхүүн</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/social"
                  ? "has-sub nav-item active"
                  : "has-sub nav-item"
              }
            >
              <Link to="/social" id="gadotMenuHide">
                <i className="ft-star" />
                <span>Сошиал хөтөлбөр</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/price"
                  ? "has-sub nav-item active"
                  : "has-sub nav-item"
              }
            >
              <Link to="/price" id="gadotMenuHide">
                <i className="ft-trending-up" />
                <span>Зах зээлийн үнэ</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/about"
                  ? "has-sub nav-item active"
                  : "has-sub nav-item"
              }
            >
              <Link to="/about" id="gadotMenuHide">
                <i className="ft-trending-up" />
                <span>Бидний тухай</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
