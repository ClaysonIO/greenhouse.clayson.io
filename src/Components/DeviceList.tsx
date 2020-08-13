import React from "react";
import {observer} from "mobx-react-lite";
import {appState} from "../App";
import {Link} from "react-router-dom";

export const DeviceList = observer(()=>{
    return (<div>
        <table>
            <thead>
            <th>Name</th>
            </thead>
            <tbody>
            {appState.devices.map((device, index)=>{
                return <tr key={index}>
                    <td><Link to={`/devices/${device.deviceId}`}>{device.name || device.deviceId}</Link></td>
                </tr>
            })}
            </tbody>
        </table>
    </div>)
})