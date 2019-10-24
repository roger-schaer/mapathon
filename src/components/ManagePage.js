import React, {useState, useEffect} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames'; //useful for reactstrap tab
import TabCategories from "./TabCategories";
import TabTags from "./TabTags";
import './Managepage.css';
import request from "../utils/request";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";
import addLogo from "../assets/add-sign.png";

const ManagePage = (props) => {

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);

    useEffect(() => {
        fetchCategoriesAndTags();
    }, []);

    // get all the POI informations
    let fetchCategoriesAndTags = async () => {

        let responseCat = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (responseCat && responseCat.length > 0) {
            console.log(responseCat);
            setCategories(responseCat);
        }
        let responseTag = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.tags}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (responseTag && responseTag.length > 0) {
            console.log(responseTag);
            setTags(responseTag);
        }
        return;
    }

    //reactstrap part
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return(
        <div className='div-manage'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Categories
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Tags
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className='div-tab'>
                <TabPane tabId="1">
                    <div >
                        <h4 style={{display: "inline-block"}}>Categories</h4><span> </span>
                        <a href="/manage/category/"><button><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button></a>
                        <TabCategories categories={categories}/>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className='div-tab'>
                        <h4 style={{display: "inline-block"}}>Tags</h4><span> </span>
                        <a href="/manage/tag"><button><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button></a>
                        <TabTags tags={tags}/>
                    </div>
                </TabPane>
            </TabContent>
        </div>

    );
}
export default ManagePage;