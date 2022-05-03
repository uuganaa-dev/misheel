import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import background from "../../asset/backgroundImages/mrMishee/Rectangle 1392.png";
import breakpoints from "../../utils/contants/breakpoints";
import json2mq from "json2mq";
import icons from "../../asset/icon/filePath";

export default function MrMisheel() {
  const { laptop } = breakpoints;
  const isLaptop = useMediaQuery(json2mq({ minWidth: laptop }));
  return (
    <Grid sx={{ backgroundColor: ["#FFFFFF", "#FFFFFF", "#ECEBE7"] }}>
      <Appbar />
      <Grid
        sx={{
          width: "100%",
          height: "calc(100vw * 0.26)",
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
            pt: ["40px", "80px", "140px"],
          }}
        >
          ЗӨВЛӨЖ БАЙНА
        </Typography>
        <Typography
          sx={{
            fontSize: ["10px", "31px"],
            fontFamily: "Inter",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 200,
            position: "absolute",
            top: ["72%", "72%", "60%"],
            left: "50%",
            transform: [
              "translate(-50%, -72%)",
              "translate(-50%, -72%)",
              "translate(-50%, -60%)",
            ],
          }}
        >
          #MR МИШЭЭЛ
        </Typography>
      </Grid>
      <Grid sx={{ position: "relative", pb: ["0", "290px", "0"] }}>
        <Grid
          sx={{
            backgroundImage: `url("${background}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "calc(100vw * 0.63)",
            opacity: isLaptop ? 0.5 : 1,
          }}
        />
        {isLaptop && (
          <Grid
            sx={{
              backgroundColor: "white",
              width: "57%",
              height: "calc(57vw *0.92)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              pl: "49px",
              position: "absolute",
              top: ["10px", "75px"],
              left: ["10px", "54px"],
            }}
          >
            {text.map((item, index) => (
              <Grid
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: "49px" }}
              >
                <Typography
                  sx={{
                    fontSize: "25px",
                    fontFamily: "Inter",
                    letterSpacing: "1.25px",
                    color: "#2D2D2D",
                    cursor: "pointer",
                    textDecoration: "underline",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                  onClick={() => {
                    window.open(item.url, "_blank");
                  }}
                >
                  {index + 1}. {item.txt}
                </Typography>
                <img src={item.icon} alt={item.icon} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      <FooterMain />
    </Grid>
  );
}

const text = [
  {
    txt: "Хүүхдийн өрөөний интерьер",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: icons.child,
  },
  {
    txt: "Мод стресс бууруулдаг",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: icons.tree,
  },
  {
    txt: "Скандинов орчин",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: "",
  },
  {
    txt: "Дэлхийн хамгийн өвөрмөц интерьертэй ресторан",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: "",
  },
  {
    txt: "Хүүхдийн өрөөний интерьер",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: "",
  },
  {
    txt: "Мод стресс бууруулдаг",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: "",
  },
  {
    txt: "Скандинов орчин",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: "",
  },
  {
    txt: "Дэлхийн хамгийн өвөрмөц интерьертэй ресторан",
    url: "https://www.facebook.com/misheelexpocenter/",
    icon: "",
  },
];
