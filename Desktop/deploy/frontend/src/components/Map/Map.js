import React, { useRef, useState, useEffect, useCallback, useContext } from "react"
import "./Map.css";
import MapContext from "./hook/MapContext";
import * as ol from "ol";
import { Popup } from "./Popup";
import { Button, message } from 'antd';
import HomePageContext from "../../containers/hook/HomepageContext";
import { SendScoreModal } from "../SendScoreModal";

const Map = ({ children, zoom, center, setCenter, user, setloading1 }) => {
	const mapRef = useRef();
	const [ map, setMap ] = useState(null);
	const [ spotInfo, setSpotInfo ] = useState(["", "", "", 0]);
	const [ initPlace, setInitPlace ] = useState("臺鐵臺北車站");
	const [ open, setOpen ] = useState(false); //Does modal open
	const { showSteps, setAllFeactures, setDisplayMap } = useContext(HomePageContext);
	
	const handleRouterButton = () => {
		if (showSteps === true) {
			// setAllFeactures(false);
			setDisplayMap(false);
		} else {
			setOpen(true);
		}
	};

	// on component mount
	useEffect(() => {
		let options = { 
			view: new ol.View({ zoom, center, minZoom: 12 }),
			layers: [],
			controls: [],
			overlays: [],
		};
		
		let mapObject = new ol.Map(options);

		let popupObject = new ol.Overlay({
			element: document.getElementById("popup"),
			positioning: 'center-left',
			offset: [30, 0],
		}); 

		mapObject.setTarget(mapRef.current);
		setMap(mapObject);
		mapObject.addOverlay(popupObject);
		mapObject.on('click', (evt) => handleSingleClick(mapObject, popupObject,  evt));
		document.getElementById("popup_close").onclick = () => popupObject.setPosition(undefined);
		
		return () => {
			mapObject.setTarget(undefined);
		}
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center);
	}, [center])

	// show popup
	const handleSingleClick = useCallback((mapObject, popupObject, evt) => {
        const { coordinate, pixel } = evt;
		
        const feature = mapObject.forEachFeatureAtPixel(pixel, (feature) => {
            return feature;
        }, {
			layerFilter: (layer) => {
				return (layer.get('name') === 'spot' || layer.get('name') === 'steps_point') ;
			}
		});

        if (!feature) {
			popupObject.setPosition(undefined);
			return;
		}
		popupObject.setPosition(coordinate);
		//console.log("coordinate:", toLonLat(coordinate, 'EPSG:3857'));
		//setCenter(toLonLat(coordinate, 'EPSG:3857'));
		setSpotInfo([feature.getProperties()["Name"], feature.getProperties()["Town"], feature.getProperties()["Picture1"], feature.getProperties()?.step]);
    }, []);

	// dispaly message
	const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 1.5 };
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
            }
        }
    };

	return (
		<MapContext.Provider value={{ 
			map,
			displayStatus
		}}>
			<div ref={mapRef} className="map" >
				{children}
				<Button 
					type="primary" 
					id="score"
					className="toggle_map_btn"
					shape="round" 
					size='large'
					onClick={()=> handleRouterButton()}
				>
					{(showSteps === true) ? "行程列表" : "規劃行程"}
					{/*<MdSchedule />*/}
				</Button>
				<Popup title={spotInfo[0]} description={spotInfo[1]} image={spotInfo[2]} initPlace={initPlace} setInitPlace={setInitPlace} user={user} step={spotInfo[3]}/>
				<SendScoreModal open={open} setCenter={setCenter} setOpen={setOpen} initPlace={initPlace} user={user} setloading1={setloading1}/>
			</div>
		</MapContext.Provider>
	)
}

export default Map;