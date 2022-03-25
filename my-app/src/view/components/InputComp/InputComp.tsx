import './InputComp.scss';

interface list {
    propsname: string;

}
const InputComp = (props: list) => {
    const { propsname } = props;
    return (
        <div>
            <input id={propsname} type="checkbox" />
            <label className={"InputComplabel "+propsname} htmlFor={propsname}></label>
        </div>

    );
}

export default InputComp