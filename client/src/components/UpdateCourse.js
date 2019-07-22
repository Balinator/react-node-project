import React, { Component } from "react";
import "../css/style.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import fetchFromHost from "../FetchFromServer";

class UpdateCourse extends Component {
  componentDidMount() {
    fetchFromHost("/api/course/" + this.props.id).then(async res => {
      let course = await res.json();
      console.log(course);
      // document.getElementById("cname").value = course.name;
      this.setState({ groups: course.lessongroups, course: course });
    });
    // this.setState({ groups: [] });
  }

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

  updateGroup() {
    if (
      document.getElementById("gid").value &&
      document.getElementById("gid").value > 0 &&
      document.getElementById("gid").value === this.state.groups._id
    ) {
      this.state.groups.group = {
        name: document.getElementById("gname").value,
        description: document.getElementById("gtextarea").value
      };
      this.setState({ asd: "" });
      document.getElementById("gname").value = "";
      document.getElementById("gtextarea").value = "";
    }
  }

  deleteGroup() {
    if (document.getElementById("gid").value === this.state.groups._id) {
      delete this.state.groups[document.getElementById("gid").value];
    }
  }

  updateCourse() {
    if (document.getElementById("cid").value === this.state.courses._id) {
    }
  }

  render() {
    if (this.state)
      return (
        <div className="coursesPage">
          <h1>Update a course</h1>
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
              defaultValue={this.state.course.name}
              type="text"
              id="cname"
              name="cname"
              placeholder="course name"
              required
            />
            <br />
            <h3>Course description:</h3>
            <textarea
              defaultValue={this.state.course.description}
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
                id="gname"
                type="text"
                name="gname"
                placeholder="group name"
              />
              <p>Group description:</p>
              <textarea
                id="gtextarea"
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
              &nbsp;&nbsp;
              <input
                type="button"
                onClick={() => this.updateGroup()}
                name="gupdate"
                value="Update Group"
                style={{
                  height: "30px",
                  width: "100px"
                }}
              />
              &nbsp;&nbsp;
              <input
                type="button"
                onClick={() => this.deleteGroup()}
                name="gdelete"
                value="Delete Group"
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
              onClick={() => this.updateCourse()}
              name="cupdate"
              value="Update"
              style={{
                height: "30px",
                width: "100px"
              }}
            />
            {/* </table> */}
          </form>
        </div>
      );
    return <div>asd </div>;
  }
}

export default UpdateCourse;
