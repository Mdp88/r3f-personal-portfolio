import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { IoHandLeftOutline } from "react-icons/io5";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [section, setSection] = useState(0);

  const handleScroll = (e) => {
    // console.log(e);
    const position = e.target.scrollTop;
    const h =
      (100 / (e.target.scrollHeight - e.target.offsetHeight)) * position;
    // console.log(h);
    setScrollPosition(Math.round(h));
    console.log(Math.round(h));
  };

  return (
    <div className="container" onScroll={handleScroll}>
      <div className="canvasContainer">
        <Canvas
          shadows
          camera={{ position: [1, 2.7, 4.7], fov: 30 }}
          color="black"
        >
          <color attach="background" args={["#ececec"]} />
          <Experience
            position={scrollPosition}
            section={section}
            setSection={setSection}
          />
        </Canvas>
      </div>
      <div className="content">
        <section>
          <div
            className="section-content hello"
            style={{
              opacity: `${100 - scrollPosition * 8}%`,
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
        </section>
        <section>
          <div
            className="section-content experience"
            style={{
              opacity:
                scrollPosition >= 33
                  ? `${100 - (scrollPosition - 33) * 8}%`
                  : `${100 - (33 - scrollPosition) * 8}%`,
            }}
          >
            <h1>
              <span id="experience">📝</span>Experience
            </h1>
            <h3>
              I'm <span id="name">Matías Panguilto</span>, a software developer
              with a passion for crafting seamless digital experiences that
              blend elegance with functionality. I specialize in turning
              concepts into polished, user-friendly websites.
            </h3>
          </div>
        </section>
        <section>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            dicta deleniti temporibus, corporis officiis commodi quas pariatur
            molestiae inventore quisquam eveniet impedit numquam perferendis
            sapiente sed nulla vel facere quasi!
          </h1>
        </section>
        <section>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            dicta deleniti temporibus, corporis officiis commodi quas pariatur
            molestiae inventore quisquam eveniet impedit numquam perferendis
            sapiente sed nulla vel facere quasi!
          </h1>
        </section>
      </div>
    </div>
  );
}

export default App;
