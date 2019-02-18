import React from "react";
import { Redirect } from "react-router-dom";

class PermissionComponent extends React.PureComponent {
  render() {
    return (
      <>{this.props.auth ? this.props.children : <Redirect to="/login" />}</>
    );
  }
}

export default PermissionComponent;
