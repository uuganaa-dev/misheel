import React, { useEffect } from "react";
import MShiidel from "./Social/MShiidel";
import CoLeader from "./Social/CoLeader";
import CreatedBy from "./Social/CreatedBy";
import MrMisheel from "./Social/MrMisheel";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
import { useAdminState } from "../../../contexts/AdminContext";

const Social = () => {
  const { admin, setAdmin } = useAdminState();
  console.log("admin: ", admin);

  const Delete = (name, id) => {
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
        API.deleteSocial(name, id)
          .then((res) => {
            if (res.status === 200) {
              setAdmin({ type: "REFRESH" });
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
    setAdmin({ type: "LOADING", data: true });
    API.getSocial("mshiidel")
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  img: el[1].img,
                };
                result.push(pp);
              });
              setAdmin({ type: "M_SHIIDEL_DATA", data: result });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setAdmin({ type: "LOADING", data: false });
      });
    API.getSocial("createdby")
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  img: el[1].img,
                  project: el[1].project,
                  title: el[1].title,
                  txt: el[1].txt,
                };
                result.push(pp);
              });
              setAdmin({ type: "CREATED_BY_DATA", data: result });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setAdmin({ type: "LOADING", data: false });
      });
    API.getSocial("mrmisheel")
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  icon: el[1].icon,
                  url: el[1].url,
                  txt: el[1].txt,
                };
                result.push(pp);
              });
              setAdmin({ type: "MR_MISHEEL_DATA", data: result });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setAdmin({ type: "LOADING", data: false });
      });
    API.getSocial("coleader")
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  episode: el[1].episode,
                  img: el[1].img,
                  name: el[1].name,
                  txt: el[1].txt,
                };
                result.push(pp);
              });
              setAdmin({ type: "CO_LEADER_DATA", data: result });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setAdmin({ type: "LOADING", data: false });
      });
  }, [admin.refresh, setAdmin]);

  return (
    <>
      <div className="social-container">
        <div
          className="social-container-item"
          onClick={() => setAdmin({ type: "M_SHIIDEL", data: true })}
        >
          <div className="social-container-item-title">М-Шийдэл</div>
          <div>интерьер шийдэл</div>
        </div>
        <div
          className="social-container-item"
          onClick={() => setAdmin({ type: "CREATED_BY", data: true })}
        >
          <div className="social-container-item-title">Created By</div>
          <div>Ажлын гүйцэтгэл</div>
        </div>
        <div
          className="social-container-item"
          onClick={() => setAdmin({ type: "MR_MISHEEL", data: true })}
        >
          <div className="social-container-item-title">Mr.Misheel</div>
          <div>Зөвлөгөө</div>
        </div>
        <div
          className="social-container-item"
          onClick={() => setAdmin({ type: "CO_LEADER", data: true })}
        >
          <div className="social-container-item-title">Co Leader</div>
          <div>хөтөлбөр</div>
        </div>
      </div>

      <CreatedBy />
      <MrMisheel />
      <CoLeader />
      <MShiidel />

      {admin.loading ? (
        <div className="social-item-container">Уншиж байна...</div>
      ) : (
        <div className="social-item-container" id="style-1">
          <h5>М-Шийдэл</h5>
          {admin.mShiidelData.length > 0 &&
            admin.mShiidelData.map((el, index) => (
              <div className="social-item-container-item" key={index}>
                <img
                  src={el.img}
                  alt=""
                  className="social-item-container-item-img"
                />
                <div className="social-item-container-item-div1"></div>
                <div className="social-item-container-item-div2"></div>
                <div className="social-item-container-item-div3"></div>
                <i
                  className="fa fa-trash p-1 text-danger cursor-pointer"
                  onClick={() => {
                    Delete("mshiidel", el.id);
                  }}
                ></i>
              </div>
            ))}
          <h5>Created By</h5>
          {admin.createdbyData.length > 0 &&
            admin.createdbyData.map((el, index) => (
              <div className="social-item-container-item" key={index}>
                <img
                  src={el.img}
                  alt=""
                  className="social-item-container-item-img"
                />
                <div className="social-item-container-item-div1">
                  {el.project}
                </div>
                <div className="social-item-container-item-div2">
                  {el.title}
                </div>
                <div className="social-item-container-item-div3">{el.txt}</div>
                <i
                  className="fa fa-trash p-1 text-danger cursor-pointer"
                  onClick={() => {
                    Delete("createdby", el.id);
                  }}
                ></i>
              </div>
            ))}
          <h5>Mr.Misheel</h5>
          {admin.mrMisheelData.length > 0 &&
            admin.mrMisheelData.map((el, index) => (
              <div className="social-item-container-item" key={index}>
                <img
                  src={el.icon ? el.icon : ""}
                  alt="Зураггүй"
                  className="social-item-container-item-img"
                />
                <div className="social-item-container-item-div1"></div>
                <div className="social-item-container-item-div2"></div>
                <div className="social-item-container-item-div3">{el.txt}</div>
                <i
                  className="fa fa-trash p-1 text-danger cursor-pointer"
                  onClick={() => {
                    Delete("mrmisheel", el.id);
                  }}
                ></i>
              </div>
            ))}
          <h5>Co Leader</h5>
          {admin.coLeaderData.length > 0 &&
            admin.coLeaderData.map((el, index) => (
              <div className="social-item-container-item" key={index}>
                <img
                  src={el.img ? el.img : ""}
                  alt="Зураггүй"
                  className="social-item-container-item-img"
                />
                <div className="social-item-container-item-div1">
                  {el.episode}
                </div>
                <div className="social-item-container-item-div2">{el.name}</div>
                <div className="social-item-container-item-div3">{el.txt}</div>
                <i
                  className="fa fa-trash p-1 text-danger cursor-pointer"
                  onClick={() => {
                    Delete("coleader", el.id);
                  }}
                ></i>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default React.memo(Social);
