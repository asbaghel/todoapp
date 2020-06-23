import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import "./App.css";
import AddTodo from "./components/AddTodo";
import uuid from "uuid";
import About from "./components/pages/About";
import { Provider } from "react-redux";


var title1, id1;
class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    fetch("http://localhost:4001/api/posts")
      .then(res => res.json())
      .then(data => {
        this.setState({ todos: data })
        console.log('this is state',this.state.todos);

      });
      
  }

  markComplete = (id,title,completed) => {
    const todo={
      _id:id,
      title:title,
      completed:!completed

    }

    fetch("http://localhost:4001/api/posts/update" + "/" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.log("there is a err"));
    this.setState({
      todos:
        this.state.todos.map(todo => {
          if (todo._id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
    });




//updating in database


fetch("http://localhost:4001/api/posts/update" + "/" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.log("there is a err"));


  };

  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo._id !== id)]
    });
  };
  myfunc = (value, index, todos) => {
    if (value._id === id1) {
      value.title = title1;
    }

    console.log(title1);
    return value;
  };

  updateTodo = todo => {
    title1 = todo.title;
    id1 = todo._id;

    // this.myfunc();
    this.setState({ todos: this.state.todos.map(this.myfunc) });
    // console.log(this.state.todos.map(this.myfunc));
  };

  //Add todo
  addTodo = data => {
    const newTodo = {
      _id: data._id,
      title: data.title,
      completed: data.completed
    };

    this.setState({ todos: [newTodo,...this.state.todos ] });
  };

  render() {
    console.log(this.state.todos);
    return (
      <Router>
       
          <div className="App">
            <div className="container">
              <Header></Header>

              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo} />
                    <Todos
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                      updateTodo={this.updateTodo}
                    ></Todos>
                  </React.Fragment>
                )}
              ></Route>

              <Route path="/about" component={About}></Route>
            </div>
          </div>
     
      </Router>
    );
  }
}

export default App;
