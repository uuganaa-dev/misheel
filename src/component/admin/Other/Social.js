import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MShiidel from "./Social/MShiidel";

import CreatedBy from "./Social/CreatedBy";
import MrMisheel from "./Social/MrMisheel";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
import { useAdminState } from "../../../contexts/AdminContext";

const URL = "https://mmmall.mn";

const Social = () => {
  const { admin, setAdmin } = useAdminState();
  const navigate = useNavigate();

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
              setTimeout(() => {
                setAdmin({ type: "REFRESH" });
              }, 1000);
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
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "M_SHIIDEL_DATA", data: res.data.data });
            setAdmin({ type: "LOADING", data: false });
          }
        }
      })
      .catch((err) => {
        setAdmin({ type: "LOADING", data: false });
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
    API.getSocial("createdby")
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "CREATED_BY_DATA", data: res.data.data });
            setAdmin({ type: "LOADING", data: false });
          }
        }
      })
      .catch((err) => {
        setAdmin({ type: "LOADING", data: false });
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
    API.getSocial("mrmisheel")
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "LOADING", data: false });
            setAdmin({ type: "MR_MISHEEL_DATA", data: res.data.data });
          }
        }
      })
      .catch((err) => {
        setAdmin({ type: "LOADING", data: false });
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
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
          onClick={() => {
            navigate("/social/coleader");
          }}
        >
          <div className="social-container-item-title">Co Leader</div>
          <div>хөтөлбөр</div>
        </div>
      </div>

      <CreatedBy />
      <MrMisheel />

      <MShiidel />

      {admin.loading ? (
        <div className="social-item-container">Уншиж байна...</div>
      ) : (
        <div className="social-item-container" id="style-1">
          <h5>М-Шийдэл</h5>
          {admin.mShiidelData.length > 0 &&
            admin.mShiidelData.map((el, index) => {
              return (
                <div className="social-item-container-item" key={index}>
                  <img
                    src={
                      el.img.split("/")[1] === "uploads" ? URL + el.img : el.img
                    }
                    alt="Зураггүй"
                    className="social-item-container-item-img"
                  />
                  <div className="social-item-container-item-div1">
                    {el.txt}
                  </div>
                  <div className="social-item-container-item-div2"></div>
                  <div className="social-item-container-item-div3"></div>
                  <i
                    className="fa fa-trash p-1 text-danger cursor-pointer"
                    onClick={() => {
                      Delete("mshiidel", el._id);
                    }}
                  ></i>
                </div>
              );
            })}
          <h5>Created By</h5>
          {admin.createdbyData.length > 0 &&
            admin.createdbyData.map((el, index) => {
              return (
                <div className="social-item-container-item" key={index}>
                  <img
                    src={
                      el.img.split("/")[1] === "uploads" ? URL + el.img : el.img
                    }
                    alt="Зураггүй"
                    className="social-item-container-item-img"
                  />
                  <div className="social-item-container-item-div1">
                    {el.project}
                  </div>
                  <div className="social-item-container-item-div2">
                    {el.title}
                  </div>
                  <div className="social-item-container-item-div3">
                    {el.txt}
                  </div>
                  <i
                    className="fa fa-trash p-1 text-danger cursor-pointer"
                    onClick={() => {
                      Delete("createdby", el._id);
                    }}
                  ></i>
                </div>
              );
            })}
          <h5>Mr.Misheel</h5>
          {admin.mrMisheelData.length > 0 &&
            admin.mrMisheelData.map((el, index) => (
              <div className="social-item-container-item" key={index}>
                <img
                  src={URL + el.icon}
                  alt="Зураггүй"
                  className="social-item-container-item-img"
                />
                <div className="social-item-container-item-div1"></div>
                <div className="social-item-container-item-div2"></div>
                <div className="social-item-container-item-div3">{el.txt}</div>
                <i
                  className="fa fa-trash p-1 text-danger cursor-pointer"
                  onClick={() => {
                    Delete("mrmisheel", el._id);
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
