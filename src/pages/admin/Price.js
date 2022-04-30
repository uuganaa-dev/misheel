import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import PriceComp from "../../component/admin/Other/Price";
const Price = () => {
  return (
    <Layout>
      <PriceComp />
    </Layout>
  );
};

export default React.memo(Price);
