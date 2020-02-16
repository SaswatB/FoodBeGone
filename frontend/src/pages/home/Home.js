import React, { useEffect, useState } from "react";
import tt from '@tomtom-international/web-sdk-maps';
import tts from '@tomtom-international/web-sdk-services';
import "./Home.css"

const DEFAULT_MAP_ZOOM = 14;

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            document.write("Geolocation is not supported by this browser.");
        }
    });
  }

export function Home() {
    const [map, setMap] = useState();
    const [userLocation, setUserLocation] = useState();
    const [locations, setLocations] = useState([
        {name: "Southside Spirit House", lat: 37.7872183, lng: -122.3968268},
        {name: "Red Dog", lat: 37.7855169, lng: -122.3954392},
    ]);

    // clear the selected location if a click occurs outside the popup
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedLocationItems, setSelectedLocationItems] = useState();
    useEffect(() => {
        const clearSelectedLocation = () => { if(selectedLocation) setSelectedLocation(); };
        window.addEventListener('mousedown', clearSelectedLocation);
        return () => window.removeEventListener('mousedown', clearSelectedLocation)
    })

    useEffect(() => {
        (async () => {
            // load user location
            const userCoordinates = (await getLocation().catch((m) => console.error('get location error', m))).coords;
            const userLngLat = [userCoordinates.longitude, userCoordinates.latitude];
            setUserLocation(userLngLat);

            // load tomtom map
            const loadedMap = await tt.map({
                key: process.env.REACT_APP_TOM_TOM_API_KEY,
                style: 'tomtom://vector/1/basic-main',
                container: 'map',
                center: userLngLat,
                zoom: DEFAULT_MAP_ZOOM,
            });

            // display the reachable range
            loadedMap.on('load', async () => {
                const reachableRange = await tts.services.calculateReachableRange({
                    key: process.env.REACT_APP_TOM_TOM_API_KEY,
                    origin: userLngLat,
                    travelMode: 'car',
                    timeBudgetInSec: 300,
                }).go()
                loadedMap.addLayer({
                    id: 'overlay',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: reachableRange.toGeoJson()
                    },
                    layout: {},
                    paint: {
                        'fill-color': '#03a9f4',
                        'fill-opacity': 0.1,
                        'fill-outline-color': 'black'
                    }
                });
            });

            // add user location market
            const element = document.createElement('div');
            element.className = 'marker-user-location';
            new tt.Marker({element}).setLngLat(userLngLat).addTo(loadedMap);

            // todo api call
            setMap(loadedMap);
        })();
    }, []);

    useEffect(() => {
        if (map && locations) {
            // add a marker for each location
            locations.forEach((location) => {
                const element = document.createElement('div');
                element.className = 'marker-supplier-location';
                // show popup on marker click
                element.addEventListener('click', (event) => {
                    // use timeout to avoid conflict with window event listener above
                    setTimeout(() => {
                        setSelectedLocation({
                            x: event.pageX - 75,
                            y: event.pageY - 150,
                            location,
                        });
                        // clear location item count
                        setSelectedLocationItems(undefined);
                        // todo api call to get item count
                        setSelectedLocationItems([]);
                    }, 10);
                })
                new tt.Marker({element}).setLngLat([location.lng, location.lat]).addTo(map);
            })
        }
    }, [map, locations]);

    const showMyLocation = async () => {
        if (map && userLocation) {
            // zoom to user location
            map.easeTo({
                center: userLocation,
                zoom: DEFAULT_MAP_ZOOM,
            });
        };
    };

    return (
        <>
            {selectedLocation && <div className="location-popup" style={{top: selectedLocation.y, left: selectedLocation.x}} onMouseDown={(event) => event.stopPropagation()}>
                <h6>{selectedLocation.location.name}</h6>
                {selectedLocationItems !== undefined && <>{selectedLocationItems.length} items available</>}
            </div>}
            <div id="map" style={{height: "100%"}}/>
            <div className="my-location-control" onClick={showMyLocation}></div>
        </>
    );
}
