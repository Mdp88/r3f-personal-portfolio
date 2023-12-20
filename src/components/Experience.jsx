import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Sphere,
  useTexture,
  Icosahedron,
} from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from "leva";
import { Chair } from "./Chair";
import { Desk } from "./Desk";
import { useEffect, useRef, useState, useCallback } from "react";
import { MathUtils } from "three";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { debounce } from "lodash";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export const Experience = ({ position, section, setSection, onRender }) => {
  const { camera, intersect } = useThree();
  const group = useRef();
  const sky = useRef();
  const wire = useRef();
  const [width, setWidth] = useState(window.innerWidth);

  const colorMap = useTexture("assets/seamlessNight.jpg");
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;

  colorMap.repeat.set(5, 5);

  const [animation, setAnimation] = useState("Idle");
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    onRender();
    camera.position.y = 2;
    camera.position.z = 2.3;
    camera.lookAt(0, 1.3, 2);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      removeEventListener("resize");
    };
  }, []);

  useEffect(() => {
    if (position <= 25) {
      debouncedSection(0);
    } else if (position > 25 && position <= 75) {
      debouncedSection(1);
    } else {
      debouncedSection(2);
    }
  }, [position]);

  useEffect(() => {
    switch (section) {
      case 0:
        setAnimation("Idle");
        gsap.to(camera.position, {
          y: 2,
          x: 1,
          z: 2.3,
          duration: 1,
          onUpdate: () => {
            camera.lookAt(0, 1.3, 0);
          },
        });
        gsap.to(group.current.rotation, {
          y: MathUtils.degToRad(0),
          duration: 1,
          onComplete: () => {
            setFollow(true);
          },
        });
        gsap.to(group.current.position, {
          y: 0,
          x: width >= 900 ? 0.7 : 0,
          duration: 1,
        });

        break;
      case 1:
        setAnimation("Typing");
        setFollow(false);
        gsap.to(camera.position, {
          z: width >= 900 ? 2 : 3,
          x: width >= 900 ? 3 : 4,
          y: 1.3,
          duration: 1,
          onUpdate: () => {
            camera.lookAt(0, 1.3, 0);
          },
        });
        gsap.to(group.current.rotation, {
          y: MathUtils.degToRad(0),
          duration: 1,
        });
        gsap.to(group.current.position, {
          y: 0.3,
          x: 1,
          duration: 1,
        });

        break;

      case 2:
        setAnimation("Talking");
        setFollow(false);

        gsap.to(camera.position, {
          z: 2.3,
          x: 0,
          y: 2,
          duration: 1,
          onUpdate: () => {
            camera.lookAt(0, 1.3, 0);
          },
        });
        gsap.to(group.current.rotation, {
          y: MathUtils.degToRad(0),
          duration: 1,
        });
        gsap.to(group.current.position, {
          y: 0,
          x: 0,
          duration: 1,
        });

        break;

      // default:
      //   setAnimation("Idle");
      //   setFollow(false);

      //   gsap.to(camera.position, {
      //     y: 2,
      //     z: 2.3,
      //     duration: 3,
      //     onUpdate: () => {
      //       camera.lookAt(0, 1.3, 0);
      //     },
      //   });
      //   break;
    }
  }, [section, width]);

  const debouncedSection = useCallback((value) => changeSection(value), []);

  const changeSection = debounce((value) => {
    setSection(value);
  }, 500);

  useFrame(() => {
    // sky.current.rotation.y += 0.0002;
    wire.current.rotation.y -= 0.0001;
    wire.current.rotation.z += 0.0002;
  });

  return (
    <>
      <PerspectiveCamera />
      <Environment preset="apartment" />
      <Sphere ref={sky} scale={[30, 30, 30]}>
        <meshStandardMaterial side={THREE.BackSide} color="black" />
      </Sphere>
      {/* <Sphere ref={wire} scale={[29, 29, 29]}> */}
      <mesh ref={wire} scale={[29, 29, 29]}>
        <icosahedronGeometry args={[1, 5]} />
        <meshStandardMaterial wireframe side={THREE.BackSide} color="#1E90FF" />
      </mesh>
      {/* </Sphere> */}
      <group ref={group}>
        <Avatar animation={animation} follow={follow} />
        <Chair animation={animation} />
        <Desk animation={animation} />
      </group>
    </>
  );
};
