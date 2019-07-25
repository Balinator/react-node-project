import React, { Component } from "react";
import "../css/style.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import fetchFromHost from "../FetchFromServer";

class UpdateCourse extends Component {
  selectedGroup = null;

  /**
   * initialize a state and loads the courses
   */
  componentDidMount() {
    fetchFromHost("/api/course/" + this.props.id).then(async res => {
      let course = await res.json();
      console.log(course);
      this.setState({
        groups: course.lessongroups,
        course: course,
        value: []
      });
    });
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
   * this function updates a specific group in a specific course
   */
  updateGroup() {
    this.setState(old => {
      let asd = old.groups.findIndex(g => g._id === this.selectedGroup._id);
      old.groups[asd].name = document.getElementById("gname").value;
      old.groups[asd].description = document.getElementById("gtextarea").value;
      this.selectedGroup = null;
      return { selectedGroup: null };
    });
  }

  /**
   * this function deletes the specific group in a specific course
   */
  deleteGroup() {
    this.setState(old => {
      old.groups = old.groups.filter(g => g._id !== this.selectedGroup._id);
      return { selectedGroup: null };
    });
  }

  /**
   * this function updates the details for a course
   */
  updateCourse() {
    fetchFromHost("/api/course/" + this.props.id, {
      method: "PUT",
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
          <h1>Update a course</h1>
          <form action="/courses" method="get">
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
              <p>Group name:</p>
              <input
                value={this.selectedGroup ? this.selectedGroup.name : ""}
                onChange={e => {
                  this.selectedGroup.name = e.value;
                  this.setState({ asd: null });
                }}
                id="gname"
                type="text"
                name="gname"
                placeholder="group name"
              />
              <p>Group description:</p>
              <textarea
                value={this.selectedGroup ? this.selectedGroup.description : ""}
                onChange={e => {
                  this.selectedGroup.description = e.value;
                  this.setState({ asd: null });
                }}
                id="gtextarea"
                rows="8"
                cols="70"
                name="gdescription"
                placeholder="group description"
              />
              <br />
              <br />
              {this.selectedGroup ? (
                <>
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
                </>
              ) : (
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
              )}
              <DataTable
                id="mytable"
                value={this.state.groups}
                style={{
                  width: "580px"
                }}
                selectionMode="single"
                selection={this.selectedGroup}
                onSelectionChange={e => {
                  this.selectedGroup =
                    e.value === this.selectedGroup
                      ? null
                      : JSON.parse(JSON.stringify(e.value));
                  console.log(e.value);
                  this.setState({ asd: null });
                }}
              >
                <Column field="name" header="Groups" />
              </DataTable>
            </div>
            <br />
            <input
              type="button"
              onClick={() => {
                {
                  this.updateCourse();
                  window.location.href = "/#/courses";
                  window.location.reload();
                }
              }}
              name="cupdate"
              value="Update"
              style={{
                height: "30px",
                width: "100px"
              }}
            />
          </form>
        </div>
      );
    return <div>{this.state}</div>;
  }
}

export default UpdateCourse;
