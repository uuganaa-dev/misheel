import React, { useState, useEffect } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import CoModal from "./coModal";
import icons from "../../asset/icon/filePath";
import * as API from "../../api/request";
import Swal from "sweetalert2";

export default function Co() {
  const [show, setShow] = useState(false);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const OpenModal = (id) => {
    setModal(true);
  };

  const CloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    setLoading(true);
    API.getSocial("coleader")
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  img: el[1].img,
                  name: el[1].name,
                  txt: el[1].txt,
                };
                result.push(pp);
              });
              setData(result);
            }
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
    <Grid sx={{ backgroundColor: "#ECEBE7" }}>
      <Appbar />
      <Grid
        sx={{
          width: "100%",
          height: "calc(100vw * 0.29)",
          position: "relative",
          overflowY: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: ["10px", "12px"],
            fontFamily: "Inter",
            letterSpacing: "0.25px",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#707070",
            pt: ["44px", "85px", "140px"],
          }}
        >
          Зочин хөтөлбөр
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
          Co-Leaders
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
          {data.map((item, index) => (
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
                    width:
                      index % 2 === 0
                        ? ["174px", "415px", "585px"]
                        : ["193px", "461px", "650px"],
                    height:
                      index % 2 === 0
                        ? ["164px", "392px", "554px"]
                        : ["183px", "438px", "619px"],
                    cursor: "pointer",
                  }}
                  onClick={() => OpenModal(item.id)}
                >
                  <Grid
                    sx={{
                      backgroundImage: `url("${item.img}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width:
                        index % 2 === 0
                          ? ["174px", "415px", "585px"]
                          : ["193px", "461px", "650px"],
                      height:
                        index % 2 === 0
                          ? ["164px", "392px", "554px"]
                          : ["183px", "438px", "619px"],
                      transition: "transform 2s",
                      opacity:
                        show.index === item.img && show.show === 1 ? 0.4 : 1,
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
                    Episode {index + 1}
                  </Typography>
                  <Typography
                    sx={{ fontSize: ["10px", "30px"], fontFamily: "Inter" }}
                  >
                    {item.name}
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
          <CoModal CloseModal={CloseModal} data={data} />
        </div>
      </Modal>
    </Grid>
  );
}
