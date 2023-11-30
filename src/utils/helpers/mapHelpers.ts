type Data = {
  [key: string]: string | number;
};

export const buildSourceGeojson = (type: string, data: Data[]) => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: data.map((item) => ({
      type: 'Feature',
      geometry: {
        type: type,
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        ...item,
      },
    })),
  },
  cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 50,
});

export const buildSourceData = (id: string, valueToFilter: number, data: Data[]) => {
  const iconName = `${id}_marker`;

  return data.map((item) => ({
    ...item,
    icon: (item.revenue as number) > valueToFilter ? `${iconName}_0` : `${iconName}_1`,
  }));
};
