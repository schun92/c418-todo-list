import React from 'react';
import Item from './item';
import './list.css';

export default props => {
    const listElements = props.data.map((item, index) => {
        console.log('Item in list/index:', item);
        return <Item key={item._id} title={item.title} delete={() => props.delete(item._id)}/>
        // return <Item key={item._id} title={item.title} delete={props.delete.bind(this, item._id)}/>
    })

    return (
        <ul className="collection">
            {listElements}
        </ul>
    )
};
