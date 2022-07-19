import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../api/request";
import Appbar from "../component/Appbar";
import FooterMain from "../component/footerMain";
import { Modal } from "antd";
import Zoom from "react-medium-image-zoom";

const Product = () => {
  const params = useParams();
  const [isShow, setIsShow] = useState(false);
  const [oneData, setOneData] = useState();
  const [allproducts, setAllproducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [products, setProducts] = useState([]);
  const [brandid, setBrandid] = useState();

  const HandleClick = (el) => {
    var onebrand = brand.find((item) => item.id === el.productBrandId);
    setIsShow(true);
    setOneData({ ...el, brandDetail: onebrand });
  };

  useEffect(() => {
    API.getBrand()
      .then((res) => {
        setBrand(res.data.data.reverse());
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    API.getProduct()
      .then((res) => {
        setAllproducts(res.data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (allproducts.length > 0) {
      setProducts(
        allproducts.filter((el) =>
          el.catId.toLowerCase().includes(params.id.toLowerCase())
        )
      );
    }
  }, [allproducts, params.id]);

  const FilterBrand = (ids) => {
    setProducts(allproducts.filter((el) => el.productBrandId === ids));
  };

  return (
    <div style={{ fontFamily: "roboto" }}>
      <Modal
        title=""
        visible={isShow}
        footer={false}
        onCancel={() => {
          setIsShow(false);
          setOneData();
        }}
      >
        <div className="gadot-primary-modal-body">
          <div className="gadot-text-body">
            <div className="gadot-uploadType2">
              {oneData && (
                <div className="text-center">
                  <Zoom>
                    <img
                      src={"https://mmmall.mn" + oneData.productImage[0]}
                      alt=""
                      width={"100%"}
                      height="200px"
                      style={{ objectFit: "cover" }}
                    />
                  </Zoom>

                  <div className="text-left">
                    <span style={{ fontWeight: 600 }}>Брэнд нэр: </span>
                    {oneData.brandDetail.brandName}
                  </div>
                  <div className="text-left">
                    <span style={{ fontWeight: 600 }}>Бүтээгдэхүүн нэр: </span>
                    {oneData.productOpenStyle}
                  </div>
                  <div className="text-left">
                    <span style={{ fontWeight: 600 }}>Загвар: </span>
                    {oneData.productStyle}
                  </div>
                  <div className="text-left">
                    <span style={{ fontWeight: 600 }}>Хэрэглээ: </span>
                    {oneData.productUsage}
                  </div>
                  <div className="text-left">
                    <span style={{ fontWeight: 600 }}>Өнгө: </span>
                    {oneData.productColor}
                  </div>
                  <div className="text-left">
                    <span style={{ fontWeight: 600 }}>Матерал: </span>
                    {oneData.productMaterial}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
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
            #БҮТЭЭГДЭХҮҮН
          </Typography>
        </Grid>
      </Grid>
      <div className="search-contaner">
        <div className="search-filter">
          <div className="p-1" style={{ fontSize: "20px", fontWeight: 500 }}>
            Брэнд
          </div>
          {brand.length > 0 &&
            brand.map((el, index) => {
              return (
                <div
                  className={
                    brandid === el.id
                      ? "p-1 cursor-pointer text-primary"
                      : "p-1 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    FilterBrand(el.id);
                    setBrandid(el.id);
                  }}
                >
                  {el.brandName}
                </div>
              );
            })}
        </div>
        <div className="search-pruduct">
          {products.length > 0 ? (
            products.map((el, index) => {
              return (
                <div className="search-pruduct-item" key={index}>
                  <img
                    src={"https://mmmall.mn" + el.productImage[0]}
                    alt=""
                    height={"100%"}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="search-btn"
                    onClick={() => {
                      HandleClick(el);
                    }}
                  >
                    Дэлгэрэнгүй
                  </div>
                </div>
              );
            })
          ) : (
            <p>Хоосон байна...</p>
          )}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default React.memo(Product);
