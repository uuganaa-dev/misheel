import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import img from "./1.png";
import img2 from "./2.png";
import { Select } from "antd";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
const { Option } = Select;

const Map = () => {
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

              letterSpacing: "0.25px",
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: 200,
            }}
          >
            #MAP
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
          <div style={{ width: "90%" }}>
            {value === 1 ? (
              <Zoom>
                <img src={img} alt="" width={"100%"} height={"100%"} />
              </Zoom>
            ) : (
              <Zoom>
                <img src={img2} alt="" width={"100%"} height={"100%"} />
              </Zoom>
            )}
          </div>
        </Grid>
        <FooterMain />
      </Grid>
    </>
  );
};
export default React.memo(Map);
