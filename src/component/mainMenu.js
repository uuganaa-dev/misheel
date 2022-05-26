import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import * as API from "../api/request";

const MainMenu = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    API.getCategory()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid
      sx={{
        width: "100%",
        height: "397px",
        backgroundColor: "white",
        display: "flex",
        gap: "41px",
        justifyContent: "center",
        py: "29px",
        color: "#202020",
      }}
    >
      <Grid sx={{ width: "70%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "15px",
            fontSize: "16px",
            color: "#808080",
          }}
        >
          {category.length > 0 &&
            category.map((el, index) => {
              return (
                <div
                  style={{
                    flex: "1 0 20%",
                    marginBottom: "8px",
                    marginTop: "8px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                  key={index}
                  className="main-menu"
                >
                  {el.name}
                </div>
              );
            })}
        </div>
      </Grid>
    </Grid>
  );
};
export default React.memo(MainMenu);
