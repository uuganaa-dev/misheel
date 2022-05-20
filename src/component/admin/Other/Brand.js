import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Input, Upload } from "antd";
import { useAdminState } from "../../../contexts/AdminContext";
import { useUserState } from "../../../contexts/UserContext";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";

const { Option } = Select;
const { TextArea } = Input;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const URL = "http://167.172.76.26";

const Brand = () => {
  const formData = new FormData();
  const { admin, setAdmin } = useAdminState();
  const { user } = useUserState();
  const [isDelete, setIsDelete] = useState(false);

  const CategorySave = () => {
    if (admin.categoryAddValue) {
      setAdmin({ type: "LOADING", data: true });
      API.postCategory({ name: admin.categoryAddValue })
        .then((res) => {
          if (res.status === 200) {
            setAdmin({ type: "CATEGORY_ADD_VALUE", data: "" });
            setAdmin({
              type: "BRAND_LIST_RELOAD",
            });
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
    } else {
      Swal.fire({
        icon: "warning",
        text: "Нэр оруулна уу.",
        confirmButtonColor: "#0f56b3",
      });
    }
  };

  const SubCategorySave = () => {
    let validation = "";
    admin.categoryValue ||
      (validation +=
        "Ангилал сонгосны дараа Дэд ангилал нэмэх боломжтой.<br/>");
    admin.subCategoryAddValue || (validation += "Нэр оруулна уу.!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      setAdmin({ type: "LOADING", data: true });
      API.postSubCategory({
        parentId: admin.categoryValue,
        name: admin.subCategoryAddValue,
      })
        .then((res) => {
          if (res.status === 200) {
            setAdmin({ type: "SUB_CATEGORY_ADD_VALUE", data: "" });
            setAdmin({
              type: "BRAND_LIST_RELOAD",
            });
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
    }
  };

  const Validate = () => {
    let validation = "";
    admin.categoryValue || (validation += "Ангилал сонгоно уу!<br/>");
    admin.brandName || (validation += "Брэнд нэр бичнэ үү!<br/>");
    admin.brandLogoUrl || (validation += "Лого сонгоно уу!<br/>");
    admin.brandDetailCoverImg || (validation += "Ковер зураг сонгоно уу!<br/>");
    admin.brandDetailDesc || (validation += "Тайлбар бичнэ үү!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      if (admin.brandId) {
        BrandUpdate();
      } else {
        BrandSave();
      }
    }
  };

  const BrandSave = () => {
    setAdmin({ type: "LOADING", data: true });
    setAdmin({ type: "BRAND_LIST_LOADING", data: true });

    formData.append("categoryId", admin.categoryValue);
    formData.append(
      "subCategoryId",
      admin.subCategoryValue === undefined ? "" : admin.subCategoryValue
    );
    formData.append("brandName", admin.brandName);
    formData.append("brandLogo", admin.brandLogoUrl.brandLogoUrl);
    formData.append(
      "brandDetailCoverImg",
      admin.brandDetailCoverImg.brandDetailCoverImg
    );
    formData.append("brandDetailDesc", admin.brandDetailDesc);
    formData.append("brandDetailNumber", admin.brandDetailNumber);
    formData.append("brandDetailEmail", admin.brandDetailEmail);
    formData.append("brandDetailFacebook", admin.brandDetailFacebook);
    formData.append("user_id", user.userInfo.user_id);
    API.postBrand(formData)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({
            type: "MODAL",
            data: false,
          });
          setAdmin({
            type: "BRAND_LIST_RELOAD",
          });
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

  const BrandUpdate = () => {
    setAdmin({ type: "LOADING", data: true });
    setAdmin({ type: "BRAND_LIST_LOADING", data: true });
    formData.append("categoryId", admin.categoryValue);
    formData.append(
      "subCategoryId",
      admin.subCategoryValue === undefined ? "" : admin.subCategoryValue
    );
    formData.append("brandName", admin.brandName);
    formData.append("brandLogo", admin.brandLogoUrl);
    formData.append("brandDetailCoverImg", admin.brandDetailCoverImg);
    formData.append("brandDetailDesc", admin.brandDetailDesc);
    formData.append("brandDetailNumber", admin.brandDetailNumber);
    formData.append("brandDetailEmail", admin.brandDetailEmail);
    formData.append("brandDetailFacebook", admin.brandDetailFacebook);
    formData.append("user_id", user.userInfo.user_id);
    API.putBrand(formData, admin.brandId)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({
            type: "MODAL",
            data: false,
          });
          setAdmin({
            type: "BRAND_LIST_RELOAD",
          });
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
          text: "Хадгалах үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setAdmin({ type: "LOADING", data: false }));
  };

  const BrandDelete = (id) => {
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
        API.deleteBrand(id)
          .then((res) => {
            if (res.status === 200) {
              setAdmin({
                type: "BRAND_LIST_RELOAD",
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
    API.getCategory()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "CATEGORY_LIST", data: res.data.data });
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
  }, [admin.brandListReload, setAdmin]);

  useEffect(() => {
    API.getSubCategory()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "SUB_CATEGORY_LIST", data: res.data.data });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Дэд категори унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, [admin.brandListReload, setAdmin]);

  useEffect(() => {
    setAdmin({ type: "BRAND_LIST_LOADING", data: true });
    API.getBrand()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            var result = [];
            _.map(res.data.data, (el) => {
              result.push({
                ...el,
                brandDetailCoverImg: el.brandDetailCoverImg,
                brandLogo: el.brandLogo,
              });
            });
            var filter = result.filter(
              (el) => el.user_id === user.userInfo.user_id
            );
            if (filter.length > 0) {
              setAdmin({ type: "BRAND_LIST", data: filter });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Брэнд лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setAdmin({ type: "BRAND_LIST_LOADING", data: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin.brandListReload, setAdmin]);

  return (
    <>
      <Modal
        title=""
        visible={admin.isShow}
        onCancel={() => {
          setAdmin({
            type: "MODAL",
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
                <div>Ангилал</div>
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Ангилал сонгох..."
                  value={admin.categoryValue}
                  onChange={(value) =>
                    setAdmin({
                      type: "CATEGORY_VALUE",
                      data: value,
                    })
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingBottom: "6px",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                          }}
                        >
                          <Input
                            style={{ width: "80%" }}
                            placeholder="Ангилал нэмэх..."
                            value={admin.categoryAddValue}
                            onChange={(e) =>
                              setAdmin({
                                type: "CATEGORY_ADD_VALUE",
                                data: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div
                          style={{
                            width: "20%",
                          }}
                        >
                          <div
                            className="modal-add-btn"
                            onClick={() => CategorySave()}
                          >
                            {admin.loading ? <LoadingOutlined /> : "Нэмэх"}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                >
                  {admin.categoryList.map((el) => (
                    <Option key={el.id}>{el.name}</Option>
                  ))}
                </Select>
                <div style={{ marginTop: "10px" }}>Дэд ангилал</div>
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Дэд ангилал сонгох..."
                  value={admin.subCategoryValue}
                  onChange={(value) =>
                    setAdmin({
                      type: "SUB_CATEGORY_VALUE",
                      data: value,
                    })
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingBottom: "6px",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                          }}
                        >
                          <Input
                            style={{ width: "80%" }}
                            placeholder="Ангилал нэмэх..."
                            value={admin.subCategoryAddValue}
                            onChange={(e) =>
                              setAdmin({
                                type: "SUB_CATEGORY_ADD_VALUE",
                                data: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div
                          style={{
                            width: "20%",
                          }}
                        >
                          <div
                            className="modal-add-btn"
                            onClick={() => SubCategorySave()}
                          >
                            {admin.loading ? <LoadingOutlined /> : "Нэмэх"}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                >
                  {admin.subCategoryFilteredList.map((el) => (
                    <Option key={el.id}>{el.name}</Option>
                  ))}
                </Select>
                <div style={{ marginTop: "10px" }}>Брэнд нэр</div>
                <Input
                  size="large"
                  placeholder="Брэндийн нэр оруулах..."
                  value={admin.brandName}
                  onChange={(e) => {
                    setAdmin({ type: "BRAND_NAME", data: e.target.value });
                  }}
                />
                <div style={{ marginTop: "10px" }}>Брэнд лого</div>
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
                        type: "BRAND_LOGO_URL",
                        data: { brandLogoUrl: file, brandLogoUrlBase: base },
                      });
                    });
                  }}
                >
                  {admin.brandLogoUrl ? (
                    <img
                      src={
                        admin.brandLogoUrl.brandLogoUrlBase
                          ? admin.brandLogoUrl.brandLogoUrlBase
                          : admin.brandLogoUrl.split("/")[1] === "uploads"
                          ? URL + admin.brandLogoUrl
                          : admin.brandLogoUrl
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
                <div>Брэнд ковер зураг</div>
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
                        type: "BRAND_DETAIL_COVER_IMG",
                        data: {
                          brandDetailCoverImg: file,
                          brandDetailCoverImgBase: base,
                        },
                      });
                    });
                  }}
                >
                  {admin.brandDetailCoverImg ? (
                    <img
                      src={
                        admin.brandDetailCoverImg.brandDetailCoverImgBase
                          ? admin.brandDetailCoverImg.brandDetailCoverImgBase
                          : admin.brandDetailCoverImg.split("/")[1] ===
                            "uploads"
                          ? URL + admin.brandDetailCoverImg
                          : admin.brandDetailCoverImg
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
                <div style={{ marginTop: "10px" }}>Тайлбар</div>
                <TextArea
                  size="large"
                  rows={4}
                  placeholder="Тайлбар бичих..."
                  value={admin.brandDetailDesc}
                  onChange={(e) =>
                    setAdmin({
                      type: "BRAND_DETAIL_DESC",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>Утасны дугаар:</div>
                <Input
                  size="large"
                  placeholder="Утасны дугаар бичих..."
                  value={admin.brandDetailNumber}
                  onChange={(e) =>
                    setAdmin({
                      type: "BRAND_DETAIL_NUMBER",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>Имайл:</div>
                <Input
                  size="large"
                  placeholder="Имайл бичих..."
                  value={admin.brandDetailEmail}
                  onChange={(e) =>
                    setAdmin({
                      type: "BRAND_DETAIL_EMAIL",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>Фэйсбүүк :</div>
                <Input
                  size="large"
                  placeholder="Фэйсбүүк бичих..."
                  value={admin.brandDetailFacebook}
                  onChange={(e) =>
                    setAdmin({
                      type: "BRAND_DETAIL_FACEBOOK",
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
                    {admin.loading ? (
                      <LoadingOutlined />
                    ) : admin.brandId ? (
                      "Шинэчлэх"
                    ) : (
                      "хадгалах"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="brand-container">
        <div className="category-box">
          {admin.categoryList.map((el, index) => (
            <div
              className={
                el.id === admin.pageCategoryValue
                  ? "brand-category-active"
                  : "brand-category"
              }
              key={index}
              onClick={() => {
                setAdmin({ type: "PAGE_CATEGORY_VALUE", data: el.id });
              }}
            >
              <svg
                width={16}
                height={9}
                viewBox="0 0 16 9"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.34317 0.257324L0.928955 1.67154L8.00001 8.74263L15.0711 1.67157L13.6569 0.257353L8.00003 5.91419L2.34317 0.257324Z"
                  fill="currentColor"
                />
              </svg>
              <div>{el.name}</div>
            </div>
          ))}
        </div>
        <div className="sub-category-container">
          {admin.pageSubCategoryFilteredList.map((el, index) => (
            <div className="cat-item" key={index}>
              <input
                type="radio"
                name="radio"
                checked={el.id === admin.pageSubCategoryValue}
                value={el.id}
                onChange={(e) => {
                  setAdmin({
                    type: "PAGE_SUB_CATEGORY_VALUE",
                    data: e.target.value,
                  });
                }}
              />
              <span className="ml-2">{el.name}</span>
            </div>
          ))}
        </div>
        {admin.brandListLoading ? (
          <div className="text-center">Уншиж байна...</div>
        ) : (
          <div className="category-body">
            {admin.brandFilteredList.map((el, index) => {
              var aa = "";
              if (admin.categoryList.length > 0) {
                aa = admin.categoryList.find(
                  (item) => item.id === el.categoryId
                );
              }
              return (
                <div className="cat-card" key={index}>
                  <div
                    className="cat-card-div"
                    onClick={() => {
                      setAdmin({
                        type: "MODAL",
                        data: true,
                        brandId: el.id,
                      });
                    }}
                  >
                    <div className="cat-brand-img">
                      <img
                        src={
                          el.brandLogo.split("/")[1] === "uploads"
                            ? URL + el.brandLogo
                            : el.brandLogo
                        }
                        alt=""
                        className="cat-brand-logo"
                      />
                    </div>
                    <div className="cat-brand-title">
                      <div className="cat-brand-title-name">{el.brandName}</div>
                      <div className="cat-brand-desc">{aa?.name}</div>
                    </div>
                  </div>
                  <div
                    className="brand-cart-delete"
                    style={isDelete ? { display: "flex" } : { display: "none" }}
                    onClick={() => BrandDelete(el.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="add-container">
          <div
            className="add-category-btn"
            onClick={() => {
              setAdmin({
                type: "MODAL",
                data: true,
                brandId: "add",
              });
            }}
          >
            <span className="mr-2">Брэнд нэмэх</span>
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
            <span className="mr-2">Брэнд хасах</span>
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
      </div>
    </>
  );
};

export default React.memo(Brand);
