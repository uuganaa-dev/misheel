import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import AdminComp from "../../component/admin/Other/Admin";

const Admin = () => {
  return (
    <Layout>
      <AdminComp />
    </Layout>
  );
};

export default React.memo(Admin);
