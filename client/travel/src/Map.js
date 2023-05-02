import * as React from 'react';
import {ReactBingmaps} from 'react-bingmaps';

function Map(props) {
     
    // const apiKey = process.env.REACT_APP_BING_MAPS_KEY
    return (
        <ReactBingmaps
            bingmapKey= "Al1igEKkw9s5t0aqwfTuovo8ftFvVWHdq6PjI_sLrjNtG6J4ZKuK-9lcxf0L-QQQ"
            center={[47.6097, -122.3331]}
            zoom={12}
            mapTypeId={"road"}
        />
    )

};

export default Map;