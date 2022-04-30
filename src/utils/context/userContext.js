import React, { useState, createContext } from "react";
import mnText from "../contants/mnText";
import enText from "../contants/enText";

const TheContext = createContext({});

export const UserContext = (props) => {
  const [txt, setTxt] = useState(mnText);
  const [index, setIndex] = useState(0);
  const ChangeTxt = (index) => {
    setIndex(index);
    setTxt(index === 0 ? mnText : index === 1 ? enText : mnText);
  };

  return <TheContext.Provider value={{ txt, ChangeTxt, index }}>{props.children}</TheContext.Provider>;
};

export default TheContext;
