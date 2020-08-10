import React from "react";
import {Link, useParams} from "react-router-dom";
import {GithubLogo} from "./GithubLogo";

export const Header = ()=>{
    const {deviceId, sensorId} = useParams();
    return (
        <header>
            <Link to={'/'}><h1>Greenhouse</h1></Link>
            {deviceId ? <Link to={'/devices'} >Devices</Link>: ""}
            {sensorId ? <Link to={`/devices/${deviceId}`} >Sensors</Link> : ""}
            <div style={{flex: 1}}/>

            {/*<Link to={`/settings`}>Settings</Link>*/}
            <GithubLogo/>
        </header>
    )
}