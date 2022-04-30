import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import BrandComp from "../../component/admin/Other/Brand";
const Brand = () => {
  return (
    <Layout>
      <BrandComp />
    </Layout>
  );
};

export default React.memo(Brand);
