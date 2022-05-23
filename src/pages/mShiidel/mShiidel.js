import React, { useState, useEffect } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import MShiidelModal from "./mShiidelModal";
import * as API from "../../api/request";
import Swal from "sweetalert2";
import icons from "../../asset/icon/filePath";

export default function MShiidel() {
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
    API.getSocial("mshiidel")
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
              fontFamily: "Inter",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            #МШийдэл
          </Typography>
          <Typography
            sx={{
              fontSize: ["10px", "12px"],
              fontFamily: "Inter",
              letterSpacing: "0.25px",
              textTransform: "uppercase",
              color: "#707070",
            }}
          >
            Санал болгож буй
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
          <Grid
            sx={{
              display: "grid",
              gridTemplateColumns: ["repeat(2,1fr)", "repeat(3,1fr)"],
              backgroundColor: ["#F9FAFB", "#F9FAFB", "white"],
              pt: ["30px", "47px", "82px"],
              pb: ["66px", "82px", "115px"],
              px: ["0", "71px", "100px"],
              columnGap: ["0", "47px", "65px"],
            }}
          >
            {data.map((item, index) => (
              <Grid key={index}>
                <Grid
                  sx={{
                    width: ["200px", "262px", "370px"],
                    height: ["243px", "323px", "465px"],
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => OpenModal(item.id)}
                >
                  <Grid sx={{ position: "relative" }}>
                    <Grid
                      sx={{
                        backgroundImage: `url("http://167.172.76.26/${item.img}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: ["200px", "262px", "370px"],
                        height: ["206px", "270px", "380px"],
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
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}

        <FooterMain />
        <Modal open={modal} onClose={() => CloseModal()}>
          <div>
            <MShiidelModal CloseModal={CloseModal} itemDetail={itemDetail} />
          </div>
        </Modal>
      </Grid>
    </>
  );
}
