import React, { useContext } from "react";

import { Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoYellow from "./logoYellow";
import icons from "../asset/icon/filePath";
import TheContext from "../utils/context/userContext";

export default function FooterMain() {
  const context = useContext(TheContext);
  const txt = context.txt.mainFooter;
  return (
    <>
      <Grid
        sx={{
          bgcolor: "rgba(5,5,5,0.8)",
          color: "white",
          width: "100%",
          height: ["245px", "417px", "417px"],
          position: "relative",
          bottom: "0",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            height: ["209px", "347px", "317px"],
          }}
        >
          <LogoYellow
            ysx={{
              width: ["54px", "90px", "100px"],
              height: ["54px", "90px", "100px"],
              mt: ["24px", "99px", "109px"],
            }}
            sx={{
              width: ["50px", "88px", "78px"],
              height: ["50px", "88px", "78px"],
            }}
            backgroundColor={["#FFD662", "#FFD662", "#FFD662"]}
          />

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
                  "repeat(2,2fr)",
                  "repeat(2,2fr)",
                  "repeat(3,3fr)",
                ],
              }}
            >
              {[
                {
                  name: "facebook",
                  url: "https://www.facebook.com/MisheelConstructionMegaMall",
                },
                {
                  name: "instagram",
                  url: "https://www.instagram.com/misheelbuildingmaterials/",
                },
                {
                  name: "youtube",
                  url: "https://www.youtube.com/channel/UCIsDyxz79Bi_pqFCC-ZG1EQ/featured",
                },
                {
                  name: "pinterest",
                  url: "https://www.pinterest.com/MisheelBuildingMaterials/_created/",
                },
                {
                  name: "whatsapp",
                  url: "https://wa.me/c/97694066064/",
                },
              ].map((i, index) => (
                <div
                  key={index}
                  onClick={() => {
                    window.open(i.url, "_blank");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={icons[i.name]} alt="icons" />
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: ["10px", "30px", "50px"],
          }}
        >
          <Typography
            sx={{
              textAlign: "center",

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
