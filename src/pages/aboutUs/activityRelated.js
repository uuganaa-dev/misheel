import React from "react";
import { Grid, Typography } from "@mui/material";
import Slider from "react-slick/lib/slider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import img from "../../asset/backgroundImages/aboutUs/Rectangle 1420.png";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <Grid
      sx={{
        ...style,
        position: "absolute",
        top: "50%",
        right: "-8%",
        transform: "translate(8%,-50%)",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["16px", "40px", "50px"],
        height: ["16px", "40px", "50px"],
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
        left: "-8%",
        transform: "translate(8%,-50%)",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["16px", "40px", "50px"],
        height: ["16px", "40px", "50px"],
      }}
      onClick={onClick}
    >
      <NavigateNextIcon
        sx={{ transform: "rotate(180deg)", fontSize: [16, 40, 50] }}
      />
    </Grid>
  );
}

export default function ActivityRelated() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: function (index) {},
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Grid
      sx={{
        border: "1",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid sx={{ width: "80%" }}>
        <Typography
          sx={{
            fontSize: ["12px", "12px", "18px"],
            fontFamily: "Inter",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Үйл ажиллагаатай холбоотой зурагнууд
        </Typography>
        <Grid
          sx={{ width: "100%", position: "relative", pt: "50px", pb: "80px" }}
        >
          <Slider {...settings}>
            {data.map((item, index) => (
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={index}
              >
                <Grid
                  sx={{
                    backgroundImage: `url("${item.img}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "97%",
                    height: "calc(97vw * 0.36)",
                  }}
                />
              </Grid>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </Grid>
  );
}

const data = [{ img: img }, { img: img }, { img: img }, { img: img }];
