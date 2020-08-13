import React, {useEffect} from 'react';
import {Layout} from "../Components/Layout";
import {useParams} from "react-router-dom";
import {appState} from "../App";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";
//@ts-ignore
import { ResizableBox, Chart } from 'react-charts'

export const SingleSensorPage = observer(()=>{

    const {deviceId, sensorId} = useParams();

    const thisDevice = appState.devices.find(device=>device.deviceId === deviceId);
    const thisSensor = thisDevice?.sensors.find(sensor=>sensor.sensorId === sensorId);

    useEffect(()=>{
        console.log("Fetching...")
        thisSensor?.fetchReadings();
    }, [thisDevice, thisSensor, deviceId, sensorId])

    const data = React.useMemo(()=>[thisSensor?.farenheitChartData] || [], [thisSensor?.readings])

    const axes = React.useMemo(
        () => [
            { primary: true, type: "time", position: "bottom" },
            { type: "linear", position: "left" }
        ],
        []
    );

    const series = React.useMemo(
        () => ({
            showPoints: false
        }),
        []
    );

    console.log(data)
    return <Layout>
        <h2>Sensor History</h2>
        {thisSensor ?
            <div>
                <div><b>TIME:</b> {thisSensor?.latestReading?.dayjs.format("MMM D, hh:mm")}</div>
                <div><b>VALUE:</b> {thisSensor?.latestReading?.value}</div>
                <br/>
                <br/>
                <div style={{height: '500px', width: '800px'}}>
                    <Chart data={data} series={series} axes={axes}/>
                </div>
            </div>
            : ""}
    </Layout>
});