import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Grid, Typography } from "@mui/material";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import Unit from "./unit";
import Swal from "sweetalert2";
import * as API from "../../api/request";

export default function MPrice() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onedata, setOnedata] = useState();
  const [data, setData] = useState([]);
  const [catList, setCatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastItem, setLastItem] = useState();

  const HandleClick = (id) => {
    setIsModalVisible(true);
    if (id === 0) {
      setOnedata();
    } else {
      setOnedata(data.find((el) => el.id === id));
    }
  };

  useEffect(() => {
    setLoading(true);
    API.getCategory()
      .then((res) => {
        if (res.data.success) {
          if (res.data.length > 0) {
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
      });
  }, []);

  useEffect(() => {
    API.getPrice()
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setData(res.data.data);
            setLastItem(res.data.data.reverse()[0]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Зах зээлийн үнийн лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Appbar />
      <Grid
        sx={{
          backgroundColor: ["#ECEBE7", "#ECEBE7", "#ECEBE7"],
          paddingTop: "58px",
        }}
      >
        <Grid sx={{ position: "relative" }}>
          <Grid
            sx={{
              backgroundImage: `url("http://misheel.tk${lastItem?.priceImage}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "calc(100vw * 0.34)",
            }}
          />
          <Typography
            sx={{
              fontSize: ["10px", "34px"],

              letterSpacing: "3.25px",
              textTransform: "uppercase",
              fontWeight: 700,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {lastItem?.priceTitle}
            <span
              className="detail-btn"
              onClick={() => HandleClick(lastItem?.id)}
            >
              Дэлгэрэнгүй
            </span>
          </Typography>
        </Grid>
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
            #Зах зээлийн үнэ
          </Typography>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Grid sx={{ pt: "10px", width: "75%", mb: "158px" }}>
            <Typography
              sx={{
                fontSize: ["12px", "12px", "18px"],

                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Зах зээлийн үнэ
            </Typography>
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
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "31px",
                  mt: "30px",
                }}
              >
                {data.length > 0 &&
                  data.map((item, index) => {
                    var catfind = catList.find(
                      (el) => el.id === item.priceCategory
                    );
                    return (
                      <Grid
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => HandleClick(item.id)}
                      >
                        <Unit item={item} catfind={catfind} />
                      </Grid>
                    );
                  })}
              </Grid>
            )}
          </Grid>

          {onedata !== undefined && (
            <Modal
              title=""
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={false}
              width={1000}
            >
              <div className="gadot-primary-modal-body">
                <div className="gadot-uploadType2">
                  <div onClick={() => HandleClick(0)}>
                    <img
                      src={"http://misheel.tk" + onedata?.priceAllPriceImage}
                      alt=""
                      width={"100%"}
                    />
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </Grid>

        <FooterMain />
      </Grid>
    </>
  );
}
