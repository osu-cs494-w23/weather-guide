import { useEffect, useState } from 'react';
import winds from '@faa-aviation-data-portal/winds-aloft';
import airports from './data/us_airports.json';

const useWinds = () => {
    const [windResponse, setWindResponse] = useState({});

    useEffect(() => {
        winds
            .FD1({
                location: 'US1',
            })
            .then(result => {
                const keys = Object.keys(result[0].parsedProductText.data);
                const locations = keys.map(key => airports.find(airport => airport.IATA === key));
                const winds = keys.map(key => result[0].parsedProductText.data[key]);

                const data = keys.reduce((acc, key, i) => {
                    if (locations[i]) {
                        acc[locations[i].ICAO] = {
                            winds: winds[i],
                            location: locations[i]
                        };
                    }

                    return acc;
                }, {});

                setWindResponse(data)
            })
    }, []);

    return windResponse;
}

export default useWinds;
