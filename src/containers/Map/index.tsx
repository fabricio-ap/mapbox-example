import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { useSelector } from 'react-redux';
import blueMarker from '~/assets/images/marker-blue.png';
import redMarker from '~/assets/images/marker-red.png';
import MapService from '~/services/mapService';
import { RootState } from '~/stores';
import { buildSourceData } from '~/utils/helpers/mapHelpers';
import { Container, Popup, Wrapper } from './styles';

const PROPS_TO_HIDE = ['icon', 'latitude', 'longitude'];

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  const {
    filteredData,
    filter: { balance },
  } = useSelector((state: RootState) => state.data);

  const mapService = new MapService();
  const markers = [blueMarker, redMarker];

  useEffect(() => {
    if (mapContainer.current) mapService.setupMap(mapContainer.current);
  }, []);

  useEffect(() => {
    mapService.map.on('load', () => {
      createLayer();

      mapService.map.on('mouseenter', 'points_layer', (e: any) => {
        mapService.map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        const { properties } = e.features[0];
        const keys = Object.keys(properties).filter((key) => !PROPS_TO_HIDE.includes(key));

        mapService.popup
          .setLngLat(coordinates)
          .setHTML(
            renderToString(
              <Popup>
                {keys.map((key) => (
                  <p key={key}>{`${key}: ${properties[key]}`}</p>
                ))}
              </Popup>,
            ),
          )
          .addTo(mapService.map);
      });

      mapService.map.on('mouseleave', 'points_layer', () => {
        mapService.map.getCanvas().style.cursor = '';
        mapService.popup.remove();
      });
    });
  }, []);

  useEffect(() => {
    if (mapService.isMapReady()) {
      createLayer();
    }
  }, [filteredData, balance]);

  const createLayer = () => {
    const id = 'points';
    const sourceData = buildSourceData('points', balance, filteredData);

    const layer = mapService.getLayer(id);
    if (layer) mapService.removeLayer(id);

    const source = mapService.getSource(id);
    if (source) mapService.removeSource(id);

    markers.forEach((marker: any, index) => {
      const markerId = `${id}_marker_${index}`;
      const hasMarker = mapService.getMarker(markerId);

      if (!hasMarker) mapService.addMarker(markerId, marker);
    });

    mapService.addSource('points', sourceData);
    mapService.addLayer('points');
  };

  return (
    <Wrapper>
      <Container ref={mapContainer} />
    </Wrapper>
  );
}

export default Map;
