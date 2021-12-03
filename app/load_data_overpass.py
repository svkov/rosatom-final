import pandas as pd
from math import radians, cos, sin, asin, sqrt
import overpy

api = overpy.Overpass()


def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    # Radius of earth in kilometers is 6371
    km = 6371 * c
    return km


def find_nearest_objects_df(lat, lon):
    bbox1_lat = lat + 1
    bbox1_lon = lon + 1
    bbox2_lat = lat - 1
    bbox2_lon = lon - 1
    radius = 200
    filter_around = f'(around:{radius}, {bbox1_lat}, {bbox1_lon}, {bbox2_lat}, {bbox2_lon})'
    # fetch all ways and nodes
    result = api.query(f"""
    [out:json][timeout:25];
    (
      way["water"]{filter_around};
      way["waterway"="river"]{filter_around};
      // query part for: “natural=coastline”
      node["natural"="coastline"]{filter_around};
    );
    out center;
    >;
    out skel qt;""")
    distances = []
    names = []
    for way in result.ways:
        distance = haversine(lon, lat, way.center_lon, way.center_lat)
        distances.append(distance)
        # Тут можно достать что это за объект
        names.append(way.tags.get('name'))
    df = pd.DataFrame({'dist': distances, 'name': names})
    return df.sort_values('dist')
