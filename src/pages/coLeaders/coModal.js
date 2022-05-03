import React from "react";
import { Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slider from "react-slick/lib/slider";
import icons from "../../asset/icon/filePath";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <Grid
      sx={{
        ...style,
        position: "absolute",
        top: "50%",
        right: "8%",
        transform: "translate(8%,-50%)",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["16px", "40px", "50px"],
        height: ["16px", "40px", "50px"],
        backgroundColor: "white",
        color: "black",
      }}
      onClick={onClick}
    >
      <NavigateNextIcon sx={{ fontSize: [16, 40, 50] }} />
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
        left: "8%",
        transform: "translate(8%,-50%)",
        zIndex: "snackbar",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["16px", "40px", "50px"],
        height: ["16px", "40px", "50px"],
        backgroundColor: "white",
        color: "black",
      }}
      onClick={onClick}
    >
      <NavigateNextIcon
        sx={{ transform: "rotate(180deg)", fontSize: [16, 40, 50] }}
      />
    </Grid>
  );
}

export default function CoModal({ CloseModal, data }) {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    centerMode: true,
    slidesToShow: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Grid
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: ["50vh", "70vh", "85vh"],
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        p: "32px 47px",
      }}
    >
      <Grid sx={{ display: "flex", justifyContent: "flex-end", mb: "34px" }}>
        <Grid
          sx={{
            backgroundImage: `url("${icons.cancel}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            CloseModal();
          }}
        />
      </Grid>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
            key={index}
          >
            <Grid sx={{ display: "flex", gap: "30px" }}>
              <Grid
                sx={{
                  backgroundImage: `url("http://167.172.76.26/${item.img}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "50%",
                  height: "calc(50vw * 0.68)",
                }}
              />
              <Grid sx={{ width: "40%" }}>
                <Typography sx={{ fontSize: "50px", fontFamily: "Inter" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: "40px", fontFamily: "Inter" }}>
                  {item.txt}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Slider>
    </Grid>
  );
}
