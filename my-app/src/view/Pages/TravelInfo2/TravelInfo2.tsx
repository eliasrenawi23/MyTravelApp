
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import InputComp from '../../components/InputComp/InputComp';
import SingupF from '../../components/LoginF/LoginF';



import './TravelInfo2.scss';

interface list {
  propsname: string;
  listname: string;

}
const TravelInfo2 = () => {

  const TransportList: Array<list> = [{
    propsname: "Plane",
    listname: "Transport"
  }, {
    propsname: "Bus",
    listname: "Transport"
  }, {
    propsname: "Car",
    listname: "Transport"
  }, {
    propsname: "Ship",
    listname: "Transport"
  }, {
    propsname: "Metro",
    listname: "Transport"
  }, {
    propsname: "Taxi",
    listname: "Transport"
  }];
  const ActivityList: Array<list> = [{
    propsname: "Glof",
    listname: "Activity"
  }, {
    propsname: "Club",
    listname: "Activity"
  }, {
    propsname: "Photography",
    listname: "Activity"
  }, {
    propsname: "Swimming",
    listname: "Activity"
  }, {
    propsname: "Hiking",
    listname: "Activity"
  }, {
    propsname: "Biking",
    listname: "Activity"
  }];
  const AccommodationList: Array<list> = [{
    propsname: "Hotel",
    listname: "Accommodation"
  }, {
    propsname: "BNB",
    listname: "Accommodation"
  }, {
    propsname: "ShortTerm",
    listname: "Accommodation"
  }, {
    propsname: "Van",
    listname: "Accommodation"
  }, {
    propsname: "Tent",
    listname: "Accommodation"
  }, {
    propsname: "Sofa",
    listname: "Accommodation"
  }];
  const SpecialList: Array<list> = [{
    propsname: "Baby",
    listname: "Spiceal"
  }, {
    propsname: "Toddlers",
    listname: "Spiceal"
  }, {
    propsname: "Pets",
    listname: "Spiceal"
  }, {
    propsname: "Med",
    listname: "Spiceal"
  }, {
    propsname: "Merchandise",
    listname: "Spiceal"
  }, {
    propsname: "Valuable",
    listname: "Spiceal"
  }];

  const nav = useNavigate();
  const { state }: any = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeNavText("Choose Categories"));
  }, [dispatch]);

  function onSubmit(e: any) {
    nav('/ViewList', {
      state: state
    });
  }

  return (
    <div className="wrapperinfo2">
      <form action="" className="TarvelInfo1Form">
        <SingupF />


        <div className="catg box1">
          <div className=" text Transport">Transport</div>
          <div className="grid-container">
            {TransportList.map((element, index) => {
              return (
                <InputComp key={index} propsname={element.propsname} listname={element.listname}/>
                );
            })
            }
          </div>
        </div>
        <div className="catg box2">
          <div className=" text Activity">Activity</div>
          <div className="grid-container">
            {ActivityList.map((element, index) => {
              return (
                <InputComp key={index} propsname={element.propsname} listname={element.listname}/>
                );
            })
            }

          </div>
        </div>
        <div className="catg box3">
          <div className=" text Accommodation">Accommodation</div>
          <div className="grid-container">
            {AccommodationList.map((element, index) => {
              return (
                <InputComp key={index} propsname={element.propsname} listname={element.listname}/>
                );
            })
            }

          </div>
        </div>
        <div className="catg box4">
          <div className=" text Special">Special Care</div>
          <div className="grid-container">
            {SpecialList.map((element, index) => {
              return (
                <InputComp key={index} propsname={element.propsname} listname={element.listname}/>
                );
            })
            }


          </div>
        </div>
        <button className='Proceedbtn' onClick={onSubmit} >Submit</button>

      </form>


    </div>
  )

}

export default TravelInfo2;