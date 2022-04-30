import React from "react";
import { Grid, Typography } from "@mui/material";
import icons from "../../asset/icon/filePath";
export default function CoProject({ data, show, setShow, index, click }) {
  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        gap: ["27px", "69px", "108px"],
        backgroundColor: "white",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse"
      }}>
      <Grid
        sx={{
          position: "relative",
          width: index % 2 === 0 ? ["174px", "415px", "585px"] : ["193px", "461px", "650px"],
          height: index % 2 === 0 ? ["164px", "392px", "554px"] : ["183px", "438px", "619px"],
          cursor: "pointer"
        }}
        onClick={click}>
        <Grid
          sx={{
            backgroundImage: `url("${data.img}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: index % 2 === 0 ? ["174px", "415px", "585px"] : ["193px", "461px", "650px"],
            height: index % 2 === 0 ? ["164px", "392px", "554px"] : ["183px", "438px", "619px"],
            transition: "transform 2s",
            opacity: show.index === data.img && show.show === 1 ? 0.4 : 1
          }}
          onMouseEnter={() => setShow({ ...show, index: data.img, show: 1 })}
          onMouseLeave={() => setShow({ ...show, index: "", show: 0 })}
        />
        <Grid
          sx={{
            backgroundImage: `url("${icons.eye}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: ["24px", "62px", "88px"],
            height: ["16px", "42px", "60px"],
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            opacity: show.index === data.img ? show.show : 0
          }}
          onMouseEnter={() => setShow({ ...show, index: data.img, show: 1 })}
        />
      </Grid>
      <Grid sx={{ width: "514px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography sx={{ fontSize: ["10px", "30px"], fontFamily: "Inter" }}>Episode {index + 1}</Typography>
        <Typography sx={{ fontSize: ["10px", "30px"], fontFamily: "Inter" }}>{data.title}</Typography>
        <Typography sx={{ fontSize: ["10px", "16px"], fontFamily: "Inter", color: "#6B6B6B", mt: ["18px", "", "37px"] }}>{data.txt}</Typography>
      </Grid>
    </Grid>
  );
}
