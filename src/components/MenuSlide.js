import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import AddForm from "./AddForm";
import MENU_MODES from "../MenuModes";
class MenuSlide extends Component {
  state = {};
  handleMenuChange = state => {
    this.props.handleMenuChange(state.isOpen);
  };
  handleForm = newPOI => {
    this.props.handleForm(newPOI);
  };
  render() {
    return (
      <Menu
        styles={burgerStyles}
        right
        isOpen={this.props.isOpen}
        onStateChange={this.handleMenuChange}
      >
        <div>
          {this.props.menuMode == MENU_MODES.DEFAULT ? (
            "Default"
          ) : (
            <AddForm
              currentPointer={this.props.currentPointer}
              handleForm={this.handleForm}
            />
          )}
        </div>
      </Menu>
    );
  }
}

export default MenuSlide;

var burgerStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47",
    visibility: "hidden"
  },
  bmBurgerBarsHover: {
    background: "#a90000"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "#fcfcfc",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em"
  },
  bmItem: {
    display: "inline-block"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};
