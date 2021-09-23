import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";
import { ethers } from "ethers";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {}
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

  }

  async componentDidMount() {

    // this.getResumeData();

    console.log('mounting...');

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // const provider = new ethers.providers.JsonRpcProvider();

    console.log({ provider })
    const signer = provider.getSigner();
    
    console.log({ signer })

    const balance = await provider.getBalance();
    console.log({ balance })

    // TODO - get an instance of the Silly Squares Club contract (deployed on Polygon)
    //      - 0x4a2D1ee65060ee4f01B85c569076d90aFd1B9FF8
    
    // TODO - get balance of SILLY_SQUARES_CLUB tokens

    // TODO - allow users to call the contract's "mint" function

  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Contact data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;
