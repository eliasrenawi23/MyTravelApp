import { useAppDispatch } from '../../../app/hooks';
import { updatelistInputcomp } from '../../../app/reducer/OneTravelReduser';
import './InputComp.scss';

interface list {
    propsname: string;
    listname: string;

}
const InputComp = (props: list) => {
    const dispatch = useAppDispatch();

    const handlechange = (e: any) => {
        dispatch(updatelistInputcomp({ ListTochange: listname, ValueToAddDel: propsname }));
    }
    const { propsname, listname } = props;
    return (
        <div className="InputComplabelDiv">
            <input id={propsname} type="checkbox" value={propsname} onClick={handlechange} />
            <label className={"InputComplabel " + propsname} htmlFor={propsname}></label>
        </div>

    );

}

export default InputComp