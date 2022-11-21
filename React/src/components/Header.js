import React, { Component } from "react";

import logo_matcher from "./logo_matcher.png";

class Header extends Component {
  render() {
    return (
      <img
        src={logo_matcher}
        width="150"
        style={{ marginTop: "10px", marginRight: "30px" }} // outer {} is for js, inner {} is for object
      />
    );
  }
}

export default Header;
