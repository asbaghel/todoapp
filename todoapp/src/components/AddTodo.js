import React, { Component } from "react";

export class AddTodo extends Component {
  state = {
    title: "",
    value: "",
  };

  onChange = (e) => this.setState({ title: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const todo = {
      title: this.state.title,
      completed: false,
    };
    fetch("http://localhost:4001/api/posts/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => this.props.addTodo(data));
    // this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.onChange}
          placeholder="Add Todo"
          style={{ flex: "10", padding: "10px", color: "red" }}
        ></input>
        <input
          type="submit"
          value="submit"
          className="btn"
          style={{ flex: "1" }}
        ></input>
      </form>
    );
  }
}

export default AddTodo;
