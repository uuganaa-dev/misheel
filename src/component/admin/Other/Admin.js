import React, { useEffect } from "react";
import { Upload, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
import { useAdminState } from "../../../contexts/AdminContext";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const Admin = () => {
  const { admin, setAdmin } = useAdminState();

  const uploadButton = (
    <div>
      {admin.loading ? (
        <LoadingOutlined />
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
    </div>
  );

  const HandleChange = (ordern, file) => {
    getBase64(file, (imageUrl) => {
      if (admin.uploadType === 1) {
        var params = {
          imgType: admin.imgType,
          imgName: admin.imgName,
          ordern: ordern,
          imageUrl: imageUrl,
        };
        if (ordern === 1) {
          if (admin.cover1) {
            if (admin.cover1.id !== 0) {
              Update(params, admin.cover1.id);
            } else {
              Save(params);
            }
          } else {
            Save(params);
          }
        } else if (ordern === 2) {
          if (admin.cover2) {
            if (admin.cover2.id !== 0) {
              Update(params, admin.cover2.id);
            } else {
              Save(params);
            }
          } else {
            Save(params);
          }
        } else if (ordern === 3) {
          if (admin.cover3) {
            if (admin.cover3.id !== 0) {
              Update(params, admin.cover3.id);
            } else {
              Save(params);
            }
          } else {
            Save(params);
          }
        }
      } else {
        setAdmin({
          type: "IMAGE",
          data: {
            id: admin.image ? (admin.image.id !== 0 ? admin.image.id : 0) : 0,
            ordern: admin.imgOrdern,
            imageUrl: imageUrl,
          },
        });
      }
    });
  };

  const Validation = () => {
    let validation = "";
    admin.imgName || (validation += "Нэр оруулна уу!<br/>");
    admin.image || (validation += "Зураг оруулна уу!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      if (admin.image.id === undefined || admin.image.id === 0) {
        var params = {
          imgType: admin.imgType,
          imgName: admin.imgName,
          ordern: admin.image.ordern,
          imageUrl: admin.image.imageUrl,
        };
        Save(params);
      } else {
        var paramss = {
          imgType: admin.imgType,
          imgName: admin.imgName,
          ordern: admin.image.ordern,
          imageUrl: admin.image.imageUrl,
        };
        Update(paramss, admin.image.id);
      }
    }
  };

  const Save = (params) => {
    setAdmin({ type: "LOADING", data: true });
    API.postImg(params)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({ type: "MODAL_CLOSE" });
          setAdmin({ type: "REFRESH" });
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
          text: "Серверт хадгалах үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setAdmin({ type: "LOADING", data: false }));
  };

  const Update = (paramss, id) => {
    setAdmin({ type: "LOADING", data: true });
    API.putImg(paramss, id)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({ type: "MODAL_CLOSE" });
          setAdmin({ type: "REFRESH" });
          Swal.fire({
            icon: "success",
            title: "Амжилттай шинэчлэгдлээ.",
            confirmButtonColor: "#0f56b3",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Серверт хадгалах үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setAdmin({ type: "LOADING", data: false }));
  };

  const Delete = (id) => {
    API.deleteImg(id)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({ type: "MODAL_CLOSE" });
          setAdmin({ type: "REFRESH" });
          Swal.fire({
            icon: "success",
            title: "Амжилттай устгагдлаа.",
            confirmButtonColor: "#0f56b3",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Устгах үед алдаа гарлаа! Дахин оролдоно уу.",
          text: err,
          confirmButtonColor: "#0f56b3",
        });
      });
  };

  useEffect(() => {
    if (admin.isShow === true) {
      if (admin.uploadType === 1) {
        var filterList = admin.list.filter(
          (el) => el.imgType === admin.imgType
        );
        if (filterList.length > 0) {
          // eslint-disable-next-line array-callback-return
          filterList.map((el) => {
            if (el.ordern === 1) {
              setAdmin({ type: "COVER1", data: el });
            } else if (el.ordern === 2) {
              setAdmin({ type: "COVER2", data: el });
            } else if (el.ordern === 3) {
              setAdmin({ type: "COVER3", data: el });
            }
          });
        }
      } else {
        var filterList1 = admin.list.find(
          (el) => el.imgType === admin.imgType && el.ordern === admin.imgOrdern
        );
        if (filterList1) {
          setAdmin({
            type: "IMAGE",
            data: {
              id: filterList1.id,
              ordern: filterList1.ordern,
              imageUrl: filterList1.imageUrl,
            },
          });
          setAdmin({
            type: "IMG_NAME",
            data: filterList1.imgName,
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin.isShow]);

  useEffect(() => {
    API.getImg()
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  imageUrl: el[1].imageUrl,
                  imgName: el[1].imgName,
                  imgType: el[1].imgType,
                  ordern: el[1].ordern,
                };
                result.push(pp);
              });
              setAdmin({ type: "LIST", data: result });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {});
  }, [setAdmin, admin.refresh]);

  return (
    <>
      <Modal
        title=""
        visible={admin.isShow}
        onCancel={() => {
          setAdmin({
            type: "MODAL_CLOSE",
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
                <div>
                  {admin.uploadType === 1
                    ? "Ковер зураг"
                    : admin.uploadType === 2
                    ? "Брэнд нэр"
                    : admin.uploadType === 3
                    ? "Showroom нэр"
                    : admin.uploadType === 4
                    ? "Төслийн нэр"
                    : ""}
                </div>
                {admin.uploadType !== 1 && (
                  <input
                    type="text"
                    className="form-control gadot-input"
                    placeholder={
                      admin.uploadType === 2
                        ? "Брэнд нэрийг оруулна уу..."
                        : admin.uploadType === 3
                        ? "Showroom нэрийг оруулна уу..."
                        : admin.uploadType === 4
                        ? "Төслийн нэрийг оруулна уу..."
                        : ""
                    }
                    value={admin.imgName}
                    onChange={(e) =>
                      setAdmin({ type: "IMG_NAME", data: e.target.value })
                    }
                  />
                )}
              </div>
            </div>
            <div className="gadot-uploadType2" style={{ marginTop: "15px" }}>
              <div className="gadot-uploadType2-2">
                {admin.uploadType === 1 ? (
                  <div className="gadot-neg-ym">
                    <div className="file-attach">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={() => false}
                        accept=".jpg, .png, .jpeg"
                        maxCount={1}
                        onChange={({ file }) => {
                          HandleChange(1, file);
                        }}
                      >
                        {admin?.cover1 ? (
                          <img
                            src={admin?.cover1?.imageUrl}
                            alt=""
                            className="upload-img"
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                      {admin?.cover1 && (
                        <div
                          onClick={() => {
                            if (admin?.cover1?.id === 0) {
                              setAdmin({ type: "COVER1", data: undefined });
                            } else {
                              Delete(admin?.cover1?.id);
                            }
                          }}
                        >
                          <i
                            className="fa fa-trash cursor-pointer"
                            style={{ color: "#740000" }}
                            aria-hidden="true"
                          ></i>
                        </div>
                      )}
                    </div>
                    <div className="file-attach">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={() => false}
                        maxCount={1}
                        accept=".jpg, .png, .jpeg"
                        onChange={({ file }) => {
                          HandleChange(2, file);
                        }}
                      >
                        {admin.cover2 ? (
                          <img
                            src={admin.cover2.imageUrl}
                            alt=""
                            className="upload-img"
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                      {admin?.cover2 && (
                        <div
                          onClick={() => {
                            if (admin?.cover2?.id === 0) {
                              setAdmin({ type: "COVER2", data: undefined });
                            } else {
                              Delete(admin?.cover2?.id);
                            }
                          }}
                        >
                          <i
                            className="fa fa-trash cursor-pointer"
                            style={{ color: "#740000" }}
                            aria-hidden="true"
                          ></i>
                        </div>
                      )}
                    </div>
                    <div className="file-attach">
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={() => false}
                        maxCount={1}
                        accept=".jpg, .png, .jpeg"
                        onChange={({ file }) => {
                          HandleChange(3, file);
                        }}
                      >
                        {admin.cover3 ? (
                          <img
                            src={admin.cover3.imageUrl}
                            alt=""
                            className="upload-img"
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                      {admin.cover3 && (
                        <div
                          onClick={() => {
                            if (admin?.cover3?.id === 0) {
                              setAdmin({ type: "COVER3", data: undefined });
                            } else {
                              Delete(admin?.cover3?.id);
                            }
                          }}
                        >
                          <i
                            className="fa fa-trash cursor-pointer"
                            style={{ color: "#740000" }}
                            aria-hidden="true"
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={() => false}
                      accept=".jpg, .png, .jpeg"
                      maxCount={1}
                      onChange={({ file }) => {
                        HandleChange(0, file);
                      }}
                    >
                      {admin.image ? (
                        <img
                          src={admin.image.imageUrl}
                          alt=""
                          className="upload-img"
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                    {admin?.image && (
                      <div
                        className="text-center"
                        onClick={() => {
                          if (admin?.image?.id === 0) {
                            setAdmin({ type: "IMAGE", data: undefined });
                          } else {
                            Delete(admin?.image?.id);
                          }
                        }}
                      >
                        <i
                          className="fa fa-trash cursor-pointer"
                          style={{ color: "#740000" }}
                          aria-hidden="true"
                        ></i>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {admin.uploadType !== 1 && (
              <div className="gadot-modal-button">
                <div
                  className="modal-save-button"
                  onClick={() => {
                    Validation();
                  }}
                >
                  {admin.loading ? <LoadingOutlined /> : "хадгалах"}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          className="admin-main"
          style={{ flex: 1 }}
          onClick={() => {
            setAdmin({
              type: "SHOW_MODAL_CHANGE",
              uploadType: 1,
              imgType: "cover",
              isShow: true,
            });
          }}
        >
          <div className="admin-main-item">
            <img src="/file.png" alt="" className="admin-main-item-img" />
          </div>
        </div>
        <div
          style={{
            marginTop: "15px",
            borderTop: "1px solid rgb(173 173 173)",
            borderRight: "1px solid rgb(173 173 173)",
            borderBottom: "1px solid rgb(173 173 173)",
            width: "40px",
          }}
        ></div>
        <div
          style={{
            marginTop: "15px",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "roboto",
          }}
        >
          <p>Cover</p>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div className="admin-main" style={{ width: "100%" }}>
          <div className="admin-main2">
            <div
              className="admin-main-item item-2-1"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 1,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="admin-main-item item-2-2"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 2,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
          </div>
          <div className="admin-main2">
            <div
              className="admin-main-item item-2-2-1"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 3,
                  isShow: true,
                });
              }}
            >
              <div>
                <img src="/file.png" alt="" className="admin-main-item-img" />
              </div>
            </div>
            <div className="item-2-2-2">
              <div
                className="admin-main-item item-2-2-2-1"
                onClick={() => {
                  setAdmin({
                    type: "SHOW_MODAL_CHANGE",
                    uploadType: 2,
                    imgType: "brand",
                    imgOrdern: 4,
                    isShow: true,
                  });
                }}
              >
                <img src="/file.png" alt="" className="admin-main-item-img" />
              </div>
              <div
                className="admin-main-item item-2-2-2-2"
                onClick={() => {
                  setAdmin({
                    type: "SHOW_MODAL_CHANGE",
                    uploadType: 2,
                    imgType: "brand",
                    imgOrdern: 5,
                    isShow: true,
                  });
                }}
              >
                <img src="/file.png" alt="" className="admin-main-item-img" />
              </div>
            </div>
          </div>
          <div className="admin-main2 admin3">
            <div
              className="item1"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 6,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item1"
              style={{ transform: "scaleY(1.2)", flex: 1.2 }}
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 7,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item1"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 8,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item2"
              style={{ transform: "scaleY(1.2)", flex: 1.2 }}
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  uploadType: 2,
                  imgType: "brand",
                  imgOrdern: 9,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            borderTop: "1px solid rgb(173 173 173)",
            borderRight: "1px solid rgb(173 173 173)",
            borderBottom: "1px solid rgb(173 173 173)",
            width: "40px",
          }}
        ></div>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "-10px",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "roboto",
          }}
        >
          <p>Brands</p>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div className="admin-main" style={{ width: "100%" }}>
          <div className="admin5">
            <div
              className="item5-1 item5hover"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "showroom",
                  imgOrdern: 1,
                  uploadType: 3,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item5-2 item5hover"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "showroom",
                  imgOrdern: 2,
                  uploadType: 3,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item5-3 item5hover"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "showroom",
                  imgOrdern: 3,
                  uploadType: 3,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item5-4 item5hover"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "showroom",
                  imgOrdern: 4,
                  uploadType: 3,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="item5-5 item5hover"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "showroom",
                  imgOrdern: 5,
                  uploadType: 3,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "45px",
            borderTop: "1px solid rgb(173 173 173)",
            borderRight: "1px solid rgb(173 173 173)",
            borderBottom: "1px solid rgb(173 173 173)",
            width: "40px",
          }}
        ></div>
        <div
          style={{
            marginTop: "45px",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "roboto",
          }}
        >
          <p>Showrooms</p>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div className="admin-main" style={{ width: "100%" }}>
          <div className="admin5">
            <div
              className="admin-main-item item6 mr-2"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "project",
                  imgOrdern: 1,
                  uploadType: 4,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="admin-main-item item6 mr-2"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "project",
                  imgOrdern: 2,
                  uploadType: 4,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="admin-main-item item6 mr-2"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "project",
                  imgOrdern: 3,
                  uploadType: 4,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
            <div
              className="admin-main-item item6"
              onClick={() => {
                setAdmin({
                  type: "SHOW_MODAL_CHANGE",
                  imgType: "project",
                  imgOrdern: 4,
                  uploadType: 4,
                  isShow: true,
                });
              }}
            >
              <img src="/file.png" alt="" className="admin-main-item-img" />
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "45px",
            borderTop: "1px solid rgb(173 173 173)",
            borderRight: "1px solid rgb(173 173 173)",
            borderBottom: "1px solid rgb(173 173 173)",
            width: "40px",
          }}
        ></div>
        <div
          style={{
            marginTop: "45px",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "roboto",
          }}
        >
          <p>Projects</p>
        </div>
      </div>
    </>
  );
};

export default React.memo(Admin);
