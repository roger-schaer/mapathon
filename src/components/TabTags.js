import React from 'react';
import { Table } from 'reactstrap';
import './TabTags.css';
import {Link} from "react-router-dom";

const TabTags = (props) => {
    let tags = props.tags;
    //returns a table with all tags and their infos. the id is clickable to get the infos
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
                            <th scope="row"><Link to={'/manage/tag/' + tag.id}>{tag.id}</Link></th>
                            <td>{tag.name}</td>
                            <td><img
                                src={tag.image}
                                style={{maxWidth: '100%', maxHeight: '5vh'}}
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