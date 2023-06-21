import React from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import PrivateRoutes from "../../routes/private/PrivateRoutes";
import PublicRoutes from "../../routes/public/PublicRoutes";

export const Body = () => {
  return (
    <div className="Main">
      <Switch>
        <PublicRoutes />
        <PrivateRoutes />
      </Switch>
    </div>
  );
};
