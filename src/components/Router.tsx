import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Information, NotFound, ParkingLot, Search} from "../routes";

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"}>
                    <Search/>
                </Route>
                <Route exact path={"/parking"}>
                    <ParkingLot/>
                </Route>
                <Route exact path={"/parking/:id"}>
                    <Information/>
                </Route>

                <Route path={"/"}>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
