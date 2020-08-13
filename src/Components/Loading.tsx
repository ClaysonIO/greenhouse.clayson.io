import React from 'react';

export const Loading = (()=>{
    return (<div style={{width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '50vh'}}>
        <div className="lds-ripple"><div/><div/></div>
    </div>)
})