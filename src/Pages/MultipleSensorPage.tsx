import React, {useEffect} from 'react';
import {Layout} from "../Components/Layout";
import {useParams} from "react-router-dom";
import {appState} from "../App";
import {observer} from "mobx-react-lite";
//@ts-ignore
import { Chart } from 'react-charts'
import {Loading} from "../Components/Loading";

export const MultipleSensorPage = observer(()=>{

    const {deviceId} = useParams();

    const thisDevice = appState.devices.find(device=>device.deviceId === deviceId);

    const tempSensors = thisDevice?.sensors.filter(val=>val.type === "t") || [];

    useEffect(()=>{
        Promise.all(tempSensors.map(val=>val.fetchReadings()))
    }, [thisDevice, deviceId])


    const readings = tempSensors.map(val=>val.readings);
    // eslint-disable-next-line
    const data = React.useMemo(()=>tempSensors.map(val=>val.chartData) || [], [thisDevice, readings])

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
        <h2>Multiple Sensor History - {thisDevice?.name}</h2>
        {thisDevice ?
            thisDevice.sensors.reduce((acc, val)=>val.fetching || acc, false) ? <Loading/> :
                <div>
                    <div><b>TIME:</b> {tempSensors[0]?.latestReading?.dayjs.format("MMM D, h:mm a")}</div>
                    <div><b>VALUE:</b> {tempSensors[0]?.latestReading?.value}</div>
                    <br/>
                    <br/>
                    <div style={{height: '500px', width: '800px'}}>
                        <Chart
                            secondaryCursor
                            data={data}
                            series={series}
                            axes={axes}
                        />
                    </div>
                </div>
            : ""}
    </Layout>
});