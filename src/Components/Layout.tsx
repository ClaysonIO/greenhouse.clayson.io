import React from "react";
import {Header} from "./Header";
import {observer} from "mobx-react-lite";
import {appState} from "../App";
import {Loading} from "./Loading";

export const Layout = observer(({children}: any)=>{
    return (
        <React.Fragment>
            <Header/>
            <main>
                {appState.ready ? children : <Loading/>}
            </main>
        </React.Fragment>
    )
});