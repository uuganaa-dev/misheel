import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import json2mq from "json2mq";
import LogoYellow from "./logoYellow";
import icons from "../asset/icon/filePath";
import breakpoints from "../utils/contants/breakpoints";
import TheContext from "../utils/context/userContext";
import { useUserState } from "../contexts/UserContext";

export default function FooterMain() {
  const navigate = useNavigate();
  const { user } = useUserState();
  const context = useContext(TheContext);
  const txt = context.txt.mainFooter;
  const { tablet, laptop } = breakpoints;
  const isTablet = useMediaQuery(json2mq({ minWidth: tablet }));
  const isLaptop = useMediaQuery(json2mq({ minWidth: laptop }));
  return (
    <>
      <Grid
        sx={{
          bgcolor: "rgba(5,5,5,0.8)",
          color: "white",
          width: "100%",
          height: ["245px", "417px", "417px"],
          position: "relative",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            height: ["209px", "347px", "317px"],
          }}
        >
          <LogoYellow
            ysx={{
              width: ["50px", "90px", "100px"],
              height: ["50px", "90px", "100px"],
              mt: ["24px", "99px", "109px"],
            }}
            sx={{
              width: ["50px", "88px", "78px"],
              height: ["50px", "88px", "78px"],
            }}
            backgroundColor={["white", "white", "#FFD662"]}
          />
          {!isLaptop && (
            <Grid
              sx={{
                width: ["61px", "143px", "203px"],
                height: ["117px", "178px", "107px"],
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ml: ["20px", "105px", "116px"],
                mt: ["30px", "46px", "110px"],
                gap: ["13px", "19px"],
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: ["9px", "14px"],
                  fontWeight: 600,
                }}
              >
                {txt.information}
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ["8px", "12px"],
                }}
              >
                {txt.underlinePad.map((item, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: ["9px", "14px"],
                      letterSpacing: ["0.03em", "1.25px"],
                      fontWeight: 400,
                    }}
                  >
                    {item.txt}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid
            sx={{
              width: ["123px", "250px", "321px"],
              height: ["117px", "164px", "221px"],
              ml: ["14px", "86px", "116px"],
              mt: ["30px", "46px", "69px"],
            }}
          >
            {txt.contactUs.map((item, index) => (
              <Grid
                key={index}
                sx={{
                  mb:
                    index === 0
                      ? ["4px", "20px", "25px"]
                      : index === 3
                      ? 0
                      : ["17px", "18px", "23px"],
                  display: "flex",
                  gap: "14px",
                  alignItems: index === 1 ? "flex-start" : "center",
                }}
              >
                {index !== 1 && item.icon && (
                  <Grid
                    sx={{
                      backgroundImage: `url("${icons[item.icon]}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width: index === 2 ? ["8px", "14px"] : ["8px", "16px"],
                      height: index === 2 ? ["8px", "14px"] : ["6px", "11px"],
                    }}
                  />
                )}
                {index === 1 && (
                  <LocationOnIcon
                    sx={{
                      width: ["9px", "13.5px", "16.5px"],
                      height: ["12px", "19.5px", "24px"],
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontFamily: index === 0 ? "Roboto" : ["Roboto", "Inter"],
                    fontSize: index === 0 ? ["9px", "14px"] : ["9px", "12px"],
                    letterSpacing: index === 0 ? "1.25px" : "0.03em",
                    fontWeight: 400,
                  }}
                >
                  {item.txt}
                </Typography>
              </Grid>
            ))}
          </Grid>
          {isLaptop && (
            <Grid
              sx={{
                width: "203px",
                height: "107px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ml: "116px",
                mt: "110px",
              }}
            >
              {txt.underline.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    letterSpacing: "1.25px",
                    fontWeight: 400,
                    textDecoration: "underline",
                  }}
                >
                  {item.txt}
                </Typography>
              ))}
            </Grid>
          )}
          <Grid
            sx={{
              height: ["111px", "51px", "106px"],
              mt: ["30px", "47px", "69px"],
              ml: ["6px", "65px", "97px"],
              width: ["79px", "92px", "119px"],
            }}
          >
            <Typography
              sx={{
                fontSize: ["9px", "14px"],
                fontFamily: ["Roboto", "Inter"],
                fontWeight: [700, 600],
              }}
            >
              {txt.socialLink}
            </Typography>
            <Grid
              sx={{
                display: "grid",
                gap: ["16px", "22px"],
                mt: ["9px", "26px"],
                gridTemplateColumns: [
                  "repeat(1,1fr)",
                  "repeat(2,1fr)",
                  "repeat(3,1fr)",
                ],
                ...(!isTablet && { pl: "30px" }),
              }}
            >
              {(isLaptop
                ? [
                    "facebook",
                    "twitter",
                    "youtube",
                    "whatsapp",
                    "pinterest",
                    "instagram",
                  ]
                : ["facebook", "twitter"]
              ).map((i, index) => (
                <img src={icons[i]} alt="icons" key={index} />
              ))}
              {!isTablet && <LinkedInIcon />}
            </Grid>
            <Typography
              sx={{
                fontSize: ["9px", "14px"],
                padding: ["10px"],
                marginTop: "20px",
                fontFamily: ["Roboto", "Inter"],
                fontWeight: [700, 600],
                cursor: "pointer",
                backgroundColor: "#80808078",
                borderRadius: "8px",
                textAlign: "center",
              }}
              className="login-btn"
              onClick={() => {
                user.loggedIn ? navigate("/admin") : navigate("/login");
              }}
            >
              {user.loggedIn ? "ADMIN" : txt.loginButton}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          sx={{
            height: ["36px", "70px", "100px"],
            ...(!isLaptop && {
              borderTop: "1px solid rgba(255,255,255,0.1)",
              pt: ["13px", "24px"],
            }),
          }}
        >
          <Typography
            sx={{
              ...(isLaptop && {
                borderBottom: "1px solid rgba(255,255,2550,0.1)",
              }),
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: ["9px", "12px"],
              fontWeight: 300,
              color: "rgba(200,200,200,0.5)",
              pb: "9px",
            }}
          >
            {txt.reserved}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
