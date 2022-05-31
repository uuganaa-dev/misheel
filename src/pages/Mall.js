import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../component/Appbar";
import FooterMain from "../component/footerMain";
import * as API from "../api/request";

const Mall = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    API.getService()
      .then((res) => setList(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <div style={{ fontFamily: "roboto" }}>
      <Appbar />
      <Grid
        sx={{
          backgroundColor: ["white", "white", "#E5E5E5"],
          paddingTop: "58px",
        }}
      >
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
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            #ҮЙЛЧИЛГЭЭНИЙ ТӨВҮҮД
          </Typography>
        </Grid>
      </Grid>
      <div className="search-contaner" style={{ flexWrap: "wrap" }}>
        {list.length > 0 &&
          list.map((el, index) => {
            return (
              <div className="service-item" key={index}>
                <img
                  src={"http://mmmall.mn" + el.imageUrl}
                  alt=""
                  className="service-item-img"
                />
                <div>{el.text}</div>
              </div>
            );
          })}
      </div>
      <FooterMain />
    </div>
  );
};

export default React.memo(Mall);
