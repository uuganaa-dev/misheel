import React from "react";
import { Grid, TextField, Menu, MenuItem, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import img from "./Group.png";
import img2 from "./Group (1).png";
import CategoryArrow from "../brandPage/categoryArrow";

export default function Map() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid sx={{ backgroundColor: "#ECEBE7" }}>
      <Appbar />
      <Grid sx={{ width: "100%", height: "224px", position: "relative" }}>
        <Grid
          sx={{
            width: "80%",
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "space-between"
          }}>
          <Grid sx={{ display: "flex", gap: "60px" }}>
            {["Брэнд", "Бүтээгдэхүүн"].map((item, index) => (
              <Grid key={index} onClick={handleClick}>
                <CategoryArrow txt={item} chooseCategory={false} />
              </Grid>
            ))}
          </Grid>
          <TextField
            label=""
            id="outlined-size-small"
            size="small"
            sx={{ backgroundColor: "white", width: "188px", color: "#0F56B3" }}
            placeholder="Хайх ..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon sx={{ color: "#0F56B3" }} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>TOTO</MenuItem>
          <MenuItem onClick={handleClose}>TOREX</MenuItem>
          <MenuItem onClick={handleClose}>DECOR</MenuItem>
        </Menu>
      </Grid>
      <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white", pt: "107px", pb: "153px" }}>
        <Grid
          sx={{
            backgroundImage: `url("${img}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "80%",
            height: "calc(80vw * 0.61)"
          }}
        />
        <Grid
          sx={{
            backgroundImage: `url("${img2}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "80%",
            height: "calc(80vw * 0.62)"
          }}
        />
      </Grid>
      <FooterMain />
    </Grid>
  );
}
