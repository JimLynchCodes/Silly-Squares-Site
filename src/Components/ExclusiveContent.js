import React, { Component } from "react";
import Slide from "react-reveal";
import { ethers } from "ethers";


class ExclusiveContent extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };


    }


    render() {
        return (
            <section id="resume" >

                <Slide left duration={1300}>
                    <div style={this.props.sillySquareBalance > 0 ? { background: "url('../images/stars.png')", backgroundRepeat: 'repeat' } :
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
                                    <span>You own ({this.props.sillySquareBalance}) Original Silly Squares Club NFTs.</span>
                                </h2>
                                <h2>
                                    <span>You own ({this.props.sillySquareSummertimeBalance}) Silly Squares Summertime NFTs.</span>
                                </h2>
                                <br />
                            </div>
                            <br />

                            {this.props.sillySquareBalance < 1 &&

                                <div style={{ border: '2px solid gold', backgroundColor: 'white', borderRadius: '20px', padding: '15px' }}>
                                    <p>
                                        Uh oh, you don't own any Silly Squares!
                                        <br />
                                        <br />
                                        You need to connect a MetaMask account that owns at least one Silly Square to see the exclusive content here!
                                    </p>
                                </div>
                            }

                            {this.props.sillySquareBalance > 0 && <h2>
                                <div style={{ border: '2px solid gold', backgroundColor: 'white', borderRadius: '20px' }}>
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


                            </h2>}
                            <br />
                            <br />
                            <br />
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
