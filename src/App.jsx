import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import "./index.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

import Project from "./components/Project";
import { projects } from "./components/helpers";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [section, setSection] = useState(0);
  const [ready, setReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const experience = useRef();
  const contact = useRef();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_x98306n",
        "template_wb99wwp",
        form.current,
        "JR3AUXEEpgZ_OVgJv"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleScroll = (e) => {
    const position = e.target.scrollTop;
    const h =
      (100 / (e.target.scrollHeight - e.target.offsetHeight)) * position;
    setScrollPosition(Math.round(h));
  };

  const handleChange = (e) => {
    if (!e) {
      if (currentSlide === 0) {
        setCurrentSlide(projects.length - 1);
      } else {
        setCurrentSlide((val) => val - 1);
      }
    }
    if (e) {
      if (currentSlide === projects.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((val) => val + 1);
      }
    }
  };

  const onRender = () => {
    setReady(true);
  };

  return (
    <div className="container" onScroll={handleScroll}>
      {!ready && (
        <div className="loading">
          {" "}
          <h3>Loading...</h3>
        </div>
      )}
      <div className="canvasContainer">
        <Canvas
          shadows
          camera={{ position: [1, 2.7, 4.7], fov: 30 }}
          color="black"
        >
          <Experience
            position={scrollPosition}
            section={section}
            setSection={setSection}
            onRender={onRender}
          />
        </Canvas>
      </div>
      <div className="icons-container">
        <a
          href="https://wa.me/5491134842303"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon">
            <FaWhatsapp size={20} />
          </div>
          <div className="tooltip">WhatsApp</div>
        </a>
        <a
          href="https://github.com/Mdp88/r3f-personal-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon">
            <FiGithub size={20} />
          </div>
          <div className="tooltip">GitHub</div>
        </a>
        <a
          href="https://www.linkedin.com/in/matiaspanguilto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon">
            <FaLinkedin size={20} />
          </div>
          <div className="tooltip">LinkedIn</div>
        </a>
        <a
          href="assets/Matias Panguilto CV.pdf"
          download={"Matias Panguilto CV"}
        >
          <div className="icon">
            <IoMdDownload size={20} />
          </div>
          <div className="tooltip">Download CV</div>
        </a>
      </div>

      <div className="content">
        <section>
          <div
            className="section-content hello"
            style={{
              opacity: `${100 - scrollPosition * 4}%`,
            }}
          >
            <h1>
              <span id="wave">✋🏼</span>
              Hey There!
            </h1>
            <h2>Welcome to my Portfolio...</h2>
            <h3>
              I'm <span id="name">Matías Panguilto</span>, a software developer
              who loves crafting visually engaging, interactive, and modern UIs.
              I specialize in transforming concepts into polished, user-friendly
              websites. With a proven track record of delivering innovative
              solutions and a passion for staying at the forefront of industry
              trends, I am confident in my ability to contribute effectively to
              your team.
            </h3>
          </div>
          <div
            className="chevron-container"
            onClick={() =>
              experience.current.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              opacity: `${100 - scrollPosition * 4}%`,
            }}
          >
            <h3>more</h3>
            <FaChevronDown className="chevron" size={30} />
          </div>
        </section>
        <section className="experience-container">
          <div
            ref={experience}
            className="section-content experience"
            style={{
              opacity:
                scrollPosition >= 25
                  ? `${100 - (scrollPosition - 50) * 2}%`
                  : `${100 - (50 - scrollPosition) * 2}%`,
            }}
          >
            <h1>Projects</h1>
            <Project
              handleChange={handleChange}
              src={projects[currentSlide].src}
              title={projects[currentSlide].title}
              description={projects[currentSlide].description}
              tech={projects[currentSlide].tech}
              link={projects[currentSlide].link}
            />
          </div>
          <div
            className="chevron-container"
            onClick={() =>
              contact.current.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              opacity:
                scrollPosition >= 25
                  ? `${100 - (scrollPosition - 50) * 2}%`
                  : `${100 - (50 - scrollPosition) * 2}%`,
            }}
          >
            <h3>more</h3>
            <FaChevronDown className="chevron" size={30} />
          </div>
        </section>
        <section ref={contact}>
          <div className="section-content contact">
            <div className="contact-text">
              <h1>Let's Talk!</h1>
              <h2>
                Fill out the form or check out the links in the top-right corner
                of the screen
              </h2>
              <h3>
                Ready to elevate your digital presence? Let's connect and
                discuss how we can bring your ideas to life.
                <br /> Feel free to reach out, your next project is just a call
                away.
              </h3>
            </div>
            <div className="contact-form">
              <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
