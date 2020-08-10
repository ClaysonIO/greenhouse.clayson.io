import React from 'react';
import {Route, Switch} from "react-router-dom";
import {AppState} from "./Utilities/AppState";
import {DevicesPage} from "./Pages/DevicesPage";
import {SensorsPage} from "./Pages/SensorsPage";
import {SingleSensorPage} from "./Pages/SingleSensorPage";
import './App.css'

export const appState = new AppState();

function App() {
    return (
        <Switch>
            <Route exact path={"/devices"} component={DevicesPage}/>
            <Route exact path={"/devices/:deviceId"} component={SensorsPage}/>
            <Route exact path={"/devices/:deviceId/sensors/:sensorId"} component={SingleSensorPage}/>

            <Route component={DevicesPage}/>
        </Switch>
    );
}

export default App;