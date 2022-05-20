import React from "react";

import { useUserState } from "../../../contexts/UserContext";

const Header = (props) => {
  const { user, logOut } = useUserState();

  return (
    <nav className="navbar navbar-expand-lg navbar-light header-navbar navbar-fixed gadot-shadow">
      <div className="container-fluid navbar-wrapper">
        <div className="navbar-header d-flex">
          <div
            className="navbar-toggle menu-toggle d-xl-none d-block float-left align-items-center justify-content-center"
            id="gadotCollapse"
          >
            <i className="ft-menu font-medium-3" />
          </div>
          {/* <ul className="navbar-nav">
            <li className="nav-item nav-search">
              <a
                className="nav-link nav-link-search"
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <i
                  className="ft-search font-medium-3"
                  onClick={() => props.searchToggle()}
                />
              </a>
              <div
                className={props.search ? "search-input open" : "search-input"}
              >
                <div className="search-input-icon">
                  <i className="ft-search font-medium-3" />
                </div>
                <input
                  className="input"
                  type="text"
                  placeholder="Хайх үгээ бичээд Enter дарна уу."
                />
                <div
                  className="search-input-close"
                  onClick={() => props.searchToggle()}
                >
                  <i className="ft-x font-medium-3" />
                </div>
                <ul className="search-list" />
              </div>
            </li>
          </ul> */}
        </div>
        <div className="navbar-container">
          <div className="collapse navbar-collapse d-block">
            <ul className="navbar-nav">
              <li className="dropdown nav-item mr-1">
                <a
                  className="nav-link dropdown-toggle user-dropdown d-flex align-items-end"
                  href="/"
                  data-toggle="dropdown"
                >
                  <div className="user d-md-flex d-none mr-2">
                    <span className="text-right">
                      {user.userInfo.role === "1" ? "Админ" : "Хэрэглэгч"}
                    </span>
                    <span className="text-right text-muted font-small-1">
                      Hello
                    </span>
                  </div>
                  <img
                    src="/img/man.png"
                    className="avatar"
                    style={{ width: "35px" }}
                    alt=""
                  />
                </a>
                <div
                  className="dropdown-menu text-left dropdown-menu-right m-0 pb-0"
                  aria-labelledby="dropdownBasic2"
                >
                  <div
                    className="custom-switch custom-switch-secondary dropdown-item"
                    style={{ paddingLeft: "56px" }}
                  >
                    <input
                      type="checkbox"
                      id="color-switch-2"
                      value={props.mode}
                      checked={props.mode}
                      onChange={() => props.setMode(!props.mode)}
                      className="custom-control-input"
                    />
                    <label
                      htmlFor="color-switch-2"
                      className="custom-control-label mr-1"
                    >
                      <span>{props.mode ? "Хар" : "Цагаан"}</span>
                    </label>
                  </div>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      logOut();
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <i className="ft-power mr-2" />
                      <span>Гарах</span>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default React.memo(Header);
