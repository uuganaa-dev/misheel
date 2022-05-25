import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import icons from "../../asset/icon/filePath";
import breakpoints from "../../utils/contants/breakpoints";
import json2mq from "json2mq";

export default function HoverImage({ i, show, setShow, sx, logo, fontSize }) {
  const { tablet, laptop } = breakpoints;
  const isTablet = useMediaQuery(json2mq({ minWidth: tablet }));
  const isLaptop = useMediaQuery(json2mq({ minWidth: laptop }));
  const eyeSize = isLaptop
    ? parseInt(sx.width[2]) * 0.15
    : isTablet
    ? parseInt(sx.width[1]) * 0.15
    : parseInt(sx.width[0]) * 0.15;
  const bottom = isLaptop
    ? parseInt(sx.height[2]) * 0.1
    : isTablet
    ? parseInt(sx.height[1]) * 0.1
    : parseInt(sx.height[0]) * 0.1;
  const left = isLaptop
    ? parseInt(sx.width[2]) * 0.09
    : isTablet
    ? parseInt(sx.width[1]) * 0.09
    : parseInt(sx.width[0]) * 0.09;
  return (
    <Grid
      sx={{
        ...sx,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Grid
        sx={{
          ...sx,
          backgroundImage: `url("${i.imageUrl}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "transform 2s",
          opacity: show.index === i.imageUrl && show.show === 1 ? 0.4 : 1,
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onMouseEnter={() => setShow({ ...show, index: i.imageUrl, show: 1 })}
        onMouseLeave={() => setShow({ ...show, index: "", show: 0 })}
      />
      <Grid
        sx={{
          backgroundImage: `url("${icons.eye}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: eyeSize,
          height: eyeSize * 0.68,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          opacity: show.index === i.imageUrl ? show.show : 0,
        }}
        onMouseEnter={() => setShow({ ...show, index: i.imageUrl, show: 1 })}
      />
      <Grid
        sx={{
          position: "absolute",
          bottom: bottom,
          left: left,
          opacity: show.index === i.imageUrl ? show.show : 0,
          display: "flex",
          gap: logo.gap,
          alignItems: "center",
        }}
        onMouseEnter={() => setShow({ ...show, index: i.imageUrl, show: 1 })}
      >
        <Grid
          sx={{
            backgroundImage: `url("${i.logo}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: logo.width,
            height: logo.height,
          }}
        />
        <Typography sx={{ ...fontSize, color: "white" }}>
          {i.imgName}
        </Typography>
      </Grid>
    </Grid>
  );
}
