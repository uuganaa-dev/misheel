import { Grid } from "@mui/material";

import React from "react";
import icons from "../../asset/icon/filePath";

const MShiidelPic = ({ data, show, setShow, index, click }) => {
  return (
    <Grid
      sx={{
        width: ["200px", "262px", "370px"],
        height: ["243px", "323px", "465px"],
        position: "relative",
      }}
    >
      <Grid sx={{ position: "relative" }} onClick={click}>
        <Grid
          sx={{
            backgroundImage: `url("http://mmmall.mn${data.img}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: ["200px", "262px", "370px"],
            height: ["206px", "270px", "380px"],
            opacity: show.index === data.img && show.show === 1 ? 0.4 : 1,
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
            opacity: show.index === data.img ? show.show : 0,
          }}
          onMouseEnter={() => setShow({ ...show, index: data.img, show: 1 })}
        />
      </Grid>
    </Grid>
  );
};
export default React.memo(MShiidelPic);
