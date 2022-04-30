import React from "react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import Router from "./pages/Router";
import { UserContext } from "./utils/context/userContext";
import UserContextProvider from "./contexts/UserContext";
import AdminContextProvider from "./contexts/AdminContext";
import theme from "./style/theme";

import "antd/dist/antd.min.css";
import "moment/locale/mn";
import { ConfigProvider } from "antd";
import mnMN from "antd/lib/locale/mn_MN";

const App = () => {
  return (
    <UserContextProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <UserContext>
            <AdminContextProvider>
              <BrowserRouter>
                <ConfigProvider locale={mnMN}>
                  <Router />
                </ConfigProvider>
              </BrowserRouter>
            </AdminContextProvider>
          </UserContext>
        </ThemeProvider>
      </StyledEngineProvider>
    </UserContextProvider>
  );
};

export default React.memo(App);
