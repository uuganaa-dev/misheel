import React, { useState, useEffect } from "react";
import { Input, Upload } from "antd";
import Swal from "sweetalert2";
import * as API from "../../../api/request";
import { useUserState } from "../../../contexts/UserContext";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const Service = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();

  const { user } = useUserState();
  const [isShow, setIsShow] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [list, setList] = useState([]);

  const Clear = () => {
    setTitle("");
    setImage();
  };

  const Validate = () => {
    let validation = "";
    title || (validation += "Гарчиг оруулна уу!<br/>");
    image || (validation += "Зураг оруулна уу!<br/>");
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
    const formData = new FormData();
    formData.append("text", title);
    formData.append("imageUrl", image.image);

    API.postServie(formData)
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
        API.deleteServie(id)
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
    API.getService()
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "лист унших үед алдаа гарлаа дахин оролдоно уу.",
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
          <span className="mr-2">ҮТ Нэмэх</span>
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
              placeholder="Гарчиг..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader mt-2"
              showUploadList={false}
              beforeUpload={() => false}
              accept=".jpg, .png, .jpeg"
              maxCount={1}
              onChange={({ file }) => {
                getBase64(file, (base) => {
                  setImage({ image: file, imageBase: base });
                });
              }}
            >
              {image ? (
                <img
                  src={image.imageBase ? image.imageBase : image.image}
                  alt=""
                  className="upload-img"
                />
              ) : (
                <>
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
                  <div> 600x320px</div>
                </>
              )}
            </Upload>
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
              <th>Гарчиг</th>
              <th>Зураг</th>
              <th>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.map((el, index) => (
                <tr key={index}>
                  <td className="vertical-center p-1">{el.text}</td>
                  <td className="vertical-center p-1">
                    <img
                      src={"http://mmmall.mn" + el.imageUrl}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </td>

                  <td
                    className="vertical-center text-center p-1"
                    style={{ width: "60px" }}
                  >
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

export default React.memo(Service);
