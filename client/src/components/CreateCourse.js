import React, { Component } from "react";
import "../css/style.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import fetchFromHost from "../FetchFromServer";

class CreateCourse extends Component {
  /**
   *
   */
  componentDidMount() {
    this.setState({ groups: [] });
  }

  /**
   * this function adds groups to the specific course
   */
  addGroup() {
    if (
      document.getElementById("gname").value &&
      document.getElementById("gname").value.length > 0 &&
      document.getElementById("gtextarea").value &&
      document.getElementById("gtextarea").value.length > 0
    ) {
      let group = {
        name: document.getElementById("gname").value,
        description: document.getElementById("gtextarea").value
      };
      this.state.groups.push(group);
      this.setState({ asd: "" });
      document.getElementById("gname").value = "";
      document.getElementById("gtextarea").value = "";
    }
  }

  /**
   * this function creates a course
   */
  createCourse() {
    fetchFromHost("/api/course", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: document.getElementById("cname").value,
        description: document.getElementById("ctextarea").value,
        lessongroups: this.state.groups
      })
    });
  }

  render() {
    if (this.state)
      return (
        <div className="coursesPage">
          <h1>Create a new course</h1>
          <form action="/courses" method="get">
            {/* <table
              border="3px"
              style={{
                borderStyle: "solid",
                padding: "15px"
              }}
            > */}
            <h3>Course name:</h3>
            <input
              type="text"
              id="cname"
              name="cname"
              placeholder="course name"
              required
            />
            <br />
            <h3>Course description:</h3>
            <textarea
              id="ctextarea"
              rows="8"
              cols="70"
              name="cdescription"
              placeholder="course description"
              required
            />
            <br />
            <div>
              <h3>Groups</h3>
              {/* <table border="2px"> */}
              <p>Group name:</p>
              <input
                ref={this.myRef1}
                id="gname"
                type="text"
                name="gname"
                placeholder="group name"
              />
              <p>Group description:</p>
              <textarea
                id="gtextarea"
                ref={this.myRef2}
                rows="8"
                cols="70"
                name="gdescription"
                placeholder="group description"
              />
              <br />
              <br />
              <input
                type="button"
                onClick={() => this.addGroup()}
                name="gcreate"
                value="Add Group"
                style={{
                  height: "30px",
                  width: "100px"
                }}
              />
              <DataTable
                value={this.state.groups}
                style={{
                  width: "580px"
                }}
              >
                <Column field="name" header="Groups" />
              </DataTable>
              {/* </table> */}
            </div>
            <br />
            <input
              type="button"
              onClick={() => {
                {
                  this.createCourse();
                  window.location.href = "/#/courses";
                  window.location.reload();
                }
              }}
              name="ccreate"
              value="Create"
              style={{
                height: "30px",
                width: "100px"
              }}
            />
            {/* </table> */}
          </form>
        </div>
      );
    return <div />;
  }
}

export default CreateCourse;
