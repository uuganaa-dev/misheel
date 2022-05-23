import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import img from "./Group.png";
import img2 from "./Group (1).png";
import { Select } from "antd";
const { Option } = Select;

export default function Map() {
  const [value, setValue] = useState(1);

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
              letterSpacing: "0.25px",
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: 200,
            }}
          >
            #MAP
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
            ЗӨВЛӨЖ БАЙНА
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            pt: "25px",
            pb: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "10px",
              fontFamily: "roboto",
            }}
          >
            <Select
              style={{
                width: 300,
              }}
              size="large"
              value={value}
              className="text-center"
              onChange={(value) => setValue(value)}
            >
              <Option value={1}>Нэгдүгээр давхар</Option>
              <Option value={2}>Хоёрдугаар давхар</Option>
            </Select>
          </div>
          {value === 1 ? (
            <Grid
              sx={{
                backgroundImage: `url("${img}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "80%",
                height: "calc(80vw * 0.61)",
              }}
            />
          ) : (
            <Grid
              sx={{
                backgroundImage: `url("${img2}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "80%",
                height: "calc(80vw * 0.62)",
              }}
            />
          )}
        </Grid>
        <FooterMain />
      </Grid>
    </>
  );
}
