import { useContext, useEffect } from "react";
import MapContext from "../Map/hook/MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ name, source, style, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let vectorLayer = new OLVectorLayer({
			name,
			source,
			style
		});

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map]);

	return null;
};

export default VectorLayer;