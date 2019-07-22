import React, { Component } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Redirect } from "react-router-dom";
import fetchFromHost from "../FetchFromServer";

class CourseSmall extends Component {
  state = {
    redirect: null
  };
  setRedirect = asd => {
    this.setState({
      redirect: asd
    });
  };

  renderRedirect = () => {
    switch (this.state.redirect) {
      case "course":
        return <Redirect to={"/course/" + this.props.data._id} />;
      case "update":
        return <Redirect to={"/updatecourse/" + this.props.data._id} />;
      case "delete":
        fetchFromHost("/api/course/" + this.props.data._id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        break;
      default:
        console.log("Hibas redirect");
    }
  };

  updateRedirect = () => {
    if (this.state.redirect1) {
      return <Redirect to={"/updatecourse/" + this.props.data._id} />;
    }
  };

  render() {
    return (
      <div className="smallCurs">
        {this.renderRedirect()}
        <Card
          title={this.props.data.name}
          footer={
            <div>
              <Button
                label="Learn more"
                onClick={() => this.setRedirect("course")}
              />
              &nbsp;&nbsp;
              <Button
                label="Update"
                onClick={() => this.setRedirect("update")}
              />
              &nbsp;&nbsp;
              <Button
                label="Delete"
                onClick={() => this.setRedirect("delete")}
              />
            </div>
          }
        >
          <p>{this.props.data.description}</p>
        </Card>
      </div>
    );
  }
}

export default CourseSmall;
