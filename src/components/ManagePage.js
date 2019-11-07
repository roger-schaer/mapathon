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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ManagePage = (props) => {

    let { loginWithRedirect, getTokenSilently } = useAuth0();
    let [categories, setCategories] = useState([]);
    let [tags, setTags] = useState([]);

    //Filtering
    let usr = useAuth0();
    let [filterusr, setFilterUsr] = useState(false);
    let [groupnr, setGroupnr] = useState(3);
    let categoriesnew = categories;
    let tagsnew = tags;

    //Attribute Dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState("All");
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);


    useEffect(() => {
        fetchCategoriesAndTags();
    }, []);

    //Change the value of the dropdown
    let changeValue = e => {
        setDropDownValue(e.currentTarget.textContent)
        if(e.currentTarget.textContent == "All"){
            setGroupnr(10)
        } else {
            setGroupnr(e.currentTarget.textContent.substr(6,1))
        }
    }


    let handleFilterUser = e => {
        setFilterUsr(!filterusr);
    };

    if(groupnr == 10 && filterusr){
        categoriesnew = categories.filter(categorie => categorie.Creator.name == [usr.user.name]);
        tagsnew = tags.filter(tag => tag.Creator.name == [usr.user.name]);
    } else if(groupnr == 10){
        tagsnew = tags;
        categoriesnew = categories;
    } else if(groupnr != 10 && filterusr){
        tagsnew = tags.filter(tag => tag.Creator.name == [usr.user.name]) && tags.filter(tag => tag.group == [groupnr]);
        categoriesnew = categories.filter(categorie => categorie.Creator.name == [usr.user.name]) && categories.filter(categorie => categorie.group == [groupnr]);
    } else if (groupnr != 10 ){
        categoriesnew = categories.filter(categorie => categorie.group == [groupnr]);
        tagsnew = tags.filter(tag => tag.group == [groupnr]);
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
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                        {dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <div onClick={changeValue}>All</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={changeValue}>Group 1</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={changeValue}>Group 2</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={changeValue}>Group 3</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div onClick={changeValue}>Group 4</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <label htmlFor="normal-switch">
                    POI's of the user &ensp;
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