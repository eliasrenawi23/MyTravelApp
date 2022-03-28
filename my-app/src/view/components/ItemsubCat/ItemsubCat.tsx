import React from 'react'

interface item {
    name: string;
    quantity: number;

}

const ItemsubCat = (props: item) => {
    const { name, quantity } = props;
    return (
        <div className="inputGroup">
            <input id={name} name={name} type="checkbox" />
            <label className="ItemListLabel" htmlFor={name} >
                <div className='namediv'>{name}</div>
                <div className='quantitydiv'>{quantity}</div>
            </label>
        </div>
    )
}

export default ItemsubCat