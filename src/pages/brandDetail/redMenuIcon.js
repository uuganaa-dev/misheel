import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const RedMenuIcon = ({ sx, click }) => {
  return (
    <MenuIcon
      sx={{
        color: "white",
        position: "absolute",
        backgroundColor: "#F13333",
        width: "13px",
        height: "13px",
        borderRadius: "10px",
        p: "4px",
        cursor: "pointer",
        ...sx,
      }}
      onClick={click}
    />
  );
};
export default React.memo(RedMenuIcon);
