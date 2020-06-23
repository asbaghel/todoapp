import React, { Component } from "react";

import EditTodo from "./EditTodo";
export class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  onClick = e => {
    console.log("onclick ", this.props.todo);
    fetch(
      "http://localhost:4001/api/posts/delete" + "/" + this.props.todo._id,
      {
        method: "delete"
      }
    )
      .then(res => res.json())
      .then(data => this.props.delTodo(data.post._id));
  };

  onChange = e => {
   

    this.props.markComplete(
      this.props.todo._id,
      this.props.todo.title,
      this.props.todo.completed
    );
 
  };

  getStyle = () => {
    console.log(
      "inside get style",
      this.props.todo.completed,
      this.props.todo._id
    );
    return {
      padding: "5px",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
      background: "#f4f4f4",
      borderBottom: "1px dotted"
    };
  };

  render() {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={this.onChange}></input>{" "}
          {this.props.todo.title}
          {"   "}
          <EditTodo
            updateTodo={this.props.updateTodo}
            toId={this.props.todo._id}
          ></EditTodo>
          <button onClick={this.onClick} style={bntStyle}>
            X
          </button>
        </p>
      </div>
    );
  }
}



const bntStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "50%",
  float: "right",
  marginTop: "-20px"
};

export default TodoItem;
