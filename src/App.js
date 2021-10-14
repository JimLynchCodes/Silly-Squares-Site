import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import NFTs from "./Components/NFTs";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";
import Mint from "./Components/Mint";
import { ethers } from "ethers";
import SillySqauresABI from './contract-ABIs/Silly_Squares_NFT_ABI.json';
import ExclusiveContent from "./Components/ExclusiveContent";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      homePageData: {},
      sillySquaresContract: undefined,
      nftContractWithSigner: undefined,
      signer: undefined,
      currentUserAddress: '',
      contractOwnerAddress: '',
      sillySquareBalance: 0,
      mintCostEth: 0,
      mintCostWei: 0,
      totalSupply: 0,
      totalAlreadyMinted: 0
    };

    this.getHomePageData();

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

  }

  async componentDidMount() {

    console.log('mounting...');

    window.ethereum.enable();

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // if (provider)

    console.log({ provider })
  
    // Gets the public address of currently connected metamask user
    const signer =  provider.getSigner();

    const signerAddress = await signer.getAddress();
    // console.log({ signerAddress });

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

    this.setState({ sillySquaresContract });

    // const nftContractWithSigner = await sillySquaresContract.connect(this.state.signer);

    // const contractWithSigner = await sillySquaresContract.connect(signer);

    // this.setState({ nftContractWithSigner });

    // console.log({ sillySquaresContract })

    // Gets current user's balance of SILLY_SQUARES_CLUB tokens
    //  (ie. how many of these NFTs the user owns)

    const sillySquareBalance = (await sillySquaresContract.balanceOf(signerAddress)).toNumber();

    console.log({ sillySquareBalance })
    this.setState({ sillySquareBalance })

    // Checks who is the contract owner (to know if you need to send payment when minting)
    const contractOwnerAddress = await sillySquaresContract.owner();

    console.log('got owner')

    console.log({ contractOwnerAddress: contractOwnerAddress })
    this.setState({ contractOwnerAddress })

    // Checks the price for minting a token
    const mintCostWei = await sillySquaresContract.cost()
    const mintCostEth = ethers.utils.formatEther(mintCostWei);

    console.log({ mintCostEth })
    this.setState({ mintCostEth, mintCostWei })

    const totalAlreadyMinted = await sillySquaresContract.totalSupply();
    this.setState({ totalAlreadyMinted: ethers.utils.formatUnits(totalAlreadyMinted, 'wei') })

    
    const totalSupply = await sillySquaresContract.maxSupply();

    console.log('max supply! ',ethers.utils.formatUnits(totalSupply, 'wei') )

    this.setState({ totalSupply: ethers.utils.formatUnits(totalSupply, 'wei') })

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

    // const n = this.state.sillySquaresContract.connect(this.state.signer);

    // await n.mint(this.state.currentUserAddress, tokensToMint, overrides);

  }

  getHomePageData() {
    $.ajax({
      url: "./homePageData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ homePageData: data });
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
        <Header data={this.state.homePageData.main} />
        <br/>
        <br/>
        <br/>
        <button onClick={() => this.mintTokens(2)}>Mint!!</button>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <About data={this.state.homePageData.main} />
        <NFTs data={this.state.homePageData.resume} />
        <Portfolio data={this.state.homePageData.portfolio} />
        <Mint data={this.state.homePageData.resume}
                    nftContract={this.state.sillySquaresContract}
                    signer={this.state.signer}
                    userAddress={this.state.currentUserAddress}
                    contractOwnerAddress={this.state.contractOwnerAddress}
                    totalAlreadyMinted={this.state.totalAlreadyMinted}
                    totalSupply={this.state.totalSupply}
        />
        <ExclusiveContent sillySquareBalance={this.state.sillySquareBalance} />
        <Contact data={this.state.homePageData.main} />
        <Footer data={this.state.homePageData.main} />
      </div>
    );
  }
}

export default App;
