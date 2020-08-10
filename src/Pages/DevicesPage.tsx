import React from 'react';
import {Layout} from "../Components/Layout";
import { Link } from 'react-router-dom';

export const DevicesPage = ()=>{
    return <Layout>
        <h2>Devices</h2>
        <Link to={"/devices/exampleDeviceId"}>Single Device</Link>
    </Layout>
}