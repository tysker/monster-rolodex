import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/searchBox/search-box.component";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
      searchField: "",
      number: 0
    };
    console.log("constructor");
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  handleBtn = (e) => {
    this.setState( (prevState, prevProps) => {
      console.log(prevState)
      console.log(prevProps)
      return {number: prevState.number + prevProps.increment}
    }, () => console.log(this.state.number))
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdate!', nextProps);
    console.log("=============");
    console.log(nextProps);
    console.log(nextState);
    console.log(this.props.increment);
    console.log("=============");
    return nextProps.number !== this.props.increment;
  }

  render() {
    console.log("render")
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h3>{this.state.number}</h3>
        <button onClick={this.handleBtn}>Increment</button>
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder="search monsters..."
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
