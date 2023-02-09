import React from "react";
import './App.css';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], DataisLoaded: false };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((json) => {this.setState({ users: json, DataisLoaded: true });})
    }

    render() {
        const { DataisLoaded, users } = this.state;
        if (!DataisLoaded) return <div>
        <h1> Pleses wait some time.... </h1> </div> ;

    return (
        <div className = "App">
            <h1> Fetch data from an api in react </h1>  {
                users.map((user) => (
                <ol key = { user.id } >
                    First Name: { user.firstname },
                    Last Name: { user.lastname },
                    Address1: { user.address1 }</ol>
                ))
            }
        </div>
    );
}}

export default App;
