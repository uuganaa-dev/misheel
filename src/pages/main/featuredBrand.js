import React, { useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import json2mq from "json2mq";
import TextUnderline from "./textUnderline";
import ShowAll from "./showAll";
import HoverImage from "./hoverImage";
import breakpoints from "../../utils/contants/breakpoints";
import hoverFooterImage from "../../asset/backgroundImages/main/footerHoverImage.png";
import FeaturedBrandSlide from "./featuredBrandSlide";

export default function FeaturedBrand({ txt, list }) {
  const { tablet, laptop } = breakpoints;
  const isLaptop = useMediaQuery(json2mq({ minWidth: laptop }));
  const isTablet = useMediaQuery(json2mq({ minWidth: tablet }));
  const [show, setShow] = useState({
    index: "",
    show: 0,
  });
  const navigate = useNavigate();
  const ClickNavigate = (i) => {
    if (i?.brandId) {
      navigate("/brandDetail/" + i.brandId);
    }
  };

  const brand12 = list.filter(
    (el) => el.imgType === "brand" && (el.ordern === 1 || el.ordern === 2)
  );

  const brand3 = list.filter((el) => el.imgType === "brand" && el.ordern === 3);

  const brand45 = list.filter(
    (el) => el.imgType === "brand" && (el.ordern === 4 || el.ordern === 5)
  );
  const brand6789 = list.filter(
    (el) =>
      el.imgType === "brand" &&
      (el.ordern === 6 || el.ordern === 7 || el.ordern === 8 || el.ordern === 9)
  );

  const showroomList = list.filter((el) => el.imgType === "showroom");
  const project = list.filter((el) => el.imgType === "project");

  return (
    <Grid
      sx={{
        pt: [0, 0, "43px"],
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {isLaptop && <TextUnderline txt={txt.featuredBrands} />}
      <Grid sx={{ mt: ["13px", "141px", "40px"], mb: [0, 0, "33px"] }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: ["10px", "23px", "30px"],
          }}
        >
          {brand12 &&
            brand12.map((i, index) => {
              return (
                <Grid key={index} onClick={() => ClickNavigate(i)}>
                  <HoverImage
                    i={i}
                    show={show}
                    setShow={setShow}
                    sx={{
                      width: ["180px", "393px", "505px"],
                      height: ["128px", "283px", "364px"],
                    }}
                    logo={{
                      width: ["22px", "49px", "63px"],
                      height: ["22px", "49px", "63px"],
                      gap: ["18px", "24px", "30px"],
                    }}
                    fontSize={{ fontSize: ["18px", "26px", "34px"] }}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: ["11px", "24px", "30px"],
            mt: ["11px", "23px", "30px"],
            mb: [0, "20px", "25px"],
          }}
        >
          {brand3 &&
            brand3.map((i, index) => (
              <Grid key={index} onClick={() => ClickNavigate(i)}>
                <HoverImage
                  i={i}
                  show={show}
                  setShow={setShow}
                  index={index}
                  sx={{
                    width: ["252px", "551px", "710px"],
                    height: ["175px", "381px", "490px"],
                  }}
                  logo={{
                    width: ["29px", "64px", "83px"],
                    height: ["29px", "64px", "83px"],
                    gap: ["35px", "41px", "47px"],
                  }}
                  fontSize={{ fontSize: ["22px", "30px", "38px"] }}
                />
              </Grid>
            ))}
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ["11px", "24px", "30px"],
            }}
          >
            {brand45 &&
              brand45.map((i, index) => (
                <Grid key={index} onClick={() => ClickNavigate(i)}>
                  <HoverImage
                    i={i}
                    show={show}
                    setShow={setShow}
                    index={index}
                    sx={{
                      width: ["107px", "233px", "300px"],
                      height: ["81px", "179px", "230px"],
                    }}
                    logo={{
                      width: ["15px", "33px", "43px"],
                      height: ["15px", "33px", "43px"],
                      gap: ["9px", "15px", "21px"],
                    }}
                    fontSize={{ fontSize: ["9px", "15px", "21px"] }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {isTablet && (
        <ShowAll
          txt={txt.showAll}
          onClick={() => {
            navigate(`/brandPage`);
          }}
        />
      )}
      {isLaptop && <TextUnderline txt={txt.featuredBrands} />}
      <Grid
        sx={{
          mt: ["37px", "46px"],
          width: "100%",
          display: "flex",
          mb: ["18px", 0, "14px"],
        }}
      >
        <FeaturedBrandSlide
          images={brand6789 && brand6789}
          ClickNavigate={ClickNavigate}
        />
      </Grid>
      {(isLaptop || !isTablet) && (
        <ShowAll
          txt={txt.showAll}
          onClick={() => {
            navigate(`/brandPage`);
          }}
        />
      )}
      <Grid
        sx={{
          width: "100%",
          mt: ["31px", "27px", "110px"],
          mb: ["31px", "77px", "100px"],
          display: "flex",
        }}
      >
        {showroomList &&
          showroomList.map((i, index) => (
            <Grid
              key={index}
              sx={{
                width: "20vw",
                height: "calc(20vw * 1.14)",
                overflow: "hidden",
                clipPath:
                  index % 3 === 1
                    ? "polygon(100% 0%, 100% 100%, 0% 90%, 0% 10%)"
                    : index % 3 === 2
                    ? "none"
                    : "polygon(0% 0%, 500% 50%, 0% 100%, 0% 0%)",
              }}
            >
              <Grid
                sx={{
                  backgroundImage: `url("${i.imageUrl}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%",
                  transition: "transform 2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Grid>
          ))}
      </Grid>
      <TextUnderline txt={txt.social} isTablet={!isTablet} />
      <Grid
        sx={{
          mt: ["13px", "32px", "42px"],
          width: "100%",
          mb: -0.9,
          display: "flex",
          position: "relative",
        }}
      >
        {project &&
          project.map((i, index) => (
            <Grid
              key={index}
              sx={{ width: "25%", height: "calc(width * 1.53)" }}
            >
              <Grid
                sx={{ position: "relative" }}
                onClick={() => {
                  switch (index) {
                    case 0:
                      navigate("/mShiidel");
                      break;
                    case 1:
                      navigate("/createdBy");
                      break;
                    case 2:
                      navigate("/mrMisheel");
                      break;
                    case 3:
                      navigate("/coLeader");
                      break;
                    default:
                      navigate("/");
                  }
                }}
              >
                <img
                  src={i.imageUrl}
                  alt={"hover"}
                  style={{
                    width: "100%",
                    height: "calc(width * 1.53)",
                    objectFit: "cover",
                  }}
                />
                <Grid
                  sx={{
                    position: "absolute",
                    top: 0,
                    opacity: 0,
                    transition: "1s ease",
                    "&:hover": {
                      position: "absolute",
                      top: 0,
                      opacity: 1,
                      cursor: "pointer",
                      width: "100%",
                    },
                  }}
                >
                  <img
                    src={hoverFooterImage}
                    alt="hover"
                    style={{
                      width: "100%",
                      height: "calc(width * 1.53)",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
