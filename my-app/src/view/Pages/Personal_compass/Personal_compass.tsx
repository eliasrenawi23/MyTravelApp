import React from 'react'
import InputComp from '../../components/InputComp/InputComp';
import './Personal_compass.scss'
import '../TravelInfo2/TravelInfo2.scss';
import CompassItem from '../../components/CompassItem/CompassItem';

interface list {
    propsname: string;

}
const Personal_compass = () => {
    const ActivityList: Array<list> = [{ propsname: "Glof" }, { propsname: "Club" }, { propsname: "Photography" }, { propsname: "Swimming" }, { propsname: "Hiking" }, { propsname: "Biking" }];
    //const ActivityList: Array<list> = [];

    return (
        <div className='Personal_compassContainer'>
            <div className="see prog">See your progress state</div>
            {ActivityList.map((element, index) => {
                return (
                    <CompassItem key={index} propsname={element.propsname} state={'active '} />

                );
            })
            }
            <h5 className="messagewitharrow">You Are Here → </h5>

            {ActivityList.map((element, index) => {
                return (
                    <CompassItem key={index} propsname={element.propsname} state={'inactive '} />

                );
            })
            }

            <div className="messagewitharrow">Flight day →</div>

        </div>
    )
}

export default Personal_compass;