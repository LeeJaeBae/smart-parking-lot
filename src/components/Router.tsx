import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Search} from "../routes";

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"}>
                    <Search/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
