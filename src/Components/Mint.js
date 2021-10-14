import React, { Component } from "react";
import Slide from "react-reveal";
import { ethers } from "ethers";

const mintBtnStyles = {
    width: '40vw',
    height: '10vh',
    lineHeight: '9vh',
    borderRadius: '25px',
    backgroundColor: "green",
    border: '5px solid darkgreen',
    color: 'white',
    fontSize: '4rem',
    margin: 'auto',
    cursor: 'pointer'
}

const mintInputStyles = {
    fontSize: '29px',
    padding: '7px 5px 7px 10px',
    borderRadius: '9px'
}

class Mint extends Component {

    COST_PER_NFT_ETH = 0.002

    constructor(props) {

        super(props);

        this.state = {
            numberOfNFTsToMint: 1,
            connectedContract: undefined,
            costPerNFT: this.COST_PER_NFT_ETH,
            mintCostEth: undefined,
            mintCostWei: undefined,
            totalCost: this.COST_PER_NFT_ETH * 10 ** 18
        };

    }

    async componentDidMount() {

        setTimeout(() => {

            //     console.log('ok', this.props.nftContractWithSigner)
            //     console.log('ok', this.props.nftContract)

            const connectedContract = this.props.nftContract.connect(this.props.signer);
            this.setState({ connectedContract })

            this.state.connectedContract.on('Transfer', (from, to, token) => {
                console.log('heard the transfer event! ')
                console.log(from)
                console.log(to)
                console.log(token)

                const tokenId = ethers.utils.formatUnits(token, 'wei')

                console.log(tokenId);

                // ethers.BigNumber.toString()

                // alert("You successfully minted a new NFT!!\n\n You can view it at: ")

                if (window.confirm('You successfully minted a new NFT!!\n\n Click "Ok" to view it on OpenSea!\n\n(Note: Traits and image may take a few minutes or hours for OpenSea to load)')) {
                    window.location.href = 'https://opensea.io/assets/matic/0x4a2d1ee65060ee4f01b85c569076d90afd1b9ff8/' + tokenId;
                };

            })

            console.log('set up listener... ', this.state.connectedContract)

        }, 1000)

    }

    handleNFTsNumberInputChange(event) {

        const tokensToMint = event.target.value

        const totalCost = tokensToMint * this.state.mintCostWei;

        this.setState({ numberOfNFTsToMint: tokensToMint, totalCost })
    }

    async handleMintSubmit() {

        console.log('Minting!!')
        // event.preventDefault();

        console.log(this.props)

        console.log('ok2', this.props.nftContract)
        const mintCostWei = await this.props.nftContract.cost()
        const mintCostEth = ethers.utils.formatEther(mintCostWei);

        console.log({ mintCostWei })
        console.log({ mintCostEth })
        this.setState({ mintCostEth, mintCostWei })

        const overrides = {}

        if (this.props.userAddress !== this.props.contractOwnerAddress)
            overrides.value = this.state.totalCost.toString();
        else {
            overrides.value = 0;
            console.log('called by owner... not charging to mint!')
        }

        console.log('trying to mint:')
        console.log('this.props.userAddress: ', this.props.userAddress)
        console.log('this.props.userAddress: ', this.props.contractOwnerAddress)
        console.log('this.state.numberOfNFTsToMint: ', this.state.numberOfNFTsToMint)
        console.log('overrides: ', overrides)
        console.log('this.props.nftContractWithSigner: ', this.props.nftContractWithSigner)

        await this.props.nftContractWithSigner.mint(this.props.userAddress, this.state.numberOfNFTsToMint, overrides)

    }

    async mintTokens() {

        console.log('minting!')

        const mintCostWei = await this.props.nftContract.cost()
        const mintCostEth = ethers.utils.formatEther(mintCostWei);

        console.log({ mintCostWei })
        console.log({ mintCostEth })
        this.setState({ mintCostEth, mintCostWei })

        const totalCost = this.state.numberOfNFTsToMint * mintCostWei;

        const overrides = {}

        if (this.props.userAddress !== this.props.contractOwnerAddress)
            overrides.value = totalCost.toString();
        else {
            overrides.value = 0;
            console.log('called by owner... not charging to mint!')
        }
        console.log('args')
        console.log(this.props.userAddress, this.state.numberOfNFTsToMint, overrides)

        // if (!this.n)
        // const n = this.props.nftContract.connect(this.props.signer);

        const success = await this.state.connectedContract.mint(this.props.userAddress, this.state.numberOfNFTsToMint, overrides);

        // this.setState({ })

        console.log('Request to mint sent!')
        alert('your request to mint has been sent successfully!')
        console.log('success ', success)

    }

    render() {
        return (
            <section id="resume" >

                <Slide left duration={1300}>
                    <div className="">

                        <div className="row text-center">
                            <h2>
                                <span>Mint Here!</span>
                            </h2>
                            <h3>
                                <span>( {this.props.totalAlreadyMinted} ) of ( {this.props.totalSupply} ) remaining to be minted!</span>
                            </h3>
                            <br />
                            <p>
                                Click the "mint" button to generate a new random NFT in the Silly Squares Summertime collection!
                            </p>
                            <br />
                            <h3>
                                <span>Cost: {this.state.costPerNFT}Eth per NFT</span>
                            </h3>
                            <p>
                                (Users can mint up to 20 NFTs in a single transaction)
                            </p>
                            <br />
                            <img src="../images/gumball-machine.jpg" />


                            <form>
                                <br />
                                <br />
                                <label for="numberOfNftsToMint">NFTs to Mint (1-20):</label>

                                <br />
                                <input type="number" id="numberOfNftsToMint" name="numberOfNftsToMint" style={mintInputStyles}
                                    min="1" max="20" value={this.state.numberOfNFTsToMint} onChange={(e) => this.handleNFTsNumberInputChange(e)} ></input>
                                <br />
                                <br />
                                <br />

                                <div style={mintBtnStyles} onClick={async () => await this.mintTokens()}>
                                    <span style={{ userSelect: 'none' }}>
                                        Mint!
                                    </span>
                                </div>
                            </form>

                        </div>

                    </div>
                </Slide>

            </section>
        );
    }
}

export default Mint;
