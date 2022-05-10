import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import AboutComp from "../../component/admin/Other/About";

const About = () => {
  return (
    <Layout>
      <AboutComp />
    </Layout>
  );
};

export default React.memo(About);
