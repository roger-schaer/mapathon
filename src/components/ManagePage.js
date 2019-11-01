import React, {useState, useEffect} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from 'classnames'; //useful for reactstrap tab
import Switch from "react-switch";
import TabCategories from "./TabCategories";
import TabTags from "./TabTags";
import './Managepage.css';
import request from "../utils/request";
import endpoints from "../endpoints";
import {useAuth0} from "../react-auth0-spa";
import addLogo from "../assets/add-sign.png";
import {Link} from "react-router-dom";

const ManagePage = (props) => {

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);

    //Filtering
    let usr = useAuth0();
    let [filtergroupe, setFilterGroupe] = useState(false);
    let [filterusr, setFilterUsr] = useState(false);
    let [groupnr, setGroupnr] = useState(3);
    let categoriesnew = categories;
    let tagsnew = tags;

    useEffect(() => {
        fetchCategoriesAndTags();
    }, []);

    let handleFilterGroupe = e => {
        setFilterGroupe(!filtergroupe);
    };

    let handleFilterUser = e => {
        setFilterUsr(!filterusr);
    };

    if (filtergroupe) {
        categoriesnew = categories.filter(categorie => categorie.group == [groupnr]);
        tagsnew = tags.filter(tag => tag.group == [groupnr]);
    }

    if (filterusr) {
        categoriesnew = categories.filter(categorie => categorie.Creator.name == [usr.user.name]);
        tagsnew = tags.filter(tag => tag.Creator.name == [usr.user.name]);
    }

    // get all the POI informations
    let fetchCategoriesAndTags = async () => {

        //category part
        let responseCat = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.categories}`,
            getTokenSilently,
            loginWithRedirect
        );

        if (responseCat && responseCat.length > 0) {
            console.log(responseCat);
            setCategories(responseCat);
        }

        //tags part
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
    };

    //reactstrap part
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    //returns the manage page with a Category tab and a tag tab.
    return(
        <div className='div-manage'>
            <div className="filter-div">
                <label htmlFor="normal-switch">
                    POI's of the group ({groupnr}): &ensp;
                    <Switch
                        onChange={handleFilterGroupe}
                        checked={filtergroupe}
                        id="normal-switch"
                    />
                </label>
                <br/>
                <label htmlFor="normal-switch">
                    POI's of the user: &ensp;
                    <Switch
                        onChange={handleFilterUser}
                        checked={filterusr}
                        id="normal-switch"
                    />
                </label>
            </div>
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
                        <Link to="/manage/category/"><button><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button></Link>
                        <TabCategories categories={categoriesnew}/>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className='div-tab'>
                        <h4 style={{display: "inline-block"}}>Tags</h4><span> </span>
                        <Link to="/manage/tag/"><button><img style={{maxWidth: '15px'}} src={addLogo}/> Add</button></Link>
                        <TabTags tags={tagsnew}/>
                    </div>
                </TabPane>
            </TabContent>
        </div>

    );
};
export default ManagePage;