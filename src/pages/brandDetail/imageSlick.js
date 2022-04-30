import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Grid, Modal } from "@mui/material";
import BrandDetailModal from "./brandDetailModal";
import * as API from "../../api/request";
import Swal from "sweetalert2";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <Grid
      sx={{
        ...style,
        position: "absolute",
        top: "19%",
        right: "3%",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["16px", "40px", "50px"],
        height: ["16px", "40px", "50px"],
      }}
      onClick={onClick}
    >
      <NavigateNextIcon sx={{ fontSize: [16, 40, 50] }} />
    </Grid>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <Grid
      sx={{
        ...style,
        position: "absolute",
        top: "19%",
        left: "3%",
        zIndex: "snackbar",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["16px", "40px", "50px"],
        height: ["16px", "40px", "50px"],
      }}
      onClick={onClick}
    >
      <NavigateNextIcon
        sx={{ transform: "rotate(180deg)", fontSize: [16, 40, 50] }}
      />
    </Grid>
  );
}

export default function ImageSlick({ txt }) {
  const [detail, setDetail] = useState([]);
  const [itemDetail, setItemDetail] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const settings = {
    className: "center",
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {},
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          swipeToSlide: true,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          swipeToSlide: true,
          infinite: true,
        },
      },
    ],
  };
  const OpenModal = (id) => {
    setItemDetail(detail.length > 0 && detail.find((el) => el.id === id));
    setOpenModal(true);
  };
  useEffect(() => {
    API.getProduct()
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
                  productBrandId: el[1].productBrandId,
                  productImage: el[1].productImage,
                  productOpenStyle: el[1].productOpenStyle,
                  productStyle: el[1].productStyle,
                  productUsage: el[1].productUsage,
                  productMaterial: el[1].productMaterial,
                  productColor: el[1].productColor,
                };
                result.push(pp);
              });
              setDetail(result);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Алдаа гарлаа.",
          text: "Product лист унших үед алдаа гарлаа дахин оролдоно уу.",
          confirmButtonColor: "#0f56b3",
        });
      });
  }, []);

  return (
    <Grid
      sx={{
        width: "100%",
        position: "relative",
        zIndex: "modal",
        pt: ["28px", "30px", "73px"],
        pb: [0, 0, "50px"],
        backgroundColor: "white",
      }}
    >
      <Slider {...settings}>
        {detail.length > 0 &&
          detail.map((item, index) => (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              <Grid
                sx={{
                  backgroundImage: `url("${item.productImage[0]}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  width: ["100px", "244px"],
                  height: ["73px", "177px"],
                  cursor: "pointer",
                }}
                onClick={() => {
                  OpenModal(item.id);
                }}
              />
            </Grid>
          ))}
      </Slider>
      <Modal open={openModal} onClose={handleClose}>
        <div>
          <BrandDetailModal
            handleClose={handleClose}
            detail={itemDetail}
            txt={txt}
          />
        </div>
      </Modal>
    </Grid>
  );
}
