import React, { Component } from "react";
import Fade from "react-reveal";

class About extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const profilepic = "images/" + this.props.data.image;
    const bio = this.props.data.bio;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const email = this.props.data.email;
    const resumeDownload = this.props.data.resumedownload;

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={profilepic}
                alt="Nordic Giant Profile Pic"
              />
            </div>
            <div className="nine columns main-col">
              <h2>About Us</h2>

              <p>{bio}</p>
              <div className="row">
                <div className="columns">
                  <br />
                  <h2>Roadmap</h2>
                  <p>
                    We are dedicated to building out awesome new things that integrate with Silly Squares NFTs. Here are just a few of the things on our roadmap...
                  <br />
                    <br />
                    <br />
                    <ul>
                      <li>
                        • Members page of this site, connected to MetaMask.
                      </li>
                      <li>
                        • Hoodies and other swag- with a free piece for every silly square holder!
                      </li>
                      <li>
                        • Streamlined awesomeness consulting registration calendar form.
                      </li>
                      <li>
                        • 3d metaverse experience where you can play as the silly squares you own.
                      </li>
                      <li>
                        • Support for even more types of wallets.
                      </li>
                      <li>
                        • Release our own ERC20 governance token.
                      </li>
                      <li>
                        • Host parties in NYC, Miami, and LA allowing entry with proof of silly square ownership.
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
