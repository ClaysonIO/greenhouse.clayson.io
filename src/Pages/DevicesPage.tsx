import React from 'react';
import {Layout} from "../Components/Layout";
import {DeviceList} from "../Components/DeviceList";

export const DevicesPage = ()=>{
    return <Layout>
        <h2>Devices</h2>
        <DeviceList/>
    </Layout>
}