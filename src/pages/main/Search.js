import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../../api/request";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";

const Search = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getProduct()
      .then((res) =>
        setProducts(
          res.data.data.filter((el) =>
            el.productOpenStyle
              .toLowerCase()
              .includes(params.value.toLocaleLowerCase())
          )
        )
      )
      .catch(() => {});
  }, [params.value]);

  return (
    <div>
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
              fontFamily: "Inter",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 200,
            }}
          >
            #SEARCH
          </Typography>
          <Typography
            sx={{
              fontSize: ["10px", "12px"],
              fontFamily: "Inter",
              letterSpacing: "0.25px",
              textTransform: "uppercase",
              color: "#707070",
            }}
          >
            ЗӨВЛӨЖ БАЙНА
          </Typography>
        </Grid>
        {params.value}
        <FooterMain />
      </Grid>
    </div>
  );
};

export default React.memo(Search);
