import React, { Component } from "react";
import Slide from "react-reveal";

class NFTs extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const skillmessage = this.props.data.skillmessage;

    const openSource = this.props.data.openSource.map((openSource, i) => {
      return (
        <div key={'k' + i}>
          <h3>Free & Open-Source</h3>
          <p className="info">
            {openSource.info} <span>&bull;</span>
          </p>
          <p></p>
          <a href={openSource.siteSourceCodeLink}>{openSource.siteSourceCodeLink}</a>
          <br />
          <br />
        </div>
      );
    });

    const education = this.props.data.education.map((education, i) => {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p></p>

          <div className="row nft-img-row">
            <a href={education.nf1Link}>
              <img className="square-img"
                src={education.nf1Image}></img>
            </a>
            <a href={education.nf2Link}>
              <img className="square-img"
                src={education.nf2Image}></img>
            </a>
            <a href={education.nf3Link}>
              <img className="square-img"
                src={education.nf3Image}></img>
            </a>
          </div>

          <a href={education.openSeaLink}>Browse the entire collection on OpenSea!</a>
          <br />
          <br />
          <h4>
            Contract Address: <a href={education.polygonscanLink}>
              {education.contractAddress}
            </a>
            <br />
            <br />
          </h4>

          {/* {i !== this.props.data.education.length - 1 && <hr />} */}

          <h4>
            Source Code:<br /><a href={education.contractSourceCodeLink}>
              {education.contractSourceCodeLink}
            </a>
            <br />
            <br />
          </h4>

          {i !== this.props.data.education.length - 1 && <hr />}

        </div>
      );
    });

    const work = this.props.data.work.map((work, i) => {
      return (
        <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
          </p>
          <p>
            {work.description}
          </p>

          <br />
          {i !== this.props.data.work.length - 1 && <hr />}
          <br />
        </div>
      );
    });

    // const skills = this.props.data.skills.map((skills) => {
    //   const backgroundColor = this.getRandomColor();
    //   const className = "bar-expand " + skills.name.toLowerCase();
    //   const width = skills.level;

    //   return (
    //     <li key={skills.name}>
    //       <span style={{ width, backgroundColor }} className={className}></span>
    //       <em>{skills.name}</em>
    //     </li>
    //   );
    // });

    return (
      <section id="resume" className="resume">
        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Open-Source</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{openSource}</div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>NFTs</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Technology</span>
              </h1>
            </div>

            <div className="nine columns main-col">{work}</div>

          </div>
        </Slide>

        {/* <Slide left duration={1300}>
          <div className="row skill">
            <div className="three columns header-col">
              <h1>
                <span>Skills</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <p>{skillmessage}</p>

              <div className="bars">
                <ul className="skills">{skills}</ul>
              </div>
            </div>
          </div>
        </Slide> */}
      </section>
    );
  }
}

export default NFTs;
