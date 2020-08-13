import React from 'react';
import {Layout} from "../Components/Layout";
import {SensorList} from "../Components/SensorList";

export const SensorsPage = ()=>{
    return <Layout>
        <h2>Sensors</h2>
        <SensorList/>
    </Layout>
}