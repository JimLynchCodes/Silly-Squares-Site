import React, { Component } from "react";
import Fade from "react-reveal";

let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const team = this.props.data.team.map((teammate) => {

      let projectImage = "images/portfolio/" + teammate.img;

      return (
        <div key={id++} className="columns ">
          <div className="item-wrap">
            <a href={teammate.link}>

            <img alt={teammate.name} src={projectImage} />
            </a>
            <div style={{ textAlign: "center" }}>{teammate.name}</div>
          </div>
        </div>
      );
    });

    return (
      <section id="portfolio" >
        <Fade left duration={1100} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Team</h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-quarters cf"
              >
                {team}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
