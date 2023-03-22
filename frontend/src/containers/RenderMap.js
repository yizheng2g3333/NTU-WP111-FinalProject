import React, { useState, useContext } from "react";
import Map from "../components/Map";
import { Loading } from "../components/Loading";
import { Layers, VectorLayer, MapBoxLayer } from "../components/layers";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Geolocation from 'ol/Geolocation.js';
import { vector } from "../components/Source";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { useQuery } from '@apollo/client';
import { QUERY } from "../graphql/query";
import HomePageContext from "./hook/HomepageContext";
import { Icon, Circle as CircleStyle, Style, Fill, Stroke } from "ol/style";
//import mapConfig from "./config.json";

import localimage from "./../data/images/pin.svg";


const RenderMap = (user) => {
    const [center, setCenter] = useState([121.549326, 25.043630]);
    const [zoom, setZoom] = useState(14);
    const { loading, error, data } = useQuery(QUERY);
    const { stepsAndGeoJSON, showSteps, showAllFeactures } = useContext(HomePageContext);
    const [loading1, setloading1] = useState(false)

    // loading and error controller 
    if (loading) return <Loading />;
    if (error) {
        console.error(error);
        return (<p>Error :(</p>);
    }

    // loading all spot features geojson
    var AllSpotObject = {
        "type": "FeatureCollection",
        "name": "taipei_spot",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } }
    };
    AllSpotObject["features"] = data.spot.map(row => {
        return {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [parseFloat(row.Px), parseFloat(row.Py)]
            },
            "properties": row
        }
    });

    if ( stepsAndGeoJSON[0] !== [] ) {
        var StepsSpotObject = {
            "type": "FeatureCollection",
            "name": "taipei_spot",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } }
        };
        StepsSpotObject["features"] = stepsAndGeoJSON[0].map((row, index) => {
            row["step"] = index;
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [parseFloat(row.Px), parseFloat(row.Py)]
                },
                "properties": row
            }
        });
    }
    

    // Geolocation
    const geolocation = new Geolocation({
        tracking: true,
        projection: "EPSG: 4326"
    });
    const positionFeature = new Feature();
    geolocation.on('change:position', () => {
        const coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new Point(fromLonLat(coordinates, "EPSG:3857")) : null);
    });

    // console.log(StepsSpotObject);
    // render map
    return (
        loading1 ? <Loading />
        :
        <Map center={fromLonLat(center)} zoom={zoom} setCenter={setCenter} user={user} setloading1={setloading1}>
            <Layers>
                {/*<TileLayer source={osm()} zIndex={-1} name={"basemap_osm"} />*/}
                <MapBoxLayer name={"basemap_mapbox"} zIndex={0} />
                <VectorLayer
                    name={"userlocation"}
                    source={vector({
                        features: [positionFeature]
                    })}
                    style={
                        new Style({
                            image: new CircleStyle({
                                radius: 100,
                                fill: new Fill({
                                    color: 'rgba(22, 22, 22, 0.3)',
                                }),
                                stroke: new Stroke({
                                    color: '#626262',
                                    width: 5,
                                }),
                            }),
                        })
                    }
                />
                {showAllFeactures && (
                    <VectorLayer
                        name={'spot'}
                        source={vector({
                            features: new GeoJSON().readFeatures(AllSpotObject, { featureProjection: 'EPSG:3857' }),
                        })}
                        style={
                            new Style({
                                image: new Icon({
                                    anchor: [18, 36],
                                    anchorXUnits: 'pixels',
                                    anchorYUnits: 'pixels',
                                    crossOrigin: 'anonymous',
                                    src: localimage,
                                }),
                            })
                        }
                    />
                )}
                {showSteps && (
                   <VectorLayer
                        name={'steps_line'}
                        source={vector({
                            features: new GeoJSON().readFeatures(stepsAndGeoJSON[1], { featureProjection: 'EPSG:3857' }),
                        })}
                        style={
                            new Style({
                                stroke: new Stroke({
                                    color: 'rgba(231, 144, 179, 0.8)',
                                    width: 8,
                                }),                              
                            })
                        }
                    /> 
                )}
                {showSteps && (
                   <VectorLayer
                        name={'steps_point'}
                        source={vector({
                            features: new GeoJSON().readFeatures(StepsSpotObject, { featureProjection: 'EPSG:3857' }),
                        })}
                        style={
                            new Style({
                                image: new Icon({
                                    anchor: [18, 36],
                                    anchorXUnits: 'pixels',
                                    anchorYUnits: 'pixels',
                                    crossOrigin: 'anonymous',
                                    src: localimage,
                                }),
                            })
                        }
                    /> 
                )}
            </Layers>
        </Map>
    );
};

export { RenderMap }
