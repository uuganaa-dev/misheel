import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import SocialComp from "../../component/admin/Other/Social";
const Social = () => {
  return (
    <Layout>
      <SocialComp />
    </Layout>
  );
};

export default React.memo(Social);
