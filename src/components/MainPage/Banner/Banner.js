import React, {useState, useEffect, useCallback} from 'react';
import classes from "./Banner.module.scss"




const Banner = () =>{

    const [coords, setCoords] = useState({x: 0, y: 0});
    const [bindFunction, setBindFunction] = useState(0)

        const handleWindowMouseMove = useCallback((event) => {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            });


        }, [])




    let marginBackgroundLeft = - window.innerWidth*0.06 + coords.x/50
    let marginBackgroundTop = -window.innerHeight*0.7 + coords.y/40

    let marginLeft =  0.4*window.innerWidth + coords.x/15

    let marginTop =  -0.7*window.innerHeight -66 + (coords.y-66)/8



    if (marginTop > 0.6*window.innerHeight){
        marginTop = 200
    }

    return(
        <div onMouseEnter={() => {



            if (bindFunction === 0) {
                window.addEventListener('mousemove', handleWindowMouseMove)
                console.log("enter")
                setBindFunction(1)
            }
            }}
             onMouseLeave={()=>{
                 setBindFunction(0)
                 console.log("leave")
                 window.removeEventListener(
            'mousemove',
                    handleWindowMouseMove,
                 );
             }}
             className={classes.bannerWrapper}>
            <div className={classes.darkener}></div>
            <div className={classes.bannerText}>
                <div className={classes.title}>Weather Guide</div>
                <div className={classes.line}></div>
                <div className={classes.description}>
                    Land, Sea or Air,
                </div>
                <div className={classes.subDescription}>
                    We’ll Help You Get There
                </div>
            </div>
            <img style={{marginLeft: marginBackgroundLeft, marginTop: marginBackgroundTop}} className={classes.bannerImage} src={process.env.PUBLIC_URL + '/clouds.jpg'}/>
            <img style={{marginLeft: marginLeft, marginTop: marginTop}} className={classes.planeImage} src={process.env.PUBLIC_URL + '/plane.png'}/>

        </div>

    )
}

export default Banner