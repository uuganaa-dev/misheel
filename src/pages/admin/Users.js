import React from "react";
import Layout from "../../component/admin/Layout/Layout";
import CompUsers from "../../component/admin/Other/Users";

const Users = () => {
  return (
    <Layout>
      <CompUsers />
    </Layout>
  );
};

export default React.memo(Users);
