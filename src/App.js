import React, { Component } from "react";
import "./App.css";
import Loader from "react-loader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      question2_text: "Hello World",
      users: [],
      posts: []
    };
  }

  question2() {
    if (this.state.question2_text === "Hello World") {
      this.setState({
        question2_text: "Hello Pakistan"
      });
    } else {
      this.setState({
        question2_text: "Hello World"
      });
    }
  }

  fetchQuestion4() {
    this.setState({
      loading: false
    });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(results => results.json())
      .then(
        response => {
          console.log(response);
          this.setState({
            users: response
          });
          this.fetchPosts();
        },
        failure => {
          this.setState({
            loading: true
          });
          console.log(failure);
        }
      );
  }

  fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(results => results.json())
      .then(
        response => {
          this.setState({
            posts: response,
            loading: true
          });
          console.log("users -->", this.state.users);
          console.log("posts -->", this.state.posts);
        },
        failure => {
          this.setState({
            loading: true
          });
          console.log(failure.message);
        }
      );
  }

  render() {
    const name = "Hello World";
    const obj = { name: "Hello World Object" };
    const data = ["We", "are", "United"]; //Show these in seperate tags
    const list = [
      { name: "Hello World 1" },
      { name: "Hello World 2" },
      { name: "Hello World 3" }
    ]; //Show these in seperate tags
    const complex = [
      { company: "XYZ", jobs: ["Javascript", "React"] },
      { company: "ABC", jobs: ["AngularJs", "Ionic"] }
    ];

    return (
      <div>
        <div className="App">
          <h2>Question 1</h2>
          <div id="question1_div">
            <p>{name}</p>
            <p>{obj.name}</p>
            {data.map((item, index) => (
              <p>{item}</p>
            ))}

            {list.map((item, index) => (
              <p>{item.name}</p>
            ))}

            {complex.map(item => {
              return (
                <div>
                  <p>Company Name: {item.company}</p>
                  {item.jobs.map(jobItem => (
                    <p>Job: {jobItem}</p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="App">
          <h2>Question 2</h2>
          <button onClick={() => this.question2()}>
            {this.state.question2_text}
          </button>
        </div>

        <div className="App">
          <h2>Question 3</h2>
          <p>
            <b>onClick=&#123;this.myFunc&#125;</b> --> We call function like
            this, when we have define function as arrow function For Eg.{" "}
            <b>myFunc = () => &#123;&#125;</b>
          </p>
          <p>
            <b>onClick=&#123;() => this.myFunc()&#125;</b> --> We call function
            like this, when we have define function normally. For Eg.{" "}
            <b>myFunc() &#123;&#125;</b>
          </p>
          <p>
            <b>onClick=&#123;this.myFunc.bind(this}&#125;</b> --> We call
            function like this, when we have define function normally. For Eg.{" "}
            <b>myFunc() &#123;&#125;</b>
          </p>
        </div>

        <div className="App">
          <h2>Question 4</h2>
          <Loader
            loaded={this.state.loading}
            color="#909090"
            loadedClassName="loadedContent"
            className="spinner"
          ></Loader>
          <button onClick={() => this.fetchQuestion4()}>
            Fetch Users from API
          </button>
          {this.state.users.map(item => {
            return (
              <div>
                <p>Name: {item.name}</p>
                <p>Email: {item.email}</p>
                <h4>User Posts</h4>
                {this.state.posts.map(postItem =>
                  postItem.userId === item.id ? (
                    <div>
                      <hr />
                      <p>Title: {postItem.title}</p>
                      <p>Body: {postItem.body}</p>
                      <hr />
                    </div>
                  ) : (
                    ""
                  )
                )}
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
