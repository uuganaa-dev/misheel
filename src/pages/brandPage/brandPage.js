import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import ReclamImage from "../../asset/backgroundImages/brandPage/reclam.png";
import { useNavigate } from "react-router-dom";
import * as API from "../../api/request";
import Swal from "sweetalert2";

const BrandPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [catValue, setCatValue] = useState();
  const [catrefresh, setCatrefresh] = useState(1);
  const [catList, setCatList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brandListFiltered, setBrandListFiltered] = useState([]);

  useEffect(() => {
    if (catValue !== undefined) {
      if (brandList.length > 0) {
        setBrandListFiltered(
          brandList.filter((el) => el.categoryId === catValue)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catValue, catrefresh]);

  useEffect(() => {
    setLoading(true);
    API.getCategory()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setCatList(res.data.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Категори унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    API.getBrand()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setBrandList(res.data.data);
            setBrandListFiltered(res.data.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Брэнд лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: "roboto" }}>
      <Appbar />
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: ["#F0F0F0", "#F0F0F0", "#F0F0F0"],
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
            #БРЭНД
          </Typography>
        </Grid>
        <Grid
          sx={{
            width: ["95%", "71%", "72%"],
            pb: ["64px", "50px", "72px"],
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Уншиж байна...
            </div>
          ) : (
            <>
              <Grid
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: ["4px", "15px", "15px"],
                  justifyContent: "space-between",
                  mb: "20px",
                }}
              >
                {catList.length > 0 &&
                  catList.map((item, index) => (
                    <Grid
                      key={index}
                      onClick={() => {
                        setCatValue(item.id);
                        setCatrefresh(catrefresh + 1);
                      }}
                    >
                      <Grid
                        sx={{
                          color: item.id === catValue ? "white" : "#0F56B3",
                          backgroundColor:
                            item.id === catValue ? "#0F56B3" : "white",
                          display: "flex",
                          border: "1px solid rgba(0,0,0,0.25)",
                          borderRadius: ["4px", "8px", "8px"],
                          padding: ["0.5px 4px", "3.5px 8px", "6.5px 8px"],
                          alignItems: "center",
                          gap: ["10px", "12px", "12px"],
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#0F56B3",
                            color: "white",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: ["10px", "12px", "14px"],

                            fontWeight: 500,
                            textTransform: "capitalize",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>

              <Grid
                sx={{
                  display: "grid",
                  gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)"],
                  columnGap: ["0px", "5px", "23px"],
                  gap: ["10px", "13px", "18px"],
                  marginTop: "20px",
                }}
              >
                {brandListFiltered.length > 0 &&
                  brandListFiltered.map((item, index) => {
                    var aa = "";
                    if (catList.length > 0) {
                      aa = catList.find((el) => el.id === item.categoryId);
                    }
                    return (
                      <Grid
                        key={index}
                        onClick={() => navigate("/brandDetail/" + item.id)}
                        className="brand-hover"
                      >
                        <Grid
                          sx={{
                            height: ["84px", "142px"],
                            borderRadius: "10px",
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: ["10px", "8px"],
                            transition: "transform 10s",
                            cursor: "pointer",
                          }}
                        >
                          <Grid
                            sx={{
                              backgroundImage: `url("http://misheel.tk${item.brandLogo}")`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              width: ["80px", "95px", "135px"],
                              height: ["80px", "95px", "135px"],
                              transition: "transform 10s",
                            }}
                          />
                          <Grid>
                            <Typography
                              sx={{
                                fontSize: ["10px", "16px"],

                                textTransform: "uppercase",
                              }}
                            >
                              {item.brandName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: ["8px", "13px"],

                                color: "#818181",
                              }}
                            >
                              {aa.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            </>
          )}
        </Grid>
        <Grid
          sx={{
            backgroundImage: `url("${ReclamImage}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "calc(100vw * 0.2)",
          }}
        />
        <FooterMain />
      </Grid>
    </div>
  );
};
export default React.memo(BrandPage);
