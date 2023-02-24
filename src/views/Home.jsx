import React from "react";

import { useTranslation } from "react-i18next";
import FacetcherDrawer from "../components/drawer/drawer";

const Home = () => {
     const { t } = useTranslation();

     return (
          <div>
               <FacetcherDrawer />
          </div>
     );
};

export default Home;
