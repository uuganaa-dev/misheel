import React from "react";

const Footer = () => {
  return (
    <footer className="footer undefined undefined">
      <p className="clearfix text-muted m-0">
        © {new Date().getFullYear()} <i>Developed by LLC</i>
      </p>
    </footer>
  );
};

export default React.memo(Footer);
