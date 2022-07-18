import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, DatePicker, Button } from "antd";
import { useAdminState } from "../../../contexts/AdminContext";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
import moment from "moment";

const URL = "http://mmmall.mn";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const Price = () => {
  const formData = new FormData();
  const { admin, setAdmin } = useAdminState();
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fileModal, setFileModal] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState();
  const [pdf, setPdf] = useState();
  console.log(img?.Image);

  const Validate = () => {
    let validation = "";
    admin.priceImage || (validation += "Нүүр зураг оруулна уу!<br/>");
    admin.priceAllPriceImage.length > 0 ||
      (validation += "Үнийн зураг оруулна уу!<br/>");
    admin.priceTitle || (validation += "Гарчиг бичнэ үү!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      PriceSave();
    }
  };

  const PriceSave = () => {
    setAdmin({ type: "LOADING", data: true });
    formData.append("priceImage", admin.priceImage.priceImage);
    if (admin.priceAllPriceImage.length > 0) {
      admin.priceAllPriceImage.map((el) =>
        formData.append("priceAllPriceImage", el.originFileObj)
      );
    }
    formData.append("priceTitle", admin.priceTitle);
    formData.append("priceCategory", "6263ae6919ddda88f451dfe1");
    formData.append("priceDate", moment(admin.priceDate).format("YYYY.MM.DD"));
    formData.append("priceText", admin.priceText);
    API.postPrice(formData)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({
            type: "PRICE_MODAL",
            data: false,
          });
          setAdmin({ type: "PRICE_LIST_REFRESH" });
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
      .finally(() => setAdmin({ type: "LOADING", data: false }));
  };

  const PriceDelete = (id) => {
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
        setAdmin({ type: "BRAND_LIST_LOADING", data: true });
        API.deletePrice(id)
          .then((res) => {
            if (res.status === 200) {
              setAdmin({ type: "PRICE_LIST_REFRESH" });
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
          })
          .finally(() => setAdmin({ type: "LOADING", data: false }));
      }
    });
  };

  const CoverSave = () => {
    let validation = "";
    title || (validation += "Гарчиг оруулна уу!<br/>");
    img || (validation += "Зураг оруулна уу!<br/>");
    pdf || (validation += "Файл оруулна уу!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      var coverFormData = new FormData();
      coverFormData.append("title", title);
      coverFormData.append("cover", img.Image);
      coverFormData.append("file", pdf);
      API.postPriceCover(coverFormData)
        .then((res) => {
          if (res.status === 200) {
            setFileModal(false);
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
        .finally(() => {
          setFileModal(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    API.getPrice()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "PRICE_LIST", data: res.data.data });
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Зах зээлийн үнийн лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, [setAdmin, admin.priceListRefresh]);

  useEffect(() => {
    setLoading(true);
    API.getCategory()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "CATEGORY_LIST", data: res.data.data });
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Категори унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, [setAdmin]);

  return (
    <div>
      <Modal
        title=""
        visible={admin.priceModal}
        onCancel={() => {
          setAdmin({
            type: "PRICE_MODAL",
            data: false,
          });
        }}
        footer={false}
        width={800}
        centered
      >
        <div className="gadot-primary-modal-body">
          <div className="gadot-text-body">
            <div className="gadot-uploadType2">
              <div className="gadot-uploadType2-2">
                <div style={{ marginTop: "10px" }}>
                  Нүүр зураг
                  <span className="text-danger"> ( 1000 × 400px )</span>
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
                    getBase64(file, (base) => {
                      setAdmin({
                        type: "PRICE_IMAGE",
                        data: { priceImage: file, priceImageBase: base },
                      });
                    });
                  }}
                >
                  {admin.priceImage ? (
                    <img
                      src={
                        admin.priceImage.priceImageBase
                          ? admin.priceImage.priceImageBase
                          : admin.priceImage
                      }
                      alt=""
                      className="upload-img"
                    />
                  ) : (
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
                  )}
                </Upload>
                <div style={{ marginTop: "10px" }}>Үнийн мэдээллийн зураг</div>
                <Upload
                  multiple
                  listType="picture-card"
                  beforeUpload={() => false}
                  accept=".jpg, .png, .jpeg"
                  onChange={({ fileList }) => {
                    setAdmin({
                      type: "PRICE_ALL_PRICE_IMAGE",
                      data: fileList,
                    });
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
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
                    <div>Олон зураг оруулах боломжтой.</div>
                  </div>
                </Upload>
                <div>Гарчиг</div>
                <Input
                  size="large"
                  placeholder="Гарчиг бичих..."
                  value={admin.priceTitle}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRICE_TITLE",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>Огноо</div>
                <DatePicker
                  clearIcon={false}
                  value={moment(admin.priceDate, "YYYY.MM.DD")}
                  format={"YYYY.MM.DD"}
                  onChange={(date) => {
                    setAdmin({ type: "PRICE_DATE", data: date });
                  }}
                  style={{ width: "100%" }}
                />
                <div style={{ marginTop: "10px" }}>Тайлбар</div>
                <Input
                  size="large"
                  placeholder="Тайлбар бичих..."
                  value={admin.priceText}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRICE_TEXT",
                      data: e.target.value,
                    })
                  }
                />

                <div className="gadot-modal-button">
                  <div
                    className="modal-save-button"
                    onClick={() => {
                      Validate();
                    }}
                  >
                    {admin.loading ? <LoadingOutlined /> : "Хадгалах"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title=""
        visible={fileModal}
        onCancel={() => {
          setFileModal(false);
        }}
        footer={false}
        width={800}
        centered
      >
        <div className="gadot-primary-modal-body">
          <div className="gadot-text-body">
            <div className="gadot-uploadType2">
              <div className="gadot-uploadType2-2">
                <Input
                  size="large"
                  placeholder="Гарчиг бичих хэсэг"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-2"
                />
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                  accept=".jpg, .png, .jpeg"
                  maxCount={1}
                  onChange={({ file }) => {
                    getBase64(file, (base) => {
                      setImg({ Image: file, ImageBase: base });
                    });
                  }}
                >
                  {img?.Image ? (
                    <img
                      src={img.ImageBase ? img.ImageBase : img.Image}
                      alt=""
                      className="upload-img"
                    />
                  ) : (
                    <div>Ковер зураг оруулах 1900x650</div>
                  )}
                </Upload>
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".pdf"
                  showUploadList={false}
                  onChange={({ file }) => {
                    setPdf(file);
                  }}
                >
                  <Button icon={<UploadOutlined />}>PDF Файл оруулах</Button>
                </Upload>
                {pdf && <div className="pt-1">{pdf.name ? pdf.name : pdf}</div>}
                <div className="gadot-modal-button">
                  <div
                    className="modal-save-button"
                    onClick={() => CoverSave()}
                  >
                    Хадгалах
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="brand-container">
        <div className="add-container">
          <div
            className="add-category-btn mr-2"
            onClick={() => {
              API.getPriceCover()
                .then((res) => {
                  if (res.data.data.length > 0) {
                    setTitle(res.data.data[0].title);
                    setImg({
                      Image: res.data.data[0].cover,
                      ImageBase: undefined,
                    });
                    setPdf(res.data.data[0].file);
                  } else {
                    setTitle("");
                    setImg();
                    setPdf();
                  }
                })
                .catch(() => {})
                .finally(() => setFileModal(true));
            }}
          >
            <span className="mr-2">Cover</span>
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
          <div
            className="add-category-btn"
            onClick={() => {
              setAdmin({
                type: "PRICE_MODAL",
                data: true,
              });
            }}
          >
            <span className="mr-2">Бүртгэх</span>
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
          <div
            className="remove-category-btn"
            onClick={() => {
              setIsDelete(!isDelete);
            }}
          >
            <span className="mr-2">Устгах</span>
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
                d="M7 11H15"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-2">Уншиж байна...</div>
        ) : (
          <div className="category-body">
            {admin.priceList.map((el, index) => {
              return (
                <div
                  className="cat-card"
                  key={index}
                  style={{ cursor: "default" }}
                >
                  <div className="cat-card-div">
                    <div className="cat-brand-img">
                      <img
                        src={
                          el.priceImage.split("/")[1] === "uploads"
                            ? URL + el.priceImage
                            : el.priceImage
                        }
                        alt=""
                        className="cat-brand-logo"
                      />
                    </div>
                    <div className="cat-brand-title">
                      <div className="cat-brand-title-name">
                        {moment(el.priceDate).format("YYYY-MM-DD")}
                      </div>
                      <div className="cat-brand-desc">{el.priceTitle}</div>
                    </div>
                  </div>
                  <div
                    className="brand-cart-delete"
                    style={isDelete ? { display: "flex" } : { display: "none" }}
                    onClick={() => PriceDelete(el.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Price);
