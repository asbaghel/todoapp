import React, { Component } from "react";

export class EditTodo extends Component {
  state = {
    title: ""
  };
  onChange = e => this.setState({ title: e.target.value });
  onSubmit = e => {
    const todo = {
      title: this.state.title,
      completed: false
    };
    e.preventDefault();

    fetch("http://localhost:4001/api/posts/update" + "/" + this.props.toId, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(data => this.props.updateTodo(data.post))
      .catch(console.log("there is a err"));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Edit  todo"
            id="edit"
            onChange={this.onChange}
          ></input>

          <input type="submit" value="Edit"></input>
        </form>
      </div>
    );
  }
}

export default EditTodo;

const formStyle = {
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  width: "15%",
  float: "right",
  marginTop: "-20px"
};
