import React from "react";
import { Upload } from "antd";
import JoditEditor from "jodit-react";
import { useAdminState } from "../../../contexts/AdminContext";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const config = {
  height: "408px",
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
  console.log("admin: ", admin.aboutContent);

  return (
    <div style={{ fontFamily: "roboto" }}>
      <div className="add-container">
        <div
          className="add-category-btn"
          onClick={() => {
            setAdmin({ type: "ABOUT_ISSHOW", data: true });
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
      </div>
      {admin.aboutIsShow ? (
        <div className="animated fadeIn">
          <div style={{ marginTop: "10px" }}>Нүүр зураг</div>
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
                    : admin.aboutCoverImg
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
          <div style={{ marginTop: "10px" }}>Агуулга</div>
          <JoditEditor
            value={admin.aboutContent}
            onChange={(value) =>
              setAdmin({ type: "ABOUT_CONTENT", data: value })
            }
            config={config}
          />

          <div className="gadot-modal-button">
            <div className="modal-save-button" onClick={() => {}}>
              Хадгалах
            </div>
          </div>
        </div>
      ) : (
        <div className="animated fadeIn">list</div>
      )}
    </div>
  );
};

export default React.memo(About);
