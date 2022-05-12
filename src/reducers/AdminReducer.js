const AdminReducer = (state, action) => {
  switch (action.type) {
    // ADMIN BEGIN
    case "LOADING":
      return {
        ...state,
        loading: action.data,
      };
    case "LIST":
      return {
        ...state,
        list: action.data,
      };
    case "REFRESH":
      return {
        ...state,
        refresh: state.refresh + 1,
      };
    case "COVER1":
      return {
        ...state,
        cover1: action.data,
      };
    case "COVER2":
      return {
        ...state,
        cover2: action.data,
      };
    case "COVER3":
      return {
        ...state,
        cover3: action.data,
      };
    case "IMAGE":
      return {
        ...state,
        image: action.data,
      };
    case "UPLOAD_TYPE":
      return {
        ...state,
        uploadType: action.data,
      };
    case "IMG_NAME":
      return {
        ...state,
        imgName: action.data,
      };
    case "SHOW_MODAL_CHANGE":
      return {
        ...state,
        uploadType: action.uploadType,
        isShow: action.isShow,
        imgType: action.imgType,
        imgOrdern: action.imgOrdern,
      };
    case "MODAL_CLOSE":
      return {
        ...state,
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
      };
    // ADMIN END
    // BRAND BEGIN
    case "MODAL":
      if (action.data === true) {
        if (action.brandId === "add") {
          return {
            ...state,
            isShow: action.data,
          };
        } else {
          var findData = state.brandList.find((el) => el.id === action.brandId);
          var subcatList = state.subCategoryList.filter(
            (el) => el.parentId === findData.categoryId
          );
          return {
            ...state,
            subCategoryFilteredList: subcatList.length > 0 ? subcatList : [],
            isShow: action.data,
            categoryValue: findData?.categoryId,
            categoryAddValue: "",
            subCategoryValue: findData?.subCategoryId,
            subCategoryAddValue: "",
            brandName: findData?.brandName,
            brandLogoUrl: findData?.brandLogo,
            brandId: findData?.id,
            brandDetailCoverImg: findData?.brandDetailCoverImg,
            brandDetailDesc: findData?.brandDetailDesc,
            brandDetailNumber: findData?.brandDetailNumber,
            brandDetailEmail: findData?.brandDetailEmail,
            brandDetailFacebook: findData?.brandDetailFacebook,
          };
        }
      } else {
        return {
          ...state,
          isShow: action.data,
          categoryValue: undefined,
          categoryAddValue: "",
          subCategoryValue: undefined,
          subCategoryAddValue: "",
          brandName: "",
          brandLogoUrl: undefined,
          brandId: undefined,
          brandDetailCoverImg: undefined,
          brandDetailDesc: "",
          brandDetailNumber: "",
          brandDetailEmail: "",
          brandDetailFacebook: "",
        };
      }

    case "CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.data,
      };
    case "CATEGORY_VALUE":
      var aa = [];
      if (action.data !== undefined) {
        if (state.subCategoryList.length > 0) {
          aa = state.subCategoryList.filter(
            (el) => el.parentId === action.data
          );
        }
      }
      return {
        ...state,
        categoryValue: action.data,
        subCategoryFilteredList: aa,
        subCategoryValue: undefined,
      };
    case "CATEGORY_ADD_VALUE":
      return {
        ...state,
        categoryAddValue: action.data,
      };
    case "SUB_CATEGORY_LIST":
      if (state.categoryValue !== undefined) {
        return {
          ...state,
          subCategoryList: action.data,
          subCategoryFilteredList: action.data.filter(
            (el) => el.parentId === state.categoryValue
          ),
        };
      } else {
        return {
          ...state,
          subCategoryList: action.data,
        };
      }

    case "SUB_CATEGORY_VALUE":
      return {
        ...state,
        subCategoryValue: action.data,
      };
    case "SUB_CATEGORY_ADD_VALUE":
      return {
        ...state,
        subCategoryAddValue: action.data,
      };
    case "BRAND_NAME":
      return {
        ...state,
        brandName: action.data,
      };
    case "BRAND_LOGO_URL":
      return {
        ...state,
        brandLogoUrl: action.data,
      };
    //Page
    case "BRAND_LIST_LOADING":
      return {
        ...state,
        brandListLoading: action.data,
      };
    case "BRAND_LIST":
      return {
        ...state,
        brandList: action.data,
        brandFilteredList: action.data,
      };
    case "BRAND_LIST_RELOAD":
      return {
        ...state,
        brandListReload: state.brandListReload + 1,
      };
    case "PAGE_CATEGORY_VALUE":
      var tempCatList = [];
      var tempBrandList = [];
      if (action.data !== undefined) {
        if (state.subCategoryList.length > 0) {
          tempCatList = state.subCategoryList.filter(
            (el) => el.parentId === action.data
          );
        }
        if (state.brandList.length > 0) {
          tempBrandList = state.brandList.filter(
            (el) => el.categoryId === action.data
          );
        }
      }
      return {
        ...state,
        pageCategoryValue: action.data,
        pageSubCategoryValue: undefined,
        pageSubCategoryFilteredList: tempCatList,
        brandFilteredList: tempBrandList,
      };
    case "PAGE_SUB_CATEGORY_VALUE":
      var tempBrandList1 = [];
      if (action.data !== undefined && state.pageCategoryValue !== undefined) {
        if (state.brandList.length > 0) {
          tempBrandList1 = state.brandList.filter(
            (el) =>
              el.categoryId === state.pageCategoryValue &&
              el.subCategoryId === action.data
          );
        }
      }
      return {
        ...state,
        pageSubCategoryValue: action.data,
        brandFilteredList: tempBrandList1,
      };
    //Page
    //BRAND DETGAIL BEGIN
    case "BRAND_DETAIL_COVER_IMG":
      return {
        ...state,
        brandDetailCoverImg: action.data,
      };
    case "BRAND_DETAIL_DESC":
      return {
        ...state,
        brandDetailDesc: action.data,
      };
    case "BRAND_DETAIL_NUMBER":
      return {
        ...state,
        brandDetailNumber: action.data,
      };
    case "BRAND_DETAIL_EMAIL":
      return {
        ...state,
        brandDetailEmail: action.data,
      };
    case "BRAND_DETAIL_FACEBOOK":
      return {
        ...state,
        brandDetailFacebook: action.data,
      };
    //BRAND DETGAIL END
    // BRAND END
    //PRODUCT BEGIN
    case "PRODUCT_LIST":
      return {
        ...state,
        productList: action.data,
      };
    case "PRODUCT_LIST_LOADING":
      return {
        ...state,
        productListLoading: action.data,
      };
    case "PRODUCT_MODAL":
      if (action.data) {
        return {
          ...state,
          productModal: action.data,
        };
      } else {
        return {
          ...state,
          productModal: action.data,
          productListLoading: false,
          productBrandId: undefined,
          productImage: [],
          productImageList: [],
          productOpenStyle: "",
          productStyle: "",
          productUsage: "",
          productMaterial: "",
          productColor: "",
        };
      }

    case "PRODUCT_REFRESH":
      return {
        ...state,
        productListRefresh: state.productListRefresh + 1,
      };
    case "PRODUCT_BRAND_ID":
      return {
        ...state,
        productBrandId: action.data,
      };
    case "PRODUCT_IMAGE":
      return {
        ...state,
        productImage: action.data,
      };
    case "PRODUCT_IMAGE_LIST":
      return {
        ...state,
        productImageList: action.data,
      };
    case "PRODUCT_OPEN_STYLE":
      return {
        ...state,
        productOpenStyle: action.data,
      };
    case "PRODUCT_STYLE":
      return {
        ...state,
        productStyle: action.data,
      };
    case "PRODUCT_USAGE":
      return {
        ...state,
        productUsage: action.data,
      };
    case "PRODUCT_MATERIAL":
      return {
        ...state,
        productMaterial: action.data,
      };
    case "PRODUCT_COLOR":
      return {
        ...state,
        productColor: action.data,
      };
    //PRODUCT END

    //PRICE BEGIN
    case "PRICE_LIST":
      return {
        ...state,
        priceList: action.data,
      };
    case "PRICE_LIST_LOADING":
      return {
        ...state,
        priceListLoading: action.data,
      };
    case "PRICE_LIST_REFRESH":
      return {
        ...state,
        priceListRefresh: state.priceListRefresh + 1,
      };
    case "PRICE_MODAL":
      if (action.data) {
        return {
          ...state,
          priceModal: action.data,
        };
      } else {
        return {
          ...state,
          priceListLoading: false,
          priceModal: false,
          priceImage: undefined,
          priceTitle: "",
          priceCategory: undefined,
          priceDate: new Date(),
          priceText: "Мишээл Барилгын Их Дэлгүүр",
          priceAllPriceImage: undefined,
        };
      }
    case "PRICE_IMAGE":
      return {
        ...state,
        priceImage: action.data,
      };
    case "PRICE_ALL_PRICE_IMAGE":
      return {
        ...state,
        priceAllPriceImage: action.data,
      };
    case "PRICE_TITLE":
      return {
        ...state,
        priceTitle: action.data,
      };
    case "PRICE_CATEGORY":
      return {
        ...state,
        priceCategory: action.data,
      };
    case "PRICE_DATE":
      return {
        ...state,
        priceDate: action.data,
      };
    case "PRICE_TEXT":
      return {
        ...state,
        priceText: action.data,
      };
    //PRICE END
    //SOCIAL BEGIN
    case "CREATED_BY":
      return {
        ...state,
        createdby: action.data,
      };
    case "MR_MISHEEL":
      return {
        ...state,
        mrMisheel: action.data,
      };
    case "CO_LEADER":
      return {
        ...state,
        coLeader: action.data,
      };
    case "M_SHIIDEL":
      return {
        ...state,
        mShiidel: action.data,
      };
    case "CREATED_BY_DATA":
      return {
        ...state,
        createdbyData: action.data,
      };
    case "M_SHIIDEL_DATA":
      return {
        ...state,
        mShiidelData: action.data,
      };
    case "MR_MISHEEL_DATA":
      return {
        ...state,
        mrMisheelData: action.data,
      };
    case "CO_LEADER_DATA":
      return {
        ...state,
        coLeaderData: action.data,
      };
    //SOCIAL END
    //ABOUT START
    case "ABOUT_SET":
      var result = [];
      if (action.data.related.length > 0) {
        // eslint-disable-next-line array-callback-return
        action.data.related.map((el) => {
          result.push({ ...el, name: el.img.split("/")[3] });
        });
      }
      return {
        ...state,
        aboutId: action.data._id,
        aboutCoverImg: {
          aboutImage: action.data.cover,
        },
        aboutContent: action.data.text,
        aboutRelatedImg: result,
      };
    case "ABOUT_COVER_IMG":
      return {
        ...state,
        aboutCoverImg: action.data,
      };
    case "ABOUT_CONTENT":
      return {
        ...state,
        aboutContent: action.data,
      };
    case "ABOUT_RELATED_IMG":
      return {
        ...state,
        aboutRelatedImg: action.data,
      };
    case "ABOUT_YEAR":
      return {
        ...state,
        aboutYear: action.data,
      };
    case "ABOUT_IMG":
      return {
        ...state,
        aboutImg: action.data,
      };
    case "ABOUT_TEXT":
      return {
        ...state,
        aboutText: action.data,
      };
    //ABOUT END

    default:
      return state;
  }
};
export default AdminReducer;
