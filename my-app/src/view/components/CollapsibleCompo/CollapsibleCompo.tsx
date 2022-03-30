import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import ItemInList from '../ItemInList/ItemInList';
import './CollapsibleCompo.scss';

interface category {
    CategoryName: string;
    listincat: Array<item>;
  }
  
  interface item {
    name: string;
    quantity: number;
  }
const CollapsibleCompo = (props: category) => {    
    const { CategoryName, listincat } = props;
    const [isExpanded, setExpanded] = useState(false);
    var catname:string;
    (CategoryName==="⊕ Add new Category")?catname="⊕ Add new Category":catname='▲' + CategoryName;      
    const [catTitle, setEcatTitle] = useState(catname);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
    
    function handleOnClick() {
        setExpanded(!isExpanded);
        if (isExpanded) {
            setEcatTitle('▲' + CategoryName);
        }
        else {
            setEcatTitle('▼' + CategoryName);
        }
        if(CategoryName==="⊕ Add new Category")           
        setEcatTitle("⊕ Add new Category");
    }
    return (
        <div className="collapsibleCompWorapper">
            <div className="collapsibleCompheader" {...getToggleProps({ onClick: handleOnClick })}>
                {catTitle}
            </div>
            <div {...getCollapseProps()}>
                <div className="collapsibleContent">
                    {listincat.map((element, index) => {
                        return (
                            <ItemInList key={index} name={element.name} quantity={element.quantity} />

                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default CollapsibleCompo