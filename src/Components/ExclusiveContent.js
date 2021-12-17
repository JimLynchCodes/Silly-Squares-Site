import React, { Component } from "react";
import Slide from "react-reveal";
import { ethers } from "ethers";
import Calendly from './Calendly';
import './ExclusiveContent.css';

class ExclusiveContent extends Component {

    constructor(props) {

        super(props);

        this.state = {};
    }

    render() {
        return (
            <section >

                <Slide left duration={1300}>
                    <div style={this.props.sillySquaresTotalBalance > 0 ? { background: "url('../images/stars.png')", backgroundRepeat: 'repeat' } :
                        { backgroundColor: '#ebeeee' }}>

                        <div className="row text-center">
                            <br />

                            <div style={{ border: '2px solid gold', backgroundColor: 'white', borderRadius: '20px' }}>
                                <br />
                                <h1>
                                    <span>Exclusive Content For Token Holders!</span>
                                </h1>
                                <br />
                                <h2>
                                    <span>You own:
                                        <br />
                                        <br />
                                        (&nbsp;{this.props.sillySquaresClubBalance}&nbsp;) Original Silly Squares Club NFTs
                                        <br />
                                        <br />
                                        and
                                        <br />
                                        <br />
                                        (&nbsp;{this.props.sillySquaresSummertimeBalance}&nbsp;) Silly Squares Summertime NFTs.
                                        <br />
                                        <br />
                                        <br />
                                        Total Silly Squares Owned: (&nbsp;{this.props.sillySquaresTotalBalance}&nbsp;)
                                        <br />
                                        <br />
                                    </span>
                                </h2>
                                <br />
                            </div>
                            <br />

                            {this.props.sillySquaresTotalBalance < 1 &&

                                <div style={{ border: '2px solid gold', backgroundColor: 'white', borderRadius: '20px', padding: '15px' }}>
                                    <p>
                                        Uh oh, you don't own any Silly Squares!
                                        <br />
                                        <br />
                                        You need to connect a MetaMask account that owns at least one Silly Square to see the exclusive content here!
                                    </p>
                                </div>
                            }

                            {this.props.sillySquaresTotalBalance > 0 && <h2>
                                <div style={{ 
                                    border: '2px solid gold', 
                                    backgroundColor: 'white', 
                                    borderRadius: '20px'
                                    }}>
                                    <br />
                                    You are a Silly Squares NFT holder!!

                                    <br />
                                    <br />
                                    Please enjoy this EXCLUSIVE picture of a zebra!

                                    <br />
                                    <br />
                                </div>
                                <br />

                                <img src='../images/zebra.jpg' />
                                <br />
                                <br />
                                <br />

                                <div className="awesomeness-header">
                                    <br/>
                                    <h2>Awesomeness Consulting Scheduler</h2>
                                    <br/>
                                    <p>Exclusively for Silly Squares holders!</p>
                                </div>

                                <Calendly 
                                    height='700px'
                                    url='https://calendly.com/everybodycodes/awesomeness-consulting'/>

                            </h2>}
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />

                        </div>

                    </div>

                </Slide>

            </section>
        );
    }
}

export default ExclusiveContent;
