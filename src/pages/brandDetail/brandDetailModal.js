import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import icons from "../../asset/icon/filePath";
import ArrowGreyBgColor from "./arrowGreyBgColor";

export default function BrandDetailModal({ handleClose, detail, txt }) {
  const [index, setIndex] = useState(0);
  const left = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const right = () => {
    if (detail.productImage.length !== index + 1) {
      setIndex(index + 1);
    }
  };

  return (
    <Grid
      sx={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -20%)",
        width: ["80%", "53%"],
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        borderRadius: 0,
        p: "32px 47px",
      }}
    >
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Grid
          sx={{
            backgroundImage: `url("${icons.cancel}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            gap: [0, "24px"],
            position: "relative",
          }}
        >
          <ArrowGreyBgColor click={left} />
          <img
            style={{ width: "255px", height: "255px", objectFit: "cover" }}
            src={"http://misheel.tk" + detail.productImage[index]}
            alt="detail"
          />
          <ArrowGreyBgColor
            sx={{ transform: "rotate(180deg)" }}
            click={right}
          />
          <Grid
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: "5px",
              backgroundColor: "#1C6DD0",
              width: "44px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              {index + 1}/{detail.productImage.length}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            width: ["100%", "100%", "500px"],
          }}
        >
          <Typography>{txt.openStyle}</Typography>
          <Typography>{detail.productOpenStyle}</Typography>
          <Typography>{txt.style}</Typography>
          <Typography>{detail.productStyle}</Typography>
          <Typography>{txt.usage}</Typography>
          <Typography>{detail.productUsage}</Typography>
          <Typography>{txt.material}</Typography>
          <Typography>{detail.productMaterial}</Typography>
          <Typography>{txt.color}</Typography>
          <Typography>{detail.productColor}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
