import React from 'react';
import { Table } from 'reactstrap';

const TabCategories = (props) => {
    let categories = props.categories;
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
                            <th scope="row"><a href={'/manage/category/' + category.id}>{category.id}</a></th>
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