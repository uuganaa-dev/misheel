import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        top: ["30%", "19%", "19%"],
        right: "3%",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["30px", "60px", "90px"],
        height: ["30px", "60px", "90px"],
        backgroundColor: "gray",
      }}
      onClick={onClick}
    >
      <NavigateNextIcon sx={{ fontSize: [30, 60, 90], color: "white" }} />
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
        top: ["30%", "19%", "19%"],
        left: "3%",
        zIndex: "snackbar",
        boxShadow: 3,
        borderRadius: "30px",
        width: ["30px", "60px", "90px"],
        height: ["30px", "60px", "90px"],
        backgroundColor: "gray",
      }}
      onClick={onClick}
    >
      <NavigateNextIcon
        sx={{
          transform: "rotate(180deg)",
          fontSize: [30, 60, 90],
          color: "white",
        }}
      />
    </Grid>
  );
}

const ImageSlick = ({ txt }) => {
  const params = useParams();
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
    slidesToShow: detail.length >= 4 ? 4 : parseInt(detail.length),
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
        if (res.data.success) {
          if (res.data.data.length > 0) {
            var find = res.data.data.filter(
              (el) => el.productBrandId === params.id
            );
            setDetail(find);
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
  }, [params.id]);

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
                  backgroundImage: `url("https://mmmall.mn${item.productImage[0]}")`,
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
};
export default React.memo(ImageSlick);
