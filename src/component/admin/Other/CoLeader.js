import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useAdminState } from "../../../contexts/AdminContext";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
import CoLeaderModal from "./Social/CoLeader";
import { useNavigate } from "react-router-dom";
import { Modal, Upload, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const URL = "https://mmmall.mn";

const { TextArea } = Input;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const svg = (
  <svg
    width={73}
    height={73}
    viewBox="0 0 73 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36.5117 72.7398C56.4242 72.7398 72.5665 56.4577 72.5665 36.3728C72.5665 16.2879 56.4242 0.00585938 36.5117 0.00585938C16.5991 0.00585938 0.456787 16.2879 0.456787 36.3728C0.456787 56.4577 16.5991 72.7398 36.5117 72.7398Z"
      fill="#DADADA"
    />
    <path
      d="M46.6894 46.763C47.2633 46.763 47.7285 47.2282 47.7285 47.8021C47.7285 49.5237 46.473 50.9193 44.9242 50.9193H22.4901C20.9413 50.9193 19.6858 49.5237 19.6858 47.8021V31.1772C19.6858 29.4556 20.9413 28.06 22.4901 28.06C23.0063 28.06 23.4248 28.4785 23.4248 28.9948V41.5677C23.4248 44.4324 25.5215 46.763 28.0986 46.763H46.6894ZM53.337 41.5677V24.9429C53.337 23.2213 52.0815 21.8257 50.5327 21.8257H28.0986C26.5498 21.8257 25.2943 23.2213 25.2943 24.9429V41.5677C25.2943 43.2893 26.5498 44.6849 28.0986 44.6849H50.5327C52.0815 44.6849 53.337 43.2893 53.337 41.5677ZM34.6419 28.06C34.6419 29.7816 33.3864 31.1772 31.8376 31.1772C30.2888 31.1772 29.0334 29.7816 29.0334 28.06C29.0334 26.3384 30.2888 24.9429 31.8376 24.9429C33.3864 24.9429 34.6419 26.3384 34.6419 28.06ZM29.0334 38.2758C29.0334 37.7194 29.2392 37.1827 29.6114 36.769L32.2767 33.8063C32.5504 33.502 32.9943 33.502 33.2681 33.8063C34.5017 35.1776 36.6516 35.1776 37.8852 33.8064L43.4937 27.572C43.7675 27.2677 44.2114 27.2677 44.4852 27.572L48.3152 31.8293C49.141 32.7474 49.598 33.9385 49.598 35.1734V35.5287C49.598 38.2901 47.3594 40.5287 44.598 40.5287H31.2863C30.042 40.5287 29.0334 39.52 29.0334 38.2758Z"
      fill="white"
    />
  </svg>
);

const CoLeader = () => {
  const { admin, setAdmin } = useAdminState();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [img, setImg] = useState();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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

  const DeleteData = (id, data_id) => {
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
        API.deleteColeader(id, data_id)
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
    API.getSocial("coleader")
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "CO_LEADER_DATA", data: res.data.data });
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
  }, [admin.refresh, setAdmin]);

  const Validate = () => {
    let validation = "";
    img || (validation += "Нүүр зураг оруулна уу!<br/>");
    question || (validation += "Асуулт бичнэ үү!<br/>");
    answer || (validation += "Хариулт бичнэ үү!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      Save();
    }
  };

  const Save = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("img", img.img);
    API.putSocial(id, formData)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({ type: "REFRESH" });
          setId();
          setImg();
          setQuestion("");
          setAnswer("");
          setIsModalVisible(false);
          Swal.fire({
            icon: "success",
            title: "Амжилттай хадгалагдлаа.",
            confirmButtonColor: "#0f56b3",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Хадгалах үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <CoLeaderModal />
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setId();
          setImg();
          setQuestion("");
          setAnswer("");
        }}
        centered
        footer={false}
        width={800}
      >
        <div className="gadot-primary-modal-body">
          <div className="gadot-text-body">
            <div className="gadot-uploadType2">
              <div className="gadot-uploadType2-2">
                <div>
                  Нүүр зураг <span style={{ color: "red" }}>850x650</span>
                </div>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  accept=".jpg, .png, .jpeg"
                  maxCount={1}
                  onChange={({ file }) => {
                    getBase64(file, (imageUrl) => {
                      setImg({ img: file, imgBase: imageUrl });
                    });
                  }}
                >
                  {img ? (
                    <img
                      src={img.imgBase ? img.imgBase : img}
                      alt=""
                      className="upload-img"
                    />
                  ) : (
                    svg
                  )}
                </Upload>
                <div className="mt-2">Асуулт</div>
                <TextArea
                  size="large"
                  placeholder="Дэлгэрэнгүй..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <div className="mt-2">Хариулт</div>
                <TextArea
                  size="large"
                  placeholder="Дэлгэрэнгүй..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

                <div className="gadot-modal-button">
                  <div
                    className="modal-save-button"
                    onClick={() => {
                      Validate();
                    }}
                  >
                    {loading ? <LoadingOutlined /> : "Хадгалах"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "40px",
            height: "40px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        >
          <i className="fa fa-arrow-left"></i>
        </div>
        <div
          style={{
            border: "1px solid gray",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setAdmin({ type: "CO_LEADER", data: true })}
        >
          Нэмэх
        </div>
      </div>
      <div className="social-item-container" id="style-1">
        <h5>Co Leader</h5>
        {admin.coLeaderData.length > 0 &&
          admin.coLeaderData.map((el, index) => (
            <div key={index} style={{ width: "100%" }}>
              <div
                className="social-item-container-item"
                style={{ cursor: "default" }}
                onClick={() => {
                  setId(el._id);
                  setIsModalVisible(true);
                }}
              >
                <img
                  src={
                    el.img
                      ? el.img.split("/")[1] === "uploads"
                        ? URL + el.img
                        : el.img
                      : ""
                  }
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
                    Delete("coleader", el._id);
                  }}
                ></i>
              </div>
              {el.data.map((item, index1) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                    key={index1}
                  >
                    <div style={{ paddingRight: "15px" }}>{index1 + 1}</div>
                    <div style={{ paddingRight: "15px" }}>{item.question}</div>
                    <div style={{ paddingLedt: "15px" }}>{item.answer}</div>
                    <i
                      className="fa fa-trash p-1 text-danger cursor-pointer"
                      onClick={() => {
                        DeleteData(el._id, item._id);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default React.memo(CoLeader);
