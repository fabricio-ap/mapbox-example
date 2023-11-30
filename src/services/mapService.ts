import maplibregl from 'maplibre-gl';
import { tokens } from '~/theme/tokens';
import { buildSourceGeojson } from '~/utils/helpers/mapHelpers';

const API_KEY = 'nny032iKN6rA7I0BqENm';

class MapService {
  static instance: MapService;

  map: any;
  popup: any;

  constructor() {
    if (MapService.instance) {
      return MapService.instance;
    }

    MapService.instance = this;

    this.map = null;
    this.popup = null;
  }

  setupMap(container: HTMLDivElement) {
    this.map = new maplibregl.Map({
      container,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [-52, -14],
      minZoom: 4,
      maxBounds: [
        [-98.713192, -59.492965],
        [-13.110722, 19.50321],
      ],
    });

    this.map.addControl(new maplibregl.NavigationControl());

    this.popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
  }

  isMapReady() {
    return this.map.loaded();
  }

  addLayer(id: string) {
    this.map.addLayer({
      id: `${id}_cluster`,
      type: 'circle',
      source: `${id}_source`,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': tokens.light.primary,
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      },
    });

    this.map.addLayer({
      id: `${id}_cluster_count`,
      type: 'symbol',
      source: `${id}_source`,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
      paint: {
        'text-color': tokens.light.onPrimary,
      },
    });

    this.map.addLayer({
      id: `${id}_layer`,
      type: 'symbol',
      source: `${id}_source`,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': ['get', 'icon'],
      },
    });
  }

  getLayer(id: string) {
    return this.map.getLayer(`${id}_layer`);
  }

  removeLayer(id: string) {
    this.map.removeLayer(`${id}_cluster`);
    this.map.removeLayer(`${id}_cluster_count`);
    this.map.removeLayer(`${id}_layer`);
  }

  addSource(id: string, data: { [key: string]: string | number }[]) {
    this.map.addSource(`${id}_source`, buildSourceGeojson('Point', data));
  }

  getSource(id: string) {
    return this.map.getSource(`${id}_source`);
  }

  removeSource(id: string) {
    this.map.removeSource(`${id}_source`);
  }

  addMarker(id: string, image: any[]) {
    this.map.loadImage(image, (error: any, image: any) => {
      if (error) throw error;
      this.map.addImage(id, image);
    });
  }

  getMarker(id: string) {
    return this.map.hasImage(id);
  }

  removeMarker(id: string) {
    this.map.removeImage(id);
  }
}

export default MapService;
