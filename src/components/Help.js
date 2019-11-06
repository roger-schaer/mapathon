import React from "react";
import "./Help.css";

export default class HelpPage extends React.Component{
  constructor(props){
    super(props);

  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render(){
    return(
      <div className="help-div">
        <div>
          <h1>Help page.</h1>
          <h3 className="help-text">Here you will find all the answers to your questions about using our web app.</h3>
        </div>

        <h2 className="subtitle"> General questions </h2>

        <table className="help-question">
          <tr>
            <th colspan="2">&nbsp;
              <h2> What is mapathon used for? </h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td><p className="help-text">Mapathon is a tool that allows you to save your points of interest and display them on the map.
              This way, you will observe their geographical location and will have access to their website and various data about them,
              which you will have entered in advance.
              <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
            </p>
              <p className="help-text">Each POI can be edited or deleted, except for the pre-recorded ones.</p>
              <p className="help-text">You also have the possibility to add tags and categories to each of your POI's and to filter with
                them the displayed points of interest.</p>
            </td>
          </tr>
        </table>



        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2> How to use it?  </h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>

              <p className="help-text">
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
                Using Mapathon is simple. Once connected, you can access the list of POIs by clicking on Get POIs.
                The list of saved POIs will be displayed, both on the right and on the map.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">The markers on the map will display a popup with basic information about the point of interest in question.
                The list on the right provides access to the selected POI website.
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
              <p className="help-text">Each POI can be edited or deleted, except for the pre-recorded ones.</p>
            </td>
          </tr>
        </table>



        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2> How to login myself?  </h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>In the toolbar, at the top right, is written "login". By clicking on it, you will be able
                to connect via your Github credentials.</p>
            </td>
          </tr>
        </table>

        <h2 className="subtitle"> Managing POIs  </h2>

        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2> How can I add a new point of interest? </h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
                In order to create a POI, you must first click on the "add POI" button located on the right,
                above the list of POIs created so far. Once clicked on this button, a popup will open with 3 buttons:
                <ul>
                  <li> Manually</li>
                  <li> By Clicking</li>
                  <li> Cancel</li>
                </ul>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">Let's start with manual addition: By clicking on the "Manually" button, a page of details will open,
                with the possibility of entering all the information. The manual aspect is that it is up to the user to enter the latitude and
                longitude of your POI so that it can be located on the map. Once this is done, a page summarizing your POI will appear, and by
                clicking on "Mapathon" at the top left, you will return to the map and see your new POI in the list.
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">As for the addition by clicking, the operation is identical, with the difference that when you click on
                "by clicking" a cross-shaped cursor will appear, allowing you to select a point on the map. Once this is done, the same form as
                for the manual version will appear, with the "Latitude" and "Longitude" fields already filled in. The rest of the process is exactly
                the same as the manual addition.
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                If you are having trouble finding your POI after it has been created, you can click on "POIs of the user" to filter the information
                and display only the POIs you have created.
              </p>
            </td>
          </tr>
        </table>



        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2>How can I edit one of my POIs?</h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text" >When you click on your POI in the list, or directly on the marker on the map,
                a popup opens above it with a summary of the POI information. Below is a "Details" button.
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text" >Once clicked on it, a page with information about your POI will appear, and
                you can, by clicking on the "Edit" button at the top, modify the different fields.
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
        </table>

        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2>How can I delete one of my POIs?</h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text" >When you click on your POI in the list, or directly on the marker on the map,
                a popup opens above it with a summary of the POI information. Below is a "Details" button.
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text" >Once clicked on it, a page with information about your POI will appear, and
                you can, by clicking on the "Delete" button at the top, delete the POI.
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
        </table>

        <h2 className="subtitle"> Managing categories  </h2>

        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2> How can I add a new category </h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
                In the navigation bar at the top is a button "Manage categories and tags". By clicking on it, you will
                access the page allowing you to add or delete categories.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
                Then just click on "Add" and fill in the necessary fields, namely a name and url of a and
                image in .logo or .png format.
              </p>
            </td>
          </tr>
        </table>



        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2>How can I add or remove a category to my POI?</h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text" >By clicking on a POI or on its marker, y a popup will be opened and you can
                click on a "Details" button. (Exactly like for the POI edition).
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text" >And so, you could click on "Manage categories"
                to check or uncheck some tags.
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
        </table>

        <h2 className="subtitle"> Managing tags </h2>

        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2> How can I add a new tag </h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
                In the navigation bar at the top is a button "Manage categories and tags". By clicking on it, and
                selecting the "tag" tab, you will access the page allowing you to add or delete tags.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
                Then just click on "Add" and fill in the necessary fields, namely a name and url of a and
                image in .logo or .png format. You can also give a  color to your taf, defining if the POI is in progress (orange),
                in activity (white), or no longer active.
              </p>
            </td>
          </tr>
        </table>



        <table className="help-question">
          <tr>
            <th colSpan="2">&nbsp;
              <h2>How can I add or remove a tag to my POI?</h2></th>
            <th>&nbsp; </th>
          </tr>
          <tr>
            <td>
              <p className="help-text" >By clicking on a POI or on its marker, y a popup will be opened and you can
                click on a "Details" button. (Exactly like for the POI edition).
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text" >And so, you could click on "Manage tags"
                to check or uncheck some tags.
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
        </table>

      </div>

    );
  }
}