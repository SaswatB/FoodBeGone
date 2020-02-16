import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tt from '@tomtom-international/web-sdk-maps';
import tts from '@tomtom-international/web-sdk-services';
import { useUser } from '../../utils/useUser'
import "./Map.css"

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

export function Map() {
    const [userId, setUserId, userType] = useUser();
    const history = useHistory();

    if (userType === 'supplier') {
        history.push('/supplierhome');
    }

    const [map, setMap] = useState();
    const [userLocation, setUserLocation] = useState();
    const [locations, setLocations] = useState([
        {id: "4f43acf0-5df7-45c7-b759-6d42cacf6f2a", name: "Southside Spirit House", lat: 37.7872183, lng: -122.3968268},
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

            try {
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
                            'fill-color': '#80cbc4',
                            'fill-opacity': 0.3,
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
            } catch(e) {console.error(e);}
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

    const [menuVisible, setMenuVisible] = useState(false);
    const showMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            {selectedLocation && <div className="location-popup" style={{top: selectedLocation.y, left: selectedLocation.x}} onMouseDown={(event) => event.stopPropagation()}>
                <h6>{selectedLocation.location.name}</h6>
                {selectedLocationItems !== undefined && <>{selectedLocationItems.length} items available</>} <br/>
                <Link to={`/items/${selectedLocation.location.id}`}>View Items</Link>
            </div>}
            <div id="map" style={{height: "100%"}}/>
            <div className="my-location-control" onClick={showMyLocation}></div>
            <div className="options-control" onClick={showMenu}></div>
            {menuVisible && <div className="map-menu">
                <Link className="map-menu-item" to="/transactions">Transaction History</Link>
            </div>}
        </>
    );
}
