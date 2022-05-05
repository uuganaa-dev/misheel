import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Slider from "react-slick/lib/slider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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

export default function SimilarBrands({ txt, brandList }) {
  const navigate = useNavigate();
  const settings = {
    className: "center",
    infinite: true,
    // centerMode: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
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
        pt: ["0", "0", "67px"],
        pb: ["0", "50px", "48px"],
      }}
    >
      <Typography
        sx={{
          fontSize: ["12px", "12px", "24px"],
          fontFamily: "Inter",
          textTransform: "uppercase",
          fontWeight: 200,
        }}
      >
        {txt.similarBrands}
      </Typography>
      <Grid sx={{ width: "80%", position: "relative", py: "19px" }}>
        <Slider {...settings}>
          {brandList.length > 0 &&
            brandList.map((item, index) => (
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => navigate("/brandDetail/" + item.id)}
              >
                <Grid
                  sx={{
                    backgroundImage: `url("http://167.172.76.26${item.brandLogo}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    width: ["67px", "165px", "232px"],
                    height: ["61px", "149px", "200px"],
                    "&:hover": {
                      opacity: 0.4,
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontSize: ["10px", "16px"],
                    pt: ["5px", "14px", "19px"],
                  }}
                >
                  {item.brandName}
                </Typography>
              </Grid>
            ))}
        </Slider>
      </Grid>
    </Grid>
  );
}
