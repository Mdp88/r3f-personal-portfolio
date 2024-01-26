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

export const projects = [
  {
    title: "3D Mini Golf",
    description:
      "Full-stack 3D game created using Three.js and the MERN stack for persisting high-scores data. Rapier Engine was utilized for physics simulation.",
    src: "assets/minigolf.png",
    link: "https://3d-minigolf.netlify.app/",
    tech: [
      "Three JS",
      "React",
      "CSS",
      "JavaScript",
      "HTML",
      "Node JS",
      "Mongo DB",
    ],
  },
  {
    title: "Weather App",
    description:
      "Weather App, created with React + Leaflet (Open Source Maps) + WeatherApi.com API.",
    src: "assets/weatherApp.jpeg",
    link: "https://weathermapmdp.netlify.app/",
    tech: ["React", "CSS", "JavaScript", "HTML"],
  },
  {
    title: "Besares Odontología",
    description: "Website for my client Besares Odontología (dental clinic).",
    src: "assets/besares.png",
    link: "https://www.besaresodontologia.com/",

    tech: ["React", "CSS", "JavaScript", "HTML"],
  },
  {
    title: "CMG Abogados",
    description: "Website for my client CMG Abogados (law firm).",
    src: "assets/cmg.png",
    link: "https://www.cmg-abogados.com",
    tech: ["CSS", "JavaScript", "HTML"],
  },
  {
    title: "Matchin Gun",
    description:
      "Fake Dating App, using React + the Randomuser API. Allows the user to filter the matches by gender and age range.",
    src: "assets/matchingun.jpeg",
    link: "https://matchingun.netlify.app/",
    tech: ["React", "CSS", "JavaScript", "HTML"],
  },
  {
    title: "Tic-tac-toe",
    description:
      "Tic-tac-toe single player game. Opponent's 'AI' created from scratch trough simple rules with JS.",
    src: "assets/tateti.png",
    link: "https://tateti-mdp.netlify.app/",
    tech: [, "CSS", "JavaScript", "HTML", "Bootstrap"],
  },
];
