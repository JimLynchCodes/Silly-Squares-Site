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
import SillySqauresABI from './contract-ABIs/Silly_Squares_NFT_ABI.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      sillySquaresContract: undefined,
      signer: undefined,
      currentUserAddress: '',
      contractOwnerAddress: '',
      sillySquareBalance: 0,
      mintCostEth: 0,
      mintCostWei: 0,
    };

    this.getResumeData();

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

  }

  async componentDidMount() {


    console.log('mounting...');

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Gets the public address of currently connected metamask user
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    console.log({ signerAddress });

    this.setState({ signer, currentUserAddress: signerAddress })

    // const balance = await provider.getBalance();
    // console.log({ balance })

    // TODO - get an instance of the Silly Squares Club contract (deployed on Polygon)
    //      - 0x4a2D1ee65060ee4f01B85c569076d90aFd1B9FF8


    const silly_squares_club_address = '0x4a2D1ee65060ee4f01B85c569076d90aFd1B9FF8';

    // Connect to the Silly Squares Contract
    const sillySquaresContract = new ethers.Contract(
      silly_squares_club_address,
      SillySqauresABI,
      provider
    );

    // const contractWithSigner = await sillySquaresContract.connect(signer);

    this.setState({ sillySquaresContract });

    console.log({ sillySquaresContract })

    // Gets current user's balance of SILLY_SQUARES_CLUB tokens
    //  (ie. how many of these NFTs the user owns)

    const sillySquareBalance = (await sillySquaresContract.balanceOf(signerAddress)).toNumber();

    console.log({ sillySquareBalance })
    this.setState({ sillySquareBalance })

    // Checks who is the contract owner (to know if you need to send payment when minting)
    const contractOwnerAddress = await sillySquaresContract.owner();

    console.log({ contractOwnerAddress })
    this.setState({ contractOwnerAddress })

    // Checks the price for minting a token
    const mintCostWei = await sillySquaresContract.cost()
    const mintCostEth = ethers.utils.formatEther(mintCostWei);

    console.log({ mintCostEth })
    this.setState({ mintCostEth, mintCostWei })

  }

   // TODO - allow users to call the contract's "mint" function
   async mintTokens(tokensToMint) {

    const totalCost = tokensToMint * this.state.mintCostWei;

    const overrides = {}

    if (this.state.currentUserAddress !== this.state.contractOwnerAddress)
      overrides.value = totalCost.toString();
    else {
      overrides.value = 0;
      console.log('called by owner... not charging to mint!')
    }

    console.log('args')
    console.log(this.state.currentUserAddress, tokensToMint, overrides)

    const n = this.state.sillySquaresContract.connect(this.state.signer);

    await n.mint(this.state.currentUserAddress, tokensToMint, overrides);

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
        <button onClick={() => this.mintTokens(2)}>Mint!!</button>
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
