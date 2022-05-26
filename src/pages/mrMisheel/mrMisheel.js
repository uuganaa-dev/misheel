import React, { useState, useEffect } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import background from "../../asset/backgroundImages/mrMishee/Rectangle 1392.png";
import breakpoints from "../../utils/contants/breakpoints";
import json2mq from "json2mq";

import Swal from "sweetalert2";
import * as API from "../../api/request";
import { Modal } from "antd";

const MrMisheel = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState();
  const { laptop } = breakpoints;
  const isLaptop = useMediaQuery(json2mq({ minWidth: laptop }));
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
      <Appbar />
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
              <div dangerouslySetInnerHTML={{ __html: url && url }} />
            </div>
          </div>
        </div>
      </Modal>
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
        <Grid sx={{ position: "relative", pb: ["0", "0", "0"] }}>
          <Grid
            sx={{
              backgroundImage: `url("${background}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "calc(100vw * 0.50)",
              opacity: isLaptop ? 0.5 : 1,
            }}
          />
          {isLaptop && (
            <Grid
              sx={{
                backgroundColor: "white",
                width: "60%",
                height: "calc(60vw *0.80)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                pl: "49px",
                position: "absolute",
                top: ["0px", "0px"],
                left: ["4%"],
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
                      textDecoration: "underline",
                      "&:hover": {
                        textDecoration: "none",
                      },
                    }}
                    onClick={() => {
                      setIsModalVisible(true);
                      setUrl(item.url);
                    }}
                  >
                    {index + 1}. {item.txt}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <FooterMain />
      </Grid>
    </>
  );
};
export default React.memo(MrMisheel);
