import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://mmmall.mn/api";

export function MISHEEL() {
  return createInstance(URL);
}

const createInstance = (baseURL) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token =
    typeof window !== "undefined" ? localStorage.getItem("data") : null;

  if (token != null) {
    Object.assign(headers, {
      Authorization: "Bearer " + JSON.parse(token).accessToken,
    });
  }

  let api = axios.create({
    baseURL: baseURL,
    timeout: 200000,
    headers,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 503) {
        if (error.message !== "Network Error") {
          if (error.response.status === 401) {
            // localStorage.removeItem("data");
          } else {
            throw error;
          }
        } else {
          Swal.fire({
            icon: "warning",
            text: "Сервис дээр алдаа гарлаа.",
            confirmButtonColor: "#0e965a",
          });
          throw error;
        }
      } else {
        Swal.fire({
          icon: "warning",
          text: "Сервис дээр алдаа гарлаа.",
          confirmButtonColor: "#0e965a",
        });
        throw error;
      }
    }
  );
  return api;
};

// Нүүр хуудас

export async function postImg(formData) {
  const response = await MISHEEL().post("/admin", formData);
  return response;
}

export async function putImg(formData, id) {
  const response = await MISHEEL().put("/admin/" + id, formData);
  return response;
}

export async function getImg() {
  const response = await MISHEEL().get("/admin");
  return response;
}

export async function deleteImg(id) {
  const response = await MISHEEL().delete("/admin/" + id);
  return response;
}

export async function getBanner() {
  const response = await MISHEEL().get("/banner");
  return response;
}
export async function postBanner(formData) {
  const response = await MISHEEL().post("/banner", formData);
  return response;
}
// Нүүр хуудас
// Брэнд

export async function postBrand(formData) {
  const response = await MISHEEL().post("/brand", formData);
  return response;
}
export async function putBrand(formData, id) {
  const response = await MISHEEL().put("/brand/" + id, formData);
  return response;
}
export async function getBrand() {
  const response = await MISHEEL().get("/brand");
  return response;
}
export async function getOneBrand(id) {
  const response = await MISHEEL().get("/brand/" + id);
  return response;
}
export async function deleteBrand(id) {
  const response = await MISHEEL().delete("/brand/" + id);
  return response;
}
// Брэнд
// Category
export async function postCategory(params) {
  const response = await MISHEEL().post("/category", {
    ...params,
  });
  return response;
}
export async function getCategory() {
  const response = await MISHEEL().get("/category");
  return response;
}
export async function postSubCategory(params) {
  const response = await MISHEEL().post("/subcategory", {
    ...params,
  });
  return response;
}
export async function getSubCategory() {
  const response = await MISHEEL().get("/subcategory");
  return response;
}
// Category
// Product
export async function postProduct(formData) {
  const response = await MISHEEL().post("/product", formData);
  return response;
}
export async function getProduct() {
  const response = await MISHEEL().get("/product");
  return response;
}
export async function deleteProduct(id) {
  const response = await MISHEEL().delete("/product/" + id);
  return response;
}
// Product
// Price
export async function postPrice(formData) {
  const response = await MISHEEL().post("/price", formData);
  return response;
}
export async function getPrice() {
  const response = await MISHEEL().get("/price");
  return response;
}
export async function deletePrice(id) {
  const response = await MISHEEL().delete("/price/" + id);
  return response;
}
// Cover
export async function postPriceCover(formData) {
  const response = await MISHEEL().post("/priceHead", formData);
  return response;
}
export async function getPriceCover() {
  const response = await MISHEEL().get("/priceHead");
  return response;
}
// Cover
// Price
// Social
export async function postSocial(name, formData) {
  const response = await MISHEEL().post("/" + name, formData);
  return response;
}
export async function getSocial(name) {
  const response = await MISHEEL().get("/" + name);
  return response;
}
export async function deleteSocial(name, id) {
  const response = await MISHEEL().delete("/" + name + "/" + id);
  return response;
}
// Social
// About
export async function postAbout(formData) {
  const response = await MISHEEL().post("/about", formData);
  return response;
}
export async function putAbout(id, formData) {
  const response = await MISHEEL().put("/about/" + id, formData);
  return response;
}
export async function getAbout() {
  const response = await MISHEEL().get("/about");
  return response;
}
export async function deleteAboutRelated(id) {
  const response = await MISHEEL().delete("/about/related" + id);
  return response;
}
export async function getTimeline() {
  const response = await MISHEEL().get("/timeline");
  return response;
}
export async function postTimeline(formData) {
  const response = await MISHEEL().post("/timeline", formData);
  return response;
}
export async function deleteTimeline(id) {
  const response = await MISHEEL().delete("/timeline/" + id);
  return response;
}
export async function postUser(params) {
  const response = await MISHEEL().post("/auth/user", {
    ...params,
  });
  return response;
}
export async function putUser(id, params) {
  const response = await MISHEEL().put("/auth/user/" + id, {
    ...params,
  });
  return response;
}
export async function deleteUser(id) {
  const response = await MISHEEL().delete("/auth/user/" + id);
  return response;
}
export async function getUser() {
  const response = await MISHEEL().get("/auth/user");
  return response;
}
// About
// Service
export async function getService() {
  const response = await MISHEEL().get("/service");
  return response;
}
export async function postServie(formData) {
  const response = await MISHEEL().post("/service", formData);
  return response;
}
export async function deleteServie(id) {
  const response = await MISHEEL().delete("/service/" + id);
  return response;
}
// Service
