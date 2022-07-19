import React from "react";
import Layout from "../Layout/Layout";

const CoLeader = () => {
  return (
    <Layout>
      <div
        style={{
          backgroundColor: "white",
          width: "40px",
          height: "40px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <i className="fa fa-arrow-left"></i>
      </div>
    </Layout>
  );
};

export default React.memo(CoLeader);
