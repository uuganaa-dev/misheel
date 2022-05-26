import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";

import Swal from "sweetalert2";
import * as API from "../../api/request";
import { Modal } from "antd";

const MrMisheel = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    API.getSocial("mrmisheel")
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setData(res.data.data);
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
  }, []);

  return (
    <>
      <Modal
        title=""
        visible={isModalVisible}
        footer={false}
        onCancel={() => setIsModalVisible(false)}
        width={1500}
      >
        <div className="gadot-primary-modal-body">
          <div className="gadot-text-body">
            <div className="gadot-uploadType2">
              <iframe
                width={"100%"}
                height={window.innerWidth < 600 ? 300 : 500}
                src={"https://www.youtube.com/embed/" + url}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Modal>
      <Appbar />

      <Grid
        sx={{
          backgroundColor: ["#FFFFFF", "#FFFFFF", "#ECEBE7"],
          paddingTop: "58px",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            height: "calc(100vw * 0.07)",
            position: "relative",
            overflowY: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: ["10px", "31px"],

              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            #MR МИШЭЭЛ
          </Typography>
        </Grid>
        {/* <Grid
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "calc(60vw *0.60)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {data.map((item, index) => (
            <Grid
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <Typography
                sx={{
                  fontSize: "25px",
                  letterSpacing: "1.25px",
                  color: "#2D2D2D",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsModalVisible(true);
                  var video_id = item.url.split("v=")[1];
                  var ampersandPosition = video_id.indexOf("&");
                  if (ampersandPosition !== -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                  }
                  setUrl(video_id);
                }}
              >
                {index + 1}. {item.txt}
              </Typography>
            </Grid>
          ))}
        </Grid> */}
        <div className="search-pruduct2">
          {data.map((item, index) => {
            return (
              <div
                className="search-pruduct-item2"
                key={index}
                onClick={() => {
                  setIsModalVisible(true);
                  var video_id = item.url.split("v=")[1];
                  var ampersandPosition = video_id.indexOf("&");
                  if (ampersandPosition !== -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                  }
                  setUrl(video_id);
                }}
              >
                <img
                  src={"http://mmmall.mn" + item.icon}
                  alt=""
                  height={114}
                  width={218}
                  style={{ objectFit: "cover" }}
                />
                <div>{item.txt}</div>
              </div>
            );
          })}
        </div>
      </Grid>
      <FooterMain />
    </>
  );
};
export default React.memo(MrMisheel);
