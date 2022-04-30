import React from "react";
import Slider from "react-slick";
import { Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <Grid
      sx={{
        ...style,
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: "snackbar",
        boxShadow: 3,
        width: ["52px", "94px", "106px"],
        height: ["43px", "87px"],
        backgroundColor: "#534E4A",
        opacity: 0.8,
        cursor: "pointer",
        transform: "translateY(-50%)",
        "&: hover": {
          opacity: 1,
        },
      }}
      onClick={onClick}
    >
      <Grid
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          transform: "rotate(180deg)",
        }}
      >
        <ArrowBackIosNewIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </Grid>
    </Grid>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <Grid
      sx={{
        ...style,
        position: "absolute",
        top: "50%",
        right: "50%",
        zIndex: "snackbar",
        boxShadow: 3,
        width: ["52px", "94px", "106px"],
        height: ["43px", "87px"],
        backgroundColor: "#534E4A",
        opacity: 0.8,
        cursor: "pointer",
        transform: "translateY(-50%)",
        "&: hover": {
          opacity: 1,
        },
      }}
      onClick={onClick}
    >
      <Grid sx={{ width: "100%", height: "100%", position: "relative" }}>
        <ArrowBackIosNewIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default function FeaturedBrandSlide({ images, click }) {
  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 2,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Grid sx={{ width: "100%", position: "relative", zIndex: "modal" }}>
      <Slider {...settings}>
        {images.map((item, index) => (
          <Grid
            key={index}
            sx={{
              width: "50%",
              pt: index % 2 === 0 ? ["20px", "17px", "17px"] : 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              sx={{
                backgroundImage: `url("${item.imageUrl}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height:
                  index % 2 === 0
                    ? ["188px", "555px", "555px"]
                    : ["228px", "666px", "666px"],
                cursor: "pointer",
              }}
              onClick={click}
            />
          </Grid>
        ))}
      </Slider>
    </Grid>
  );
}
