import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserState } from "../../contexts/UserContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserState();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
      setUserName(localStorage.getItem("username"));
      setPassword(localStorage.getItem("password"));
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (active) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const Login = () => {
    let validation = "";
    username || (validation += "Нэр оруулна уу.<br/>");
    password || (validation += "Нууц үг оруулна уу.<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
      });
    } else {
      axios
        .post(
          "http://167.172.76.26/api/auth/login",
          { username: username, password: password },
          {
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("data", JSON.stringify(res.data));
            setUser({ type: "LOGIN", data: res.data });
            if (res.data.role === "1") {
              navigate("/users", { replace: true });
            } else {
              navigate("/brand", { replace: true });
            }
          } else {
            Swal.fire({
              icon: "warning",
              text: res.data.message,
              confirmButtonColor: "#0e965a",
            });
          }
        });
    }
  };

  return (
    <div className="container">
      <form className="theme-form login-form">
        <h4>Нэвтрэх</h4>
        <h6>Буцаад тавтай морил!</h6>
        <div className="form-group">
          <label>Нэр</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-user" />
            </span>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Нууц үг</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-lock" />
            </span>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="show-hide">
              <span className="show"> </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="checkbox">
            <input
              id="checkbox1"
              type="checkbox"
              value={active}
              checked={active}
              onChange={() => {
                setActive(!active);
              }}
            />
            <label htmlFor="checkbox1">Сануулах</label>
          </div>
          <button
            className="btn btn-primary btn-block link"
            onClick={(e) => {
              e.preventDefault();
              Login();
            }}
          >
            Нэвтрэх
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Login);
