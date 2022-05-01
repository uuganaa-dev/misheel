import axios from "axios";
import Swal from "sweetalert2";

// const URL =
//   "https://newmisheel-default-rtdb.asia-southeast1.firebasedatabase.app/";
const URL = "http://167.172.76.26/api";

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
export async function postProduct(params) {
  const response = await MISHEEL().post("/product.json", {
    ...params,
  });
  return response;
}
export async function getProduct() {
  const response = await MISHEEL().get("/product.json");
  return response;
}
export async function deleteProduct(id) {
  const response = await MISHEEL().delete("/product/" + id + ".json");
  return response;
}
// Product
// Price
export async function postPrice(params) {
  const response = await MISHEEL().post("/price.json", {
    ...params,
  });
  return response;
}
export async function getPrice() {
  const response = await MISHEEL().get("/price.json");
  return response;
}
export async function deletePrice(id) {
  const response = await MISHEEL().delete("/price/" + id + ".json");
  return response;
}
// Price
// Social
export async function postSocial(name, params) {
  const response = await MISHEEL().post("/" + name + ".json", {
    ...params,
  });
  return response;
}
export async function getSocial(name) {
  const response = await MISHEEL().get("/" + name + ".json");
  return response;
}
export async function deleteSocial(name, id) {
  const response = await MISHEEL().delete("/" + name + "/" + id + ".json");
  return response;
}
// Social
