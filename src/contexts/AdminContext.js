import React, { useContext, useReducer } from "react";

import AdminReducer from "../reducers/AdminReducer";

const AdminContext = React.createContext();

const initialState = {
  // ADMIN BEGIN
  list: [],
  refresh: 1,
  isShow: false,
  loading: undefined,
  cover1: undefined,
  cover2: undefined,
  cover3: undefined,
  image: undefined,
  uploadType: undefined,
  imgType: undefined,
  imgOrdern: undefined,
  imgName: "",
  // ADMIN END
  // BRAND BEGIN
  categoryList: [],
  categoryValue: undefined,
  categoryAddValue: "",
  subCategoryList: [],
  subCategoryFilteredList: [],
  subCategoryValue: undefined,
  subCategoryAddValue: "",
  brandName: "",
  brandLogoUrl: undefined,
  //Page
  brandListLoading: false,
  brandList: [],
  brandFilteredList: [],
  brandListReload: 1,
  pageCategoryValue: 99999,
  pageSubCategoryValue: undefined,
  pageSubCategoryFilteredList: [],
  //Page
  //BRAND DETGAIL BEGIN
  brandId: undefined,
  brandDetailCoverImg: undefined,
  brandDetailDesc: "",
  brandDetailNumber: "",
  brandDetailEmail: "",
  brandDetailFacebook: "",
  //BRAND DETGAIL END
  // BRAND END

  // PRODUCT BEGIN
  productList: [],
  productListLoading: false,
  productListRefresh: 1,
  productModal: false,
  productBrandId: undefined,
  productImageList: [],
  productImage: [],
  productOpenStyle: "",
  productStyle: "",
  productUsage: "",
  productMaterial: "",
  productColor: "",
  // PRODUCT END

  // PRICE BEGIN
  priceList: [],
  priceListLoading: false,
  priceListRefresh: 1,
  priceModal: false,
  priceImage: undefined,
  priceTitle: "",
  priceCategory: undefined,
  priceDate: new Date(),
  priceText: "Мишээл Барилгын Их Дэлгүүр",
  priceAllPriceImage: undefined,
  // PRICE END
  // SOCIAL
  createdby: false,
  mrMisheel: false,
  coLeader: false,
  mShiidel: false,
  createdbyData: [],
  mShiidelData: [],
  mrMisheelData: [],
  coLeaderData: [],
  // SOCIAL
  // ABOUT
  aboutId: undefined,
  aboutCoverImg: undefined,
  aboutContent: "",
  aboutRelatedImg: [],
  aboutYear: undefined,
  aboutImg: undefined,
  aboutText: "",
  // ABOUT
};

export const useAdminState = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error(
      "useAdminState нь AdminContextProvider дотор ашиглагдах ёстой!"
    );
  }
  return context;
};

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useReducer(AdminReducer, initialState);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default React.memo(AdminContextProvider);
