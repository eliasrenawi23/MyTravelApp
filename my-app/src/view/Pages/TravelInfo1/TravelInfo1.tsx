import './TravelInfo1.scss';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { useAppDispatch} from '../../../app/hooks';
import { useEffect, useState } from 'react';
import InputComp from '../../components/InputComp/InputComp';
import SingupF from '../../components/LoginF/LoginF';
import { updatetimeandinputs } from '../../../app/reducer/OneTravelReduser';



interface list {
    propsname: string;
    listname: string
}

const TravelInfo1 = () => {
    const TravelPList: Array<list> = [{ propsname: "leisure", listname: "travelPurpos" }, { propsname: "business", listname: "travelPurpos" }, { propsname: "roadTrip", listname: "travelPurpos" }, { propsname: "family", listname: "travelPurpos" }, { propsname: "study", listname: "travelPurpos" }, { propsname: "grieving", listname: "travelPurpos" }];
    const LuggagePList: Array<list> = [{ propsname: "trolly", listname: "Luggage" }, { propsname: "suitcase", listname: "Luggage" }, { propsname: "briefcase", listname: "Luggage" }, { propsname: "backpack", listname: "Luggage" }, { propsname: "handbag", listname: "Luggage" }, { propsname: "multy", listname: "Luggage" }];

    const [Destination, setDestination] = useState("");
    const [peopleNumber, setpeopleNumber] = useState(0);
    const [DateOfStart, setDateOfStart] = useState(new Date());
    const [DateOfEnd, setDateOfEnd] = useState(new Date());


    const nav = useNavigate();
    const { state }: any = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(changeNavText("Fill travel info"));


    }, [dispatch]);

    function handleCalender(e: any) {
        if (!DateOfStart || !DateOfEnd) {
            setDateOfStart(e.target.changedArgs.value);
            setDateOfEnd(e.target.changedArgs.value);
        }
        else {
            if (DateOfStart.getFullYear() > e.target.changedArgs.value.getFullYear()) {
                setDateOfStart(e.target.changedArgs.value);
            }
            else if (DateOfEnd.getFullYear() < e.target.changedArgs.value.getFullYear()) {
                setDateOfEnd(e.target.changedArgs.value);
            }
            else { ///DateOfStart.getFullYear == e.target.changedArgs.valu.getFullYear
                if (DateOfStart.getMonth() > e.target.changedArgs.value.getMonth()) {
                    setDateOfStart(e.target.changedArgs.value);
                }
                else if (DateOfEnd.getMonth() < e.target.changedArgs.value.getMonth()) {
                    setDateOfEnd(e.target.changedArgs.value);
                }
                else {//DateOfStart.getMonth > e.target.changedArgs.valu.getMonth
                    if (DateOfStart.getDate() > e.target.changedArgs.value.getDate()) {
                        setDateOfStart(e.target.changedArgs.value);
                    }
                    else if (DateOfEnd.getDate() < e.target.changedArgs.value.getDate()) {
                        setDateOfEnd(e.target.changedArgs.value);
                    }
                }
            }
        }
    }

    function clickProceed(e: any) {

        dispatch(updatetimeandinputs({
            travelDateFrom: DateOfStart.toDateString(),
            travelDateTo: DateOfEnd.toDateString(),
            travelDest: Destination,
            numberOfPeople: peopleNumber
        }));

   


        nav('/TravelInfo2', {
            state: state
        });
    }
    const startRange: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);


    return (
        <div className="wrapperinfo1">

            <form action="" className="TarvelInfo1Form">
                <SingupF />
                <div className=" text whereHeader">Where</div>
                <input type="text" placeholder='Type here' className='whereInput' onChange={(e: any) => setDestination(e.target.value)} />
                <div className="text whenHeader">When</div>
                <CalendarComponent id="calendar" isMultiSelection={true} min={startRange} onChange={handleCalender}></CalendarComponent>
                <div className=" text HowMany">Whow many People</div>
                <input type="text" placeholder='Type here' className='HowManyInput' onChange={(e: any) => setpeopleNumber(e.target.value)} />
                <div className=" text TravelP">Travel Purpose</div>
                <div className="grid-container">

                    {TravelPList.map((element, index) => {
                        return (
                            <InputComp key={index} propsname={element.propsname} listname={element.listname} />
                        );
                    })
                    }

                </div>
                <div className="text ChooseL">Choose Luggage</div>
                <div className="grid-container">
                    {LuggagePList.map((element, index) => {
                        return (
                            <InputComp key={index} propsname={element.propsname} listname={element.listname} />
                        );
                    })
                    }
                </div>
                <button className='Proceedbtn' onClick={clickProceed}>Proceed</button>
            </form>

        </div>
    )
}
export default TravelInfo1;


