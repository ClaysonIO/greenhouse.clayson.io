import React from "react";
import {observer} from "mobx-react-lite";
import {appState} from "../App";
import {Link, useParams} from "react-router-dom";

export const SensorList = observer(()=>{
    const {deviceId} = useParams();

    const thisDevice = appState.devices.find(device=>device.deviceId === deviceId);

    if(!thisDevice){
        return <div>Not Found</div>
    }

    return (<div>
        <table>
            <thead>
            <th>Name</th>
            </thead>
            <tbody>
            {thisDevice.sensors.map((sensor, index)=>{
                return <tr key={index}>
                    <td><Link to={`/devices/${sensor.deviceId}/sensors/${sensor.sensorId}`}>{sensor.name || sensor.sensorId}</Link></td>
                </tr>
            })}
            </tbody>
        </table>
        <hr/>
        <a href={`/devices/${deviceId}/temperature`}>All Temperature Sensors</a>
    </div>)
})