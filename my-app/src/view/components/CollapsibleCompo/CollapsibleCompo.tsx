import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import ItemInList from '../ItemInList/ItemInList';
import './CollapsibleCompo.scss';

interface list {
    catInlListName: string;
    incatList: Array<item>;

}
interface item {
    name: string;
    quantity: number;

}
const CollapsibleCompo = (props: list) => {
    const { catInlListName, incatList } = props;
    const [isExpanded, setExpanded] = useState(false);
    const [catTitle, setEcatTitle] = useState('▲' + catInlListName);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
    function handleOnClick() {
        setExpanded(!isExpanded);
        if (isExpanded) {
            setEcatTitle('▲' + catInlListName);
        }
        else {
            setEcatTitle('▼' + catInlListName);
        }
    }
    return (
        <div className="collapsibleCompWorapper">
            <div className="collapsibleCompheader" {...getToggleProps({ onClick: handleOnClick })}>
                {catTitle}
            </div>
            <div {...getCollapseProps()}>
                <div className="collapsibleContent">
                    {incatList.map((element, index) => {
                        return (
                            <ItemInList key={index} name={element.name} quantity={element.quantity} />

                        )
                    })}
                </div>
            </div>
        </div>

    )
    // <div> <button
    //     {...getToggleProps({
    //         onClick: () => setExpanded((prevExpanded) => !prevExpanded),
    //     })}
    // >
    //     {isExpanded ? 'Collapse' : 'Expand'}
    // </button>

    //     <section {...getCollapseProps()}>Collapsed content 🙈</section>
    // </div>
}

export default CollapsibleCompo