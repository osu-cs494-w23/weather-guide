import { useEffect } from 'react';

const useScript = (url, url2, key) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);


        const script1 = document.createElement('script');

        script1.src = url2;
        script1.async = true;

        document.body.appendChild(script1);
        console.log(window.windyInit)

        let timer1 = setTimeout(() => {window.windyInit( {key:key}, function (){


        } )}, 1 * 1000);



        return () => {
            document.body.removeChild(script);
            document.body.removeChild(script1);
        }
    }, [url]);
};

export default useScript;