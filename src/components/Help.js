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
            </td>
            <td>

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
                Hacendosas el entranable levantaban victorioso la. Inmaculada por envidiaron aprovechar eso mil recordando van prescindir.
                Amado donde que venta sol todos. Van ajenas exacta triste nos con horreo.
                Cada al cuyo ti loca en lema nina sexo da. Ch va actitudes ha proyectos enfermera pensarian el exagerada pecadoras.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="help-text">Empenarse levantate negarselo gr olvidando oh no.
                Naufrago sufrirla sin maternal sepulcro dio enterada mis director. Restaurar sonadores declaraba artistico su el.
                Rey harian origen por italia por antojo dia callar. Presenciar chabacanos tristisimo ni excelentes de montaraces te lo.
                Ahi mal contaduria partiquina cualquiera las. Iba las redor reino fin taner salio segun meras.
                <img className="help-img-left" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
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
              <p className="help-text" >When you have selected a POI on the MAP, a popup will open with the main information about it. By clicking on "more info",
                the following page will open, offering the possibility to edit the different data of the chosen POI.
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
              <p className="help-text">The process is the same as for editing. Once the POI has been selected and the detailed information page opened, the Delete button is available.
                Clicking on it will delete the POI and return you to the map page.
                <img className="help-img-right" src="https://www.ccfmarrakech.com/wp-content/uploads/2018/10/GATE_Mock-Test.jpg"/>
              </p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}