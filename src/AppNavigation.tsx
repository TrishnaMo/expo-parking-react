import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ParkingLot from "./pages/ParkingLotPage";

const AppNavigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/parking-lots/:lotSize" component={ParkingLot} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppNavigation;
