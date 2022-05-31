import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import ServiceComp from "../../component/admin/Other/Service";

const Service = () => {
  return (
    <Layout>
      <ServiceComp />
    </Layout>
  );
};

export default React.memo(Service);
