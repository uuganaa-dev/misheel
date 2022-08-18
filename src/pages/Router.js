import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUserState } from "../contexts/UserContext";
import Main from "./main/main";
import Search from "./main/Search";
import ProductPage from "./Product";
import BrandPage from "./brandPage/brandPage";
import BrandDetail from "./brandDetail/brandDetail";
import CreatedBy from "./createdBy/createdBy";
import Co from "./coLeaders/co";
import MShiidel from "./mShiidel/mShiidel";
import MrMisheel from "./mrMisheel/mrMisheel";
import AboutUs from "./aboutUs/aboutUs";
import MPrice from "./mPrice/mPrice";
import Mall from "./Mall";
import Map from "./map/map";
import Service from "./admin/Service";
// Admin
import Login from "./admin/Login";
import Users from "./admin/Users";
import Admin from "./admin/Admin";
import Brand from "./admin/Brand";
import Product from "./admin/Product";
import Social from "./admin/Social";
import CoLeader from "../component/admin/Other/CoLeader";
import Price from "./admin/Price";
import About from "./admin/About";

const Router = () => {
  const { user } = useUserState();

  // const routes = [
  //   "/admin",
  //   "/brand",
  //   "/product",
  //   "/social",
  //   "/price",
  //   "/about",
  // ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/brandPage" element={<BrandPage />} />
        <Route path="/brandDetail/:id" element={<BrandDetail />} />
        <Route path="/createdBy" element={<CreatedBy />} />
        <Route path="/coLeader" element={<Co />} />
        <Route path="/mShiidel" element={<MShiidel />} />
        <Route path="/mrMisheel" element={<MrMisheel />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/mprice" element={<MPrice />} />
        <Route path="/mall" element={<Mall />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {user.loggedIn && (
        <Routes>
          {user.userInfo.role === "1" && (
            <>
              <Route path="/users" element={<Users />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/social" element={<Social />} />
              <Route path="/social/coleader" element={<CoLeader />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
            </>
          )}
          {(user.userInfo.role === "1" || user.userInfo.role === "3") && (
            <Route path="/price" element={<Price />} />
          )}
          {(user.userInfo.role === "1" || user.userInfo.role === "2") && (
            <>
              <Route path="/brand" element={<Brand />} />
              <Route path="/product" element={<Product />} />
            </>
          )}
        </Routes>
      )}
    </>
  );
};

export default React.memo(Router);
