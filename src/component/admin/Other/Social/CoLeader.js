import React, { useState, useEffect } from "react";
import { Input, Upload, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as API from "../../../../api/request";
import Swal from "sweetalert2";
import { useAdminState } from "../../../../contexts/AdminContext";

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

  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState();
  const [name, setName] = useState("");
  const [txt, setTxt] = useState("");

  useEffect(() => {
    if (admin.coLeader) {
      setLoading(false);
      setImg();
      setName("");
      setTxt("");
    }
  }, [admin.coLeader]);

  const Validate = () => {
    let validation = "";
    img || (validation += "Нүүр зураг оруулна уу!<br/>");
    name || (validation += "Нэр бичнэ үү!<br/>");
    txt || (validation += "Тайлбар бичнэ үү!<br/>");
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
    API.postSocial("coleader", {
      name: name,
      txt: txt,
      img: img,
    })
      .then((res) => {
        if (res.status === 200) {
          setAdmin({ type: "CO_LEADER", data: false });
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
          text: "Хадгалах үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Modal
      visible={admin.coLeader}
      onCancel={() => setAdmin({ type: "CO_LEADER", data: false })}
      centered
      footer={false}
      width={800}
    >
      <div className="gadot-primary-modal-body">
        <div className="gadot-text-body">
          <div className="gadot-uploadType2">
            <div className="gadot-uploadType2-2">
              <div>Нүүр зураг</div>
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
                    setImg(imageUrl);
                  });
                }}
              >
                {img ? <img src={img} alt="" className="upload-img" /> : svg}
              </Upload>
              <div className="mt-2">Нэр</div>
              <Input
                size="large"
                placeholder="Нэр..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="mt-2">Дэлгэрэнгүй</div>
              <TextArea
                size="large"
                placeholder="Дэлгэрэнгүй..."
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
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
  );
};

export default React.memo(CoLeader);
