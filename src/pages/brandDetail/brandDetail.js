import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Modal } from "@mui/material";
import fileBD from "../../asset/backgroundImages/brandDetail/file";
import TheContext from "../../utils/context/userContext";
import Appbar from "../../component/Appbar";
import FooterMain from "../../component/footerMain";
import ImageSlick from "./imageSlick";
import BrandInformation from "./brandInformation";
import SimilarBrands from "./similarBrands";
// import RedMenuIcon from "./redMenuIcon";
import BrandDetailModal from "./brandDetailModal";
import * as API from "../../api/request";
import Swal from "sweetalert2";

export default function BrandDetail() {
  const params = useParams();
  const context = useContext(TheContext);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState();
  const [brandList, setBrandList] = useState([]);

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (params.id) {
      API.getBrand()
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              var onedata = res.data.data.find((el) => el.id === params.id);
              var relatedbrands = res.data.data.filter(
                (el) => el.id !== onedata.id
              );
              setData(onedata);
              setBrandList(relatedbrands);
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
        });
    }
  }, [params.id]);

  return (
    <Grid sx={{ backgroundColor: ["white", "white", "#E5E5E5"] }}>
      <Appbar />
      <Grid
        sx={{
          backgroundImage: `url("http://167.172.76.26${data?.brandDetailCoverImg}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "calc(100vw * 0.37)",
          position: "relative",
        }}
      >
        {/* <RedMenuIcon
          sx={{ top: "24%", left: "12%", transform: "translate(-24%, -12%)" }}
          click={redBttnClick}
        />
        <RedMenuIcon
          sx={{ top: "65%", left: "85%", transform: "translate(-65%, -85%)" }}
          click={redBttnClick}
        />
        <RedMenuIcon
          sx={{ top: "80%", left: "47%", transform: "translate(-80%, -47%)" }}
          click={redBttnClick}
        />
        <RedMenuIcon
          sx={{ top: "59%", left: "62%", transform: "translate(-59%, -62%)" }}
          click={redBttnClick}
        /> */}
      </Grid>
      <ImageSlick txt={context.txt.brandDetail} />
      {/* <SwipeToSlide /> */}
      <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <BrandInformation
          sx={{
            mt: ["2px", "0", "21px"],
            mb: ["44px", "0", "54px"],
            pt: ["23px", "55px", "74px"],
            pb: ["0", "64px", "86px"],
          }}
          data={data}
          txt={context.txt.contact}
        />
      </Grid>
      <SimilarBrands txt={context.txt.brandDetail} brandList={brandList} />

      <FooterMain />
      <Modal open={openModal} onClose={handleClose}>
        <div>
          <BrandDetailModal
            handleClose={handleClose}
            detail={detail}
            txt={context.txt.brandDetail}
          />
        </div>
      </Modal>
    </Grid>
  );
}

const detail = {
  img: [fileBD.pillow, fileBD.table],
  openStyle: "cotton",
  style: "modern",
  usage: "Living Room, Bedding Room, Bathroom, Office, Kitchen",
  material: "Fabric, Semi-Blackout Fabric",
  color: "Black/Customized Colors",
};
