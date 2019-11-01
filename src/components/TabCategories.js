import React from 'react';
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";

const TabCategories = (props) => {
    let categories = props.categories;
    //Returns a table with all categories and all infos
    //The ID is clickable to get the details of the selected category
    return (
        <Table>
            <thead>
            <tr key='0'>
                <th>#id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Creator Name</th>
            </tr>
            </thead>
            <tbody>
            {categories && categories.length > 0 && (
                <>
                    {categories.map(category => (

                        <tr key={category.id}>
                            <th scope="row"><Link to={'/manage/category/' + category.id}>{category.id}</Link></th>
                            <td>{category.name}</td>
                            <td><img
                                src={category.image}
                                style={{maxWidth: '100%', maxHeight: '5vh'}}
                            /></td>
                            <td>{category.Creator.name}</td>
                        </tr>

                    ))}
                </>
            )}
            </tbody>
        </Table>
    );
}

export default TabCategories;