import React, { useEffect, useState } from "react";
import { Modal, Select, Input, Upload } from "antd";
import { useAdminState } from "../../../contexts/AdminContext";
import { LoadingOutlined } from "@ant-design/icons";
import * as API from "../../../api/request";
import Swal from "sweetalert2";
const { Option } = Select;
const { TextArea } = Input;

const URL = "http://167.172.76.26";

const Product = () => {
  const formData = new FormData();
  const { admin, setAdmin } = useAdminState();
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const Validate = () => {
    let validation = "";
    admin.productBrandId || (validation += "Брэнд сонгоно уу!<br/>");
    admin.productImage.length > 0 ||
      (validation += "Бүтээгдэхүүний зураг оруулна уу!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      if (admin.brandId) {
        ProductSave();
      } else {
        ProductSave();
      }
    }
  };
  const ProductSave = () => {
    setAdmin({ type: "LOADING", data: true });
    formData.append("productBrandId", admin.productBrandId);
    if (admin.productImage.length > 0) {
      admin.productImage.map((el) =>
        formData.append("productImage", el.originFileObj)
      );
    }
    formData.append("productOpenStyle", admin.productOpenStyle);
    formData.append("productStyle", admin.productStyle);
    formData.append("productUsage", admin.productUsage);
    formData.append("productMaterial", admin.productMaterial);
    formData.append("productColor", admin.productColor);
    API.postProduct(formData)
      .then((res) => {
        if (res.status === 200) {
          setAdmin({
            type: "PRODUCT_MODAL",
            data: false,
          });
          setAdmin({ type: "PRODUCT_REFRESH" });
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
  const ProductDelete = (id) => {
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
        API.deleteProduct(id)
          .then((res) => {
            if (res.status === 200) {
              setAdmin({ type: "PRODUCT_REFRESH" });
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
    setLoading(true);
    API.getBrand()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "BRAND_LIST", data: res.data.data });
            setLoading(false);
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
      });
  }, [setAdmin]);

  useEffect(() => {
    API.getProduct()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setAdmin({ type: "PRODUCT_LIST", data: res.data.data });
            setLoading(false);
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
      });
  }, [setAdmin, admin.productListRefresh]);

  return (
    <div>
      <Modal
        title=""
        visible={admin.productModal}
        onCancel={() => {
          setAdmin({
            type: "PRODUCT_MODAL",
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
                <div>Брэнд</div>
                {admin.brandListLoading ? (
                  <p>loading...</p>
                ) : (
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Брэнд сонгох..."
                    value={admin.productBrandId}
                    onChange={(value) =>
                      setAdmin({
                        type: "PRODUCT_BRAND_ID",
                        data: value,
                      })
                    }
                  >
                    {admin.brandList.map((el) => (
                      <Option key={el.id}>{el.brandName}</Option>
                    ))}
                  </Select>
                )}

                <div style={{ marginTop: "10px" }}>Бүтээгдэхүүн</div>
                <Upload
                  beforeUpload={() => false}
                  multiple
                  fileList={admin.productImage}
                  accept=".jpg, .png, .jpeg"
                  onChange={({ fileList }) => {
                    setAdmin({ type: "PRODUCT_IMAGE", data: fileList });
                  }}
                >
                  <div className="my-file-upload">
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
                    <span>Олон зураг зэрэг оруулах боломжтой.</span>
                  </div>
                </Upload>
                <div>openStyle</div>
                <Input
                  size="large"
                  placeholder="openStyle..."
                  value={admin.productOpenStyle}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRODUCT_OPEN_STYLE",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>style</div>
                <Input
                  size="large"
                  placeholder="style..."
                  value={admin.productStyle}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRODUCT_STYLE",
                      data: e.target.value,
                    })
                  }
                />

                <div style={{ marginTop: "10px" }}>usage</div>
                <TextArea
                  size="large"
                  rows={4}
                  placeholder="usage..."
                  value={admin.productUsage}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRODUCT_USAGE",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>material</div>
                <Input
                  size="large"
                  placeholder="material..."
                  value={admin.productMaterial}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRODUCT_MATERIAL",
                      data: e.target.value,
                    })
                  }
                />
                <div style={{ marginTop: "10px" }}>color</div>
                <Input
                  size="large"
                  placeholder="color..."
                  value={admin.productColor}
                  onChange={(e) =>
                    setAdmin({
                      type: "PRODUCT_COLOR",
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
      <div className="brand-container">
        {loading ? (
          <div className="text-center mt-2">Уншиж байна...</div>
        ) : (
          <div className="category-body">
            {admin.productList.map((el, index) => {
              var aa = "";
              if (admin.brandList.length > 0) {
                aa = admin.brandList.find(
                  (item) => item.id === el.productBrandId
                );
              }
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
                          el?.productImage[0]?.split("/")[1] === "uploads"
                            ? URL + el.productImage[0]
                            : el.productImage[0]
                        }
                        alt=""
                        className="cat-brand-logo"
                      />
                    </div>
                    <div className="cat-brand-title">
                      <div className="cat-brand-title-name">
                        {aa?.brandName}
                      </div>
                      <div className="cat-brand-desc">{el.productMaterial}</div>
                      <div className="cat-brand-desc">{el.productUsage}</div>
                    </div>
                  </div>
                  <div
                    className="brand-cart-delete"
                    style={isDelete ? { display: "flex" } : { display: "none" }}
                    onClick={() => ProductDelete(el.id)}
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
                type: "PRODUCT_MODAL",
                data: true,
              });
            }}
          >
            <span className="mr-2">Бүтээгдэхүүн нэмэх</span>
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
            <span className="mr-2">Бүтээгдэхүүн хасах</span>
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
    </div>
  );
};

export default React.memo(Product);
