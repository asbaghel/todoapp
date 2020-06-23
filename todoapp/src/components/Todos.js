import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    return this.props.todos.map(todo => (
      // console.log(value)
      <div>
        <TodoItem
          id={todo._id}
          updateTodo={this.props.updateTodo}
          todo={todo}
          markComplete={this.props.markComplete}
          delTodo={this.props.delTodo}
        ></TodoItem>
      </div>
    ));
  }
}

export default Todos;
