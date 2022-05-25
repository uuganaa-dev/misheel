import React, { useContext, useEffect, useState } from "react";
import { Grid, Modal, LinearProgress } from "@mui/material";
import fileMain from "../../asset/backgroundImages/main/fileMain";
import Appbar from "../../component/Appbar";
import FeaturedBrand from "./featuredBrand";
import Footer from "../../component/footerMain";
import TheContext from "../../utils/context/userContext";
import icons from "../../asset/icon/filePath";

import { LoadingOutlined } from "@ant-design/icons";
import * as API from "../../api/request";
import Swal from "sweetalert2";

const URL = "http://misheel.tk";

export default function Main() {
  const context = useContext(TheContext);
  const [open, setOpen] = useState(true);
  const [progress] = useState(0);
  const [mainImg, setMainImg] = useState();
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  const [cover1, setCover1] = useState();
  const [cover2, setCover2] = useState();
  const [cover3, setCover3] = useState();
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(true);
    API.getImg()
      .then((res) => {
        if (res.data.success) {
          var result = [];
          var aa = Object.entries(res.data);
          if (aa.length > 0) {
            // eslint-disable-next-line array-callback-return
            res.data.data.map((el) => {
              var pp = {
                id: el.id,
                imageUrl: URL + el.imageUrl,
                imgName: el.imgName,
                imgType: el.imgType,
                ordern: el.ordern,
                brandId: el.brandId,
              };
              result.push(pp);
            });
            setList(result);
            var filterList = result.filter((el) => el.imgType === "cover");
            if (filterList.length > 0) {
              setCount(filterList.length);
              // eslint-disable-next-line array-callback-return
              filterList.map((el) => {
                if (el.ordern === 1) {
                  setCover1(el);
                } else if (el.ordern === 2) {
                  setCover2(el);
                } else if (el.ordern === 3) {
                  setCover3(el);
                }
              });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setMainImg(
      cover1 !== undefined
        ? cover1
        : cover2 !== undefined
        ? cover2
        : cover3 !== undefined && cover3
    );
  }, [cover1, cover2, cover3]);

  useEffect(() => {
    setTimeout(() => {
      if (count === 2) {
        if (mainImg && cover2 && cover1) {
          if (mainImg.id === cover1.id) {
            setMainImg(cover2);
          } else {
            setMainImg(cover1);
          }
        } else if (mainImg && cover3 && cover1) {
          if (mainImg.id === cover1.id) {
            setMainImg(cover3);
          } else {
            setMainImg(cover1);
          }
        } else if (mainImg && cover2 && cover3) {
          if (mainImg.id === cover2.id) {
            setMainImg(cover3);
          } else {
            setMainImg(cover2);
          }
        }
      } else if (count === 3) {
        if (mainImg.id === cover1.id) {
          setMainImg(cover2);
        } else if (mainImg.id === cover2.id) {
          setMainImg(cover3);
        } else if (mainImg.id === cover3.id) {
          setMainImg(cover1);
        }
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImg]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          fontSize: "50px",
          color: "#0f56b3",
          width: "100%",
          height: "50px",
          top: "50%",
          left: "50%",
          marginLeft: "-25px",
          marginTop: "-50px",
        }}
      >
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <>
      <Appbar />
      <Grid sx={{ paddingTop: "58px" }}>
        <Grid sx={{ position: "relative", height: "calc(100vw * 0.49)" }}>
          {mainImg && (
            <Grid
              sx={{
                backgroundImage: `url("${mainImg.imageUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: ["cover", "fill", "cover", "cover"],
                width: "100%",
                height: "100%",
              }}
              className="animate fadeIn"
            />
          )}

          <Grid
            sx={{
              width: ["22px", "67px", "86px"],
              position: "absolute",
              bottom: ["21px", "60px", "77px"],
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <LinearProgress
              value={progress}
              sx={{
                transform: "rotate(90deg)",
                backgroundColor: "rgba(255,255,255,1)",
                "& .MuiLinearProgress-barColorPrimary": {
                  backgroundColor: "black",
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid
          sx={{
            width: "100%",
            bgcolor: "#ECEBE7",
            zIndex: "modal",
          }}
        >
          <FeaturedBrand txt={context.txt.brand} list={list} />
        </Grid>
        <Footer />
        <Modal open={open} onClose={handleClose}>
          <Grid
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: ["80%", "51%"],
              height: ["calc(80vw * 0.49)", "calc(51vw * 0.49)"],
            }}
          >
            <Grid sx={{ width: "100%", height: "100%", position: "relative" }}>
              <Grid
                sx={{
                  backgroundImage: `url("${fileMain.reclam}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
              <Grid
                sx={{
                  backgroundImage: `url("${icons.cancel}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  top: "-44px",
                  right: "-38px",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    </>
  );
}
