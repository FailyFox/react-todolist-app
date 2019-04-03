import React, { Component } from 'react';
import "bulma/css/bulma.css";
import './App.css';

let todoItems=[];
todoItems.push({index: 1,value: "to do all hometasks for React/Angular cource",done: false});
todoItems.push({index: 2,value: "make peace in a whole world",done: false});
todoItems.push({index: 3,value: "to catch an unicorn",done: false});
todoItems.push({index: 4,value: "become a ASP.NET almighty",done: false});

class TodoApp extends Component{
  constructor(props){
    super(props);
    this.state={todoItems:todoItems}
    this.addItem=this.addItem.bind(this);
    this.removeItem=this.removeItem.bind(this);
    this.markTodoDone=this.markTodoDone.bind(this);
  }

  addItem(todoItem){
    todoItems.unshift({
      index: todoItems.length+1,
      value: todoItem.newItemValue,
      done: false
    });
    this.setState({todoItems:todoItems});
  }
  removeItem(itemIndex){
    todoItems.splice(itemIndex,1);
    this.setState({todoItems:todoItems});
  }
  markTodoDone(itemIndex){
    let task=todoItems[itemIndex];
    todoItems.splice(itemIndex,1);
    task.done=!task.done;
    task.done?todoItems.push(task):todoItems.unshift(task);
    this.setState({todoItems:todoItems});
  }

  render(){
    return(
      <div id="main">
        <TodoHeader/>
        <TodoList items={this.props.initItems}
                  removeItem={this.removeItem}
                  markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem}/>
      </div>
    );
  }
}

class TodoHeader extends Component{
  render(){
    return <h1>Matviy, you have some task to do!</h1>;
  }
}

class TodoForm extends Component{
  constructor(props){
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    let newItemValue=this.refs.itemName.value;
    if(newItemValue){
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }

  componentDidMount(){
    this.refs.itemName.focus();
  }

  render(){
    return(
      //take class name from Bulma CSS
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" placeholder="add new task" className="orm-control"/>
        <button type="submit" className="button is-danger">Add</button>
      </form>
    );
  }
}

class TodoList extends Component{
  render(){
    let items=this.props.items.map((item,index)=>{
      return(
        <TodoListItem key={index}
                      index={index}
                      item={item}
                      removeItem={this.props.removeItem}
                      markTodoDone={this.props.markTodoDone}/>
      );
    });
    return(
      <ul className="list-group">{items}</ul>
    );
  }
}

class TodoListItem extends Component{
  constructor(props){
    super(props);
    this.ClickClose=this.ClickClose.bind(this);
    this.ClickDone=this.ClickDone.bind(this);
  }

  ClickClose(){
    let index=parseInt(this.props.index);
    this.props.removeItem(index);
  }

  ClickDone(){
    let index=parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  
  render(){
    let todoClass=this.props.item.done?"done":"undone";
    return(
      <li className="list-group-item">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.ClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.ClickClose}>&times;</button>
        </div>
      </li>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp initItems={todoItems}/>
      </div>
    );
  }
}

export default App;