import React from 'react';
import {Layout} from "../Components/Layout";
import {Link} from "react-router-dom";

export const SensorsPage = ()=>{
    return <Layout>
        <h2>Sensors</h2>
        <Link to={"/devices/exampleDeviceId/sensors/exampleSensorId"}>Single Sensor</Link>
    </Layout>
}