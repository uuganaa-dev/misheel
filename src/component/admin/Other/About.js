import React, { useEffect, useState } from "react";
import { DatePicker, Upload, Input } from "antd";
import JoditEditor from "jodit-react";
import { useAdminState } from "../../../contexts/AdminContext";
import Swal from "sweetalert2";
import * as API from "../../../api/request";
import moment from "moment";

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

const config = {
  height: "500px",
  width: "100%",
  enableDragAndDropFileToEditor: true,
  buttons: [
    "bold",
    "italic",
    "underline",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "table",
    "brush",
    "link",
    "|",
    "left",
    "center",
    "right",
    "justify",
    "|",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
  ],
  removeButtons: ["file", "fullsize"],
  placeholder: "",
  askBeforePasteFromWord: false,
  askBeforePasteHTML: false,
};

const About = () => {
  const { admin, setAdmin } = useAdminState();
  const [refresh, setRefresh] = useState(1);
  const [refresh1, setRefresh1] = useState(1);
  const [isshow, setIsshow] = useState(false);
  const [timelineList, setTimelineList] = useState([]);

  const RelatedDelete = (id) => {
    API.deleteAboutRelated(id)
      .then((res) => {
        if (res.data.success) {
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
          text: "Устгах үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setRefresh(refresh + 1));
  };

  const Validation = () => {
    let validation = "";
    admin.aboutCoverImg || (validation += "Нүүр зураг оруулна уу!<br/>");
    admin.aboutContent || (validation += "Агуулга бичнэ үү!<br/>");
    admin.aboutRelatedImg.length > 0 ||
      (validation += "Үйл ажиллагаатай холбоотой зурагнууд оруулна уу!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      var formData = new FormData();
      formData.append("cover", admin.aboutCoverImg.aboutImage);
      formData.append("text", admin.aboutContent);
      if (admin.aboutRelatedImg.length > 0) {
        admin.aboutRelatedImg.map((el) => {
          if (el.originFileObj) {
            return formData.append("related", el.originFileObj);
          } else {
            return formData.append("related", el.img);
          }
        });
      }
      Update(formData);
    }
  };

  const Update = (formData) => {
    API.postAbout(formData)
      .then((res) => {
        if (res.data.success) {
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
      .finally(() => setRefresh(refresh + 1));
  };

  const SaveTimeline = () => {
    let validation = "";
    admin.aboutYear || (validation += "Огноо сонгоно уу!<br/>");
    admin.aboutImg || (validation += "Зураг оруулна уу!<br/>");
    admin.aboutText || (validation += "Текст бичнэ үү!<br/>");
    if (validation !== "") {
      Swal.fire({
        icon: "warning",
        html: validation,
        confirmButtonColor: "#0f56b3",
      });
    } else {
      var formData2 = new FormData();
      formData2.append("year", moment(admin.aboutYear).format("YYYY"));
      formData2.append("img", admin.aboutImg.aboutImg);
      formData2.append("text", admin.aboutText);
      API.postTimeline(formData2)
        .then((res) => {
          if (res.data.success) {
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
        .finally(() => {
          setIsshow(false);
          setRefresh1(refresh1 + 1);
        });
    }
  };

  const TimelineDelete = (id) => {
    API.deleteTimeline(id)
      .then((res) => {
        if (res.data.success) {
          setRefresh1(refresh1 + 1);
          Swal.fire({
            icon: "success",
            title: "Амжилттай устаглаа.",
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
      .finally(() => {
        setRefresh1(refresh1 + 1);
      });
  };

  useEffect(() => {
    API.getAbout()
      .then((res) => {
        setAdmin({ type: "ABOUT_SET", data: res.data.data });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    API.getTimeline()
      .then((res) => {
        if (res.data.data.length > 0) {
          setTimelineList(res.data.data);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh1]);

  return (
    <div style={{ fontFamily: "roboto" }}>
      <div className="card p-3">
        <div className="animated fadeIn">
          <div
            style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}
          >
            Нүүр зураг
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
                  type: "ABOUT_COVER_IMG",
                  data: { aboutImage: file, aboutImageBase: base },
                });
              });
            }}
          >
            {admin.aboutCoverImg ? (
              <img
                src={
                  admin.aboutCoverImg.aboutImageBase
                    ? admin.aboutCoverImg.aboutImageBase
                    : "http://167.172.76.26" + admin.aboutCoverImg.aboutImage
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
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Агуулга
          </div>
          <JoditEditor
            value={admin.aboutContent}
            onChange={(value) =>
              setAdmin({ type: "ABOUT_CONTENT", data: value })
            }
            config={config}
          />
          <div
            style={{
              width: "150px",
              height: "30px",
              backgroundColor: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              borderRadius: "5px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => setIsshow(!isshow)}
          >
            Хөгжлийн түүх нэмэх
            {isshow ? (
              <i className="fa fa-arrow-up ml-1" />
            ) : (
              <i className="fa fa-arrow-down ml-1" />
            )}
          </div>
          {isshow ? (
            <div
              className="border p-2"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <DatePicker
                picker="year"
                value={admin.aboutYear}
                onChange={(date) =>
                  setAdmin({
                    type: "ABOUT_YEAR",
                    data: date,
                  })
                }
              />
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader mt-2"
                style={{ width: "150px" }}
                showUploadList={false}
                beforeUpload={() => false}
                accept=".jpg, .png, .jpeg"
                maxCount={1}
                onChange={({ file }) => {
                  getBase64(file, (base) => {
                    setAdmin({
                      type: "ABOUT_IMG",
                      data: { aboutImg: file, aboutImgBase: base },
                    });
                  });
                }}
              >
                {admin.aboutImg ? (
                  <img
                    src={
                      admin.aboutImg.aboutImgBase
                        ? admin.aboutImg.aboutImgBase
                        : "http://167.172.76.26" + admin.aboutImg.aboutImg
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
              <TextArea
                size="large"
                placeholder="Дэлгэрэнгүй..."
                className="mt-2"
                value={admin.aboutText}
                onChange={(e) => {
                  setAdmin({ type: "ABOUT_TEXT", data: e.target.value });
                }}
              />
              <div className="gadot-modal-button">
                <div
                  className="modal-save-button"
                  onClick={() => {
                    SaveTimeline();
                  }}
                >
                  Хадгалах
                </div>
              </div>
            </div>
          ) : (
            <div>
              <table className="table table-bordered">
                <tbody>
                  {timelineList.length > 0 &&
                    timelineList.map((el, index) => (
                      <tr key={index}>
                        <td className="vertical-center p-1">
                          <img
                            src={"http://167.172.76.26" + el.img}
                            alt=""
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td className="vertical-center p-1">
                          <div>{el.text}</div>
                        </td>
                        <td className="vertical-center p-1">
                          <div>{moment(el.year).format("YYYY")}</div>
                        </td>
                        <td
                          className="vertical-center text-center p-1"
                          style={{ width: "60px" }}
                        >
                          <i
                            className="fa fa-trash text-danger cursor-pointer"
                            onClick={() => {
                              TimelineDelete(el._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Үйл ажиллагаатай холбоотой зурагнууд
          </div>
          <Upload
            beforeUpload={() => false}
            multiple
            fileList={admin.aboutRelatedImg}
            accept=".jpg, .png, .jpeg"
            onChange={({ fileList }) => {
              setAdmin({ type: "ABOUT_RELATED_IMG", data: fileList });
            }}
            onRemove={(file) => {
              if (file.id) {
                RelatedDelete(file.id);
              }
            }}
          >
            <div className="my-file-upload">
              {svg}
              <span>Олон зураг зэрэг оруулах боломжтой.</span>
            </div>
          </Upload>
          <div className="gadot-modal-button">
            <div
              className="modal-save-button"
              onClick={() => {
                Validation();
              }}
            >
              Хадгалах
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(About);
