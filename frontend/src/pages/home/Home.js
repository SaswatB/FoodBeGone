import React, { useEffect } from "react";
import tt from '@tomtom-international/web-sdk-maps';

export function Home() {
    useEffect(() => {
        const map = tt.map({
            key: process.env.REACT_APP_TOM_TOM_API_KEY,
            style: 'tomtom://vector/1/basic-main',
            container: 'map'
        });
        
    }, [])
    return <div id="map" style={{height: "100vh"}}/>;
}