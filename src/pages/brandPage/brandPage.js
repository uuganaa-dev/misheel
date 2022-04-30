import React, { useState, useEffect } from "react";
import { Grid, useMediaQuery, Typography, Radio } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import ReclamImage from "../../asset/backgroundImages/brandPage/reclam.png";

import breakpoints from "../../utils/contants/breakpoints";
import json2mq from "json2mq";
import { useNavigate } from "react-router-dom";
import * as API from "../../api/request";
import Swal from "sweetalert2";
import { ArrowBackIosNew } from "@mui/icons-material";

export default function BrandPage() {
  const { tablet } = breakpoints;
  const isTablet = useMediaQuery(json2mq({ minWidth: tablet }));
  const navigate = useNavigate();

  const [show, setShow] = useState({
    index: "",
    show: 0,
  });
  const [loading, setLoading] = useState(false);
  const [catValue, setCatValue] = useState();
  const [catrefresh, setCatrefresh] = useState(1);
  const [catList, setCatList] = useState([]);
  const [subCatList, setSubCatList] = useState([]);
  const [subCatFilteredList, setSubCatFilteredList] = useState([]);
  const [subCatValue, setSubCatValue] = useState();
  const [brandList, setBrandList] = useState([]);
  const [brandListFiltered, setBrandListFiltered] = useState([]);

  useEffect(() => {
    if (catValue !== undefined) {
      if (subCatList.length > 0) {
        setSubCatFilteredList(
          subCatList.filter((el) => el.parentId === catValue)
        );
      }
      if (brandList.length > 0) {
        setBrandListFiltered(
          brandList.filter((el) => el.categoryId === catValue)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catValue, catrefresh]);

  useEffect(() => {
    if (subCatValue !== undefined) {
      if (brandList.length > 0 && catValue !== undefined) {
        setBrandListFiltered(
          brandList.filter(
            (el) =>
              el.categoryId === catValue && el.subCategoryId === subCatValue
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCatValue]);

  useEffect(() => {
    setLoading(true);
    API.getCategory()
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  name: el[1].name,
                };
                result.push(pp);
              });
              setCatList(result);
            }
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
      });
  }, []);

  useEffect(() => {
    API.getSubCategory()
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  parentId: el[1].parentId,
                  name: el[1].name,
                };
                result.push(pp);
              });
              setSubCatList(result);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Дэд категори унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, []);

  useEffect(() => {
    API.getBrand()
      .then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            var result = [];
            var aa = Object.entries(res.data);
            if (aa.length > 0) {
              // eslint-disable-next-line array-callback-return
              aa.map((el) => {
                var pp = {
                  id: el[0],
                  categoryId: el[1].categoryId,
                  subCategoryId: el[1].subCategoryId,
                  brandName: el[1].brandName,
                  brandLogo: el[1].brandLogo,
                };
                result.push(pp);
              });
              setBrandList(result);
              setBrandListFiltered(result);
            }
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
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: ["#F0F0F0", "#F0F0F0", "#F0F0F0"],
      }}
    >
      {isTablet && <Appbar />}
      <Grid
        sx={{
          pt: ["35px", "80px", "114px"],
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
                gap: ["4px", "24px", "34px"],
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
                      setSubCatValue();
                    }}
                  >
                    <Grid
                      sx={{
                        color: item.id === catValue ? "white" : "#0F56B3",
                        backgroundColor:
                          item.id === catValue ? "#0F56B3" : "white",
                        display: "flex",
                        border: "1px solid rgba(0,0,0,0.25)",
                        borderRadius: "8px",
                        padding: "6.5px 8px",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#0F56B3",
                          color: "white",
                        },
                      }}
                    >
                      <ArrowBackIosNew sx={{ transform: "rotate(-90deg)" }} />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontFamily: "Inter",
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
                gridTemplateColumns: [
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ],
                rowGap: ["14px", "24px"],
              }}
            >
              {subCatFilteredList.length > 0 &&
                subCatFilteredList.map((item, index) => (
                  <Grid key={index}>
                    <Grid
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Radio
                        sx={{
                          width: "16px",
                          height: "16px",
                          color: "rgba(156, 163, 175, 1)",
                        }}
                        value={item.id}
                        checked={item.id === subCatValue}
                        onChange={(e) => setSubCatValue(e.target.value)}
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontFamily: "Inter",
                          fontWeight: 500,
                          color: "rgba(32, 32, 32, 0.65)",
                          "&:hover": { color: "rgba(32, 32, 32, 1)" },
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
                rowGap: ["0px", "13px", "18px"],
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
                          "&:hover": {
                            boxShadow: "0.5px 1px 0.5px 1px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                        onMouseEnter={() =>
                          setShow({ ...show, index: index, show: 1 })
                        }
                        onMouseLeave={() =>
                          setShow({ ...show, index: "", show: 0 })
                        }
                      >
                        <Grid
                          sx={{
                            backgroundImage: `url("${item.brandLogo}")`,
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
                            sx={{
                              fontSize: ["10px", "16px"],
                              fontFamily: "Inter",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.brandName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: ["8px", "13px"],
                              fontFamily: "Inter",
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
  );
}
