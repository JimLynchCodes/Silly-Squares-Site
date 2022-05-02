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

const EXPECTED_CHAIN = 80001;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      homePageData: {},
      sillySquaresClubContract: undefined,
      sillySquaresSummertimeContract: undefined,
      nftContractWithSigner: undefined,
      signer: undefined,
      currentUserAddress: '',
      
      sillySquaresClubContractOwnerAddress: '',
      sillySquaresSummertimeContractOwnerAddress: '',
      
      sillySquaresClubBalance: 0,
      sillySquaresSummertimeBalance: 0,
      sillySquaresTotalBalance: 0,
      
      mintCostWeiSquaresClub: 0, 
      mintCostEthSquaresClub: 0,
      mintCostWeiSquaresSummertime: 0,
      mintCostEthSquaresSummertime: 0,
      
      totalSupplyClub: 0,
      totalSupplySummertime: 0,

      totalSquaresClubAlreadyMinted: 0,
      totalSquaresSummertimeAlreadyMinted: 0
    };

    this.getHomePageData();

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

  }

  async componentDidMount() {

    console.log('mounting...');

    window.ethereum.enable();

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    console.log({ provider })

    const { chainId } = await provider.getNetwork()

    console.log({ chainId })

    if (chainId === EXPECTED_CHAIN) {
      console.log('ON POLYGON MAINNET')
    } else {
      console.log('NOT on POLYGON MAINNET')
    }
  
    const signer =  provider.getSigner();

    const signerAddress = await signer.getAddress();

    this.setState({ signer, currentUserAddress: signerAddress })

    // TODO - get an instance of the Silly Squares Club contract (deployed on Polygon)
    //      - 0x4a2D1ee65060ee4f01B85c569076d90aFd1B9FF8

    const silly_squares_club_address = '0x4a2D1ee65060ee4f01B85c569076d90aFd1B9FF8';
    
    const silly_squares_summertime_address = '0x2f3356c0d03458ed1f6917236ab1311e770dbbc3';

    // Connect to the Silly Squares Contract
    const sillySquaresClubContract = new ethers.Contract(
      silly_squares_club_address,
      SillySqauresABI,
      provider
    );
    
    const sillySquaresSummertimeContract = new ethers.Contract(
      silly_squares_summertime_address,
      SillySqauresABI,
      provider
    );

    this.setState({ 
      sillySquaresClubContract,
      sillySquaresSummertimeContract
    });

    const sillySquaresClubBalance = (await sillySquaresClubContract.balanceOf(signerAddress)).toNumber();
    const sillySquaresSummertimeBalance = (await sillySquaresSummertimeContract.balanceOf(signerAddress)).toNumber();
    
    console.log({ sillySquaresClubBalance })
    console.log({ sillySquaresSummertimeBalance })

    const sillySquaresTotalBalance = sillySquaresClubBalance + sillySquaresSummertimeBalance;
    
    this.setState({ 
      sillySquaresClubBalance,
      sillySquaresSummertimeBalance,
      sillySquaresTotalBalance
    })
    
    // Checks who is the contract owner (to know if you need to send payment when minting)
    const sillySquaresClubContractOwnerAddress = await sillySquaresClubContract.owner();
    
    const sillySquaresSummertimeContractOwnerAddress = await sillySquaresSummertimeContract.owner();

    console.log('got owner')

    console.log({ sillySquaresClubContractOwnerAddress: sillySquaresClubContractOwnerAddress });
    console.log({ sillySquaresSummertimeContractOwnerAddress: sillySquaresSummertimeContractOwnerAddress });

    this.setState({ 
      sillySquaresClubContractOwnerAddress,
      sillySquaresSummertimeContractOwnerAddress
    })

    // Checks the price for minting a token
    const mintCostWeiSquaresClub = await sillySquaresClubContract.cost()
    const mintCostEthSquaresClub = ethers.utils.formatEther(mintCostWeiSquaresClub);
    
    const mintCostWeiSquaresSummertime = await sillySquaresSummertimeContract.cost()
    const mintCostEthSquaresSummertime = ethers.utils.formatEther(mintCostWeiSquaresSummertime);

    console.log({ mintCostEthSquaresClub: mintCostEthSquaresClub })
    console.log({ mintCostEthSquaresSummertime: mintCostEthSquaresSummertime })

    this.setState({ 
      mintCostWeiSquaresClub,
      mintCostEthSquaresClub,
      mintCostWeiSquaresSummertime,
      mintCostEthSquaresSummertime
    })

    const totalSquaresClubAlreadyMinted = await sillySquaresClubContract.totalSupply();
    const totalSquaresSummertimeAlreadyMinted = await sillySquaresClubContract.totalSupply();
    
    this.setState({ 
      totalSquaresClubAlreadyMinted: ethers.utils.formatUnits(totalSquaresClubAlreadyMinted, 'wei'),
      totalSquaresSummertimeAlreadyMinted: ethers.utils.formatUnits(totalSquaresSummertimeAlreadyMinted, 'wei')
    })
    
    const totalSupplyClub = await sillySquaresClubContract.maxSupply();
    const totalSupplySummertime = await sillySquaresSummertimeContract.maxSupply();

    console.log('max supply! ',ethers.utils.formatUnits(totalSupplyClub, 'wei') )

    this.setState({ 
      totalSupplyClub: ethers.utils.formatUnits(totalSupplyClub, 'wei') ,
      totalSupplySummertime: ethers.utils.formatUnits(totalSupplySummertime, 'wei') 
    })

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
        <br/>
        <About data={this.state.homePageData.main} />
        <NFTs data={this.state.homePageData.resume} />
        <Portfolio data={this.state.homePageData.portfolio} />
        <Mint data={this.state.homePageData.resume}
                    collectionName='The Original Silly Squares Club'
                    nftContract={this.state.sillySquaresClubContract}
                    signer={this.state.signer}
                    userAddress={this.state.currentUserAddress}
                    contractOwnerAddress={this.state.sillySquaresClubContract}
                    totalAlreadyMinted={this.state.totalSquaresClubAlreadyMinted}
                    totalSupply={this.state.totalSupplyClub}
        />
        <br/>
        <hr/>
        <br/>
        <Mint data={this.state.homePageData.resume}
                    collectionName='Silly Squares Summertime Edition'
                    nftContract={this.state.sillySquaresSummertimeContract}
                    signer={this.state.signer}
                    userAddress={this.state.currentUserAddress}
                    contractOwnerAddress={this.state.sillySquaresSummertimeContractOwnerAddress}
                    totalAlreadyMinted={this.state.totalSquaresSummertimeAlreadyMinted}
                    totalSupply={this.state.totalSupplySummertime}
        />
        <ExclusiveContent sillySquaresTotalBalance={this.state.sillySquaresTotalBalance} 
                          sillySquaresClubBalance={this.state.sillySquaresClubBalance} 
                          sillySquaresSummertimeBalance={this.state.sillySquaresSummertimeBalance}
        />
        <Contact data={this.state.homePageData.main} />
        <Footer data={this.state.homePageData.main} />
      </div>
    );
  }
}

export default App;
