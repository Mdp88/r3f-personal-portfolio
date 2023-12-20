import React, { useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { SiThreedotjs } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa";
import {
  IoLogoReact,
  IoLogoCss3,
  IoLogoJavascript,
  IoLogoHtml5,
  IoLogoNodejs,
} from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";

const Project = ({ src, tech, title, description, handleChange, link }) => {
  return (
    <div className="project-detail-container">
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.8}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="20px"
        className="card-container"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
      >
        <a
          className="card"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {src ? (
            <img src={src} />
          ) : (
            <div className="wip-container">
              <h1>WIP</h1>
            </div>
          )}
        </a>
      </Tilt>{" "}
      <div className="project-details">
        <div>
          <div className="title-container">
            <FaChevronLeft
              size={30}
              className="swipe"
              onClick={() => {
                handleChange(false);
              }}
            />
            <a href={link} target="_blank" rel="noopener noreferrer">
              <h2 className={src && "project-title-link"}>{title}</h2>
            </a>

            <FaChevronRight
              size={30}
              className="swipe"
              onClick={() => {
                handleChange(true);
              }}
            />
          </div>
          <p>{description}</p>
        </div>
        <div>
          <h3>Tech Stack</h3>
          <div className="skills-container">
            {tech.map((item) => (
              <div className="skills-icons" key={`${item}${title}`}>
                {element(item)}
                <div className="tooltip">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;

const element = (tech) => {
  switch (tech) {
    case "React":
      return <IoLogoReact />;
    case "CSS":
      return <IoLogoCss3 />;
    case "JavaScript":
      return <IoLogoJavascript />;
    case "HTML":
      return <IoLogoHtml5 />;
    case "Node JS":
      return <IoLogoNodejs />;
    case "Mongo DB":
      return <BiLogoMongodb />;
    case "Three JS":
      return <SiThreedotjs />;
    case "Bootstrap":
      return <FaBootstrap />;
    default:
      return <></>;
  }
};
