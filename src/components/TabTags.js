import React from 'react';
import { Table } from 'reactstrap';
import './TabTags.css';

const TabTags = (props) => {
    let tags = props.tags;
    return (
        <Table>
            <thead>
            <tr key='0'>
                <th>#id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Color</th>
                <th>Creator Name</th>
            </tr>
            </thead>
            <tbody>
            {tags && tags.length > 0 && (
                <>
                    {tags.map(tag => (
                        <tr key={tag.id}>
                            <th scope="row">{tag.id}</th>
                            <td>{tag.name}</td>
                            <td><img
                                src={tag.image}
                                style={{maxWidth: '100%', maxHeight: '10vh'}}
                            /></td>
                            <td><div className='div-color-tag' style={{backgroundColor: tag.color}}> </div></td>
                            <td>{tag.Creator.name}</td>
                        </tr>
                    ))}
                </>
            )}
            </tbody>
        </Table>
    );
}

export default TabTags;