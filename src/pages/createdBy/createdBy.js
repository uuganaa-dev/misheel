import React, { useState, useEffect } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import CreatedByModal from "./createdByModal";
import icons from "../../asset/icon/filePath";
import * as API from "../../api/request";
import Swal from "sweetalert2";

export default function CreatedBy() {
  const [show, setShow] = useState(false);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [itemDetail, setItemDetail] = useState();

  const OpenModal = (id) => {
    setItemDetail(data.length > 0 && data.find((el) => el.id === id));
    setModal(true);
  };

  const CloseModal = () => {
    setItemDetail();
    setModal(false);
  };

  useEffect(() => {
    setLoading(true);
    API.getSocial("createdby")
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
          text: "Лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Appbar />
      <Grid sx={{ backgroundColor: "#ECEBE7", paddingTop: "58px" }}>
        <Grid
          sx={{
            width: "100%",
            height: ["20vh", "57vh", "72vh"],
            position: "relative",
            overflowY: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: ["80px", "210px"],
              fontFamily: "Inter",
              fontStyle: "italic",
              letterSpacing: "0.25px",
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: 200,
              color: "#B1AC96",
              opacity: 0.15,
              pt: "94px",
              overflowWrap: "break-word",
            }}
          >
            #CreatedBy
          </Typography>
          <Typography
            sx={{
              fontSize: ["10px", "31px"],
              fontFamily: "Inter",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 200,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Харилцагч
          </Typography>
        </Grid>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontWeight: "600",
              fontSize: "16px",
              padding: "50px",
              backgroundColor: "white",
            }}
          >
            Уншиж байна...
          </div>
        ) : (
          <Grid sx={{ mb: ["46px", "76px", 0] }}>
            {data.length > 0 &&
              data.map((item, index) => (
                <Grid
                  key={index}
                  sx={{ ...(index !== 0 && { mt: ["28px", "72px", "100px"] }) }}
                >
                  <Grid
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: ["27px", "69px", "108px"],
                      backgroundColor: "white",
                      flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    }}
                  >
                    <Grid
                      sx={{
                        position: "relative",
                        width: ["157px", "410px", "585px"],
                        height: ["148px", "387px", "554px"],
                        cursor: "pointer",
                      }}
                      onClick={() => OpenModal(item.id)}
                    >
                      <Grid
                        sx={{
                          backgroundImage: `url("http://167.172.76.26/${item.img}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          width: ["157px", "410px", "585px"],
                          height: ["148px", "387px", "554px"],
                          transition: "transform 2s",
                          opacity:
                            show.index === item.img && show.show === 1
                              ? 0.4
                              : 1,
                        }}
                        onMouseEnter={() =>
                          setShow({ ...show, index: item.img, show: 1 })
                        }
                        onMouseLeave={() =>
                          setShow({ ...show, index: "", show: 0 })
                        }
                      />
                      <Grid
                        sx={{
                          backgroundImage: `url("${icons.eye}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          width: ["24px", "62px", "88px"],
                          height: ["16px", "42px", "60px"],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: show.index === item.img ? show.show : 0,
                        }}
                        onMouseEnter={() =>
                          setShow({ ...show, index: item.img, show: 1 })
                        }
                      />
                    </Grid>
                    <Grid
                      sx={{
                        width: "514px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: ["10px", "30px"], fontFamily: "Inter" }}
                      >
                        Project {index + 1}
                      </Typography>
                      <Typography
                        sx={{ fontSize: ["10px", "30px"], fontFamily: "Inter" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: ["10px", "16px"],
                          fontFamily: "Inter",
                          color: "#6B6B6B",
                          mt: ["18px", "", "37px"],
                        }}
                      >
                        {item.txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        )}

        <FooterMain />
        <Modal open={modal} onClose={() => CloseModal()}>
          <div>
            <CreatedByModal CloseModal={CloseModal} itemDetail={itemDetail} />
          </div>
        </Modal>
      </Grid>
    </>
  );
}
