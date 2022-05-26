import { Grid, Typography } from "@mui/material";
import React from "react";

const BrandDisc = ({ item, show, setShow, index, click }) => {
  return (
    <Grid
      sx={{
        height: ["84px", "142px"],
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        gap: [0, "8px"],
        transition: "transform 10s",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0.5px 1px 0.5px 1px rgba(0, 0, 0, 0.3)",
        },
      }}
      onMouseEnter={() => setShow({ ...show, index: index, show: 1 })}
      onMouseLeave={() => setShow({ ...show, index: "", show: 0 })}
      onClick={click}
    >
      <Grid
        sx={{
          backgroundImage: `url("${item.img}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width:
            show.index === index && show.show === 1
              ? ["84px"]
              : ["80px", "95px", "135px"],
          height:
            show.index === index && show.show === 1
              ? ["84px"]
              : ["80px", "95px", "135px"],
          transition: "transform 10s",
        }}
      />
      <Grid>
        <Typography
          sx={{ fontSize: ["10px", "16px"], textTransform: "uppercase" }}
        >
          {item.name}
        </Typography>
        <Typography sx={{ fontSize: ["8px", "13px"], color: "#818181" }}>
          {item.title}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default React.memo(BrandDisc);
