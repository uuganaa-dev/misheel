import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import ProductComp from "../../component/admin/Other/Product";
const Product = () => {
  return (
    <Layout>
      <ProductComp />
    </Layout>
  );
};

export default React.memo(Product);
