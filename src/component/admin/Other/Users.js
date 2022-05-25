import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import Swal from "sweetalert2";
import * as API from "../../../api/request";
import { useUserState } from "../../../contexts/UserContext";
const { Option } = Select;

const Users = () => {
  const { user } = useUserState();
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState("new");
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();
  const [refresh, setRefresh] = useState(1);
  const [userList, setUserList] = useState([]);

  const Clear = () => {
    setId("new");
    setCompany("");
    setUsername("");
    setPassword("");
    setRole();
  };

  const Edit = (el) => {
    setId(el._id);
    setCompany(el.company);
    setUsername(el.username);
    setPassword("");
    setRole(parseInt(el.role));
    setIsShow(true);
  };

  const Validate = () => {
    let validation = "";
    company || (validation += "Компанийн нэр бичнэ үү!<br/>");
    username || (validation += "Нэр бичнэ үү!<br/>");
    password || (validation += "Нууц үг бичнэ үү!<br/>");
    role || (validation += "Эрх сонгоно уу!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      if (id === "new") {
        Save();
      } else {
        Update();
      }
    }
  };

  const Save = () => {
    API.postUser({
      company: company,
      username: username,
      password: password,
      role: role.toString(),
    })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Амжилттай хадгалагдлаа.",
            confirmButtonColor: "#0f56b3",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Хадгалах үед алдаа гарлаа.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        Clear();
        setRefresh(refresh + 1);
        setIsShow(false);
      });
  };
  const Update = () => {
    API.putUser(id, {
      company: company,
      username: username,
      password: password,
      role: role.toString(),
    })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Амжилттай хадгалагдлаа.",
            confirmButtonColor: "#0f56b3",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Хадгалах үед алдаа гарлаа.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        Clear();
        setRefresh(refresh + 1);
        setIsShow(false);
      });
  };
  const Delete = (id) => {
    Swal.fire({
      title: "",
      text: "Та устгахдаа итгэлтэй байна уу.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f56b3",
      cancelButtonText: "Үгүй",
      confirmButtonText: "Тийм",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        API.deleteUser(id)
          .then((res) => {
            if (res.data.success) {
              setRefresh(refresh + 1);
              Swal.fire({
                icon: "success",
                title: "Амжилттай устгагдлаа.",
                confirmButtonColor: "#0f56b3",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Алдаа гарлаа.",
              text: "Устгах үед алдаа гарлаа дахин оролдоно уу.",
              confirmButtonColor: "#0f56b3",
            });
          });
      }
    });
  };

  useEffect(() => {
    API.getUser()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setUserList(
              res.data.data.filter((el) => el._id !== user.userInfo.user_id)
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "User лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, [refresh, user.userInfo.user_id]);

  return (
    <div style={{ fontFamily: "roboto" }}>
      <div className="add-container">
        <div
          className="add-category-btn"
          onClick={() => {
            setIsShow(true);
          }}
        >
          <span className="mr-2">Хэрэглэгч нэмэх</span>
          <svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 7V15"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 11H15"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isShow && (
        <div className="card">
          <div className="card-body">
            <Input
              placeholder="Компанийн нэр"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              placeholder="Нэр"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-3"
            />
            <Input.Password
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3"
            />
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Хэрэглэгч сонгох..."
              value={role}
              onChange={(value) => setRole(value)}
              className="mt-3"
            >
              <Option value={1}>Admin</Option>
              <Option value={2}>Хэрэглэгч</Option>
              <Option value={3}>Зах зээлийн админ</Option>
            </Select>
            <div className="gadot-modal-button">
              <div className="modal-save-button" onClick={() => Validate(0)}>
                Хадгалах
              </div>
              <div
                className="modal-save-button ml-3"
                style={{ backgroundColor: "gray" }}
                onClick={() => {
                  Clear();
                  setIsShow(false);
                }}
              >
                Хаах
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="card card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Нэр</th>
              <th>Тайлбар</th>
              <th>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 &&
              userList.map((el, index) => (
                <tr key={index}>
                  <td className="vertical-center p-1">{el.username}</td>
                  <td className="vertical-center p-1">
                    {el.role === 1 ? "Админ" : "Хэрэглэгч"}
                  </td>

                  <td
                    className="vertical-center text-center p-1"
                    style={{ width: "60px" }}
                  >
                    <i
                      className="fa fa-edit text-success cursor-pointer mr-2"
                      onClick={() => {
                        Edit(el);
                      }}
                    />
                    <i
                      className="fa fa-trash text-danger cursor-pointer"
                      onClick={() => {
                        Delete(el._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Users);
