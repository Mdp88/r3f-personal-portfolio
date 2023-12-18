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

export const Experience = ({ position, section, setSection }) => {
  const { camera, intersect } = useThree();
  const group = useRef();
  const sky = useRef();
  const wire = useRef();

  const colorMap = useTexture("assets/seamlessNight.jpg");
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;

  colorMap.repeat.set(5, 5);

  const [animation, setAnimation] = useState("Idle");
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    camera.position.y = 2;
    camera.position.z = 2.3;
    camera.lookAt(0, 1.3, 2);
  }, []);

  useEffect(() => {
    if (position <= 16.5) {
      debouncedSection(0);
    } else if (position > 16.5 && position <= 50) {
      debouncedSection(1);
    } else if (position > 50 && position <= 83.5) {
      debouncedSection(2);
    } else {
      debouncedSection(3);
    }
  }, [position]);

  useEffect(() => {
    console.log(section);
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
          duration: 3,
          onComplete: () => {
            setFollow(true);
          },
        });
        gsap.to(group.current.position, {
          y: 0,
          x: 0.7,
          duration: 3,
        });

        break;
      case 1:
        setAnimation("Typing");
        setFollow(false);
        gsap.to(camera.position, {
          z: 1,
          x: 2,
          y: 1.3,
          duration: 1,
          onUpdate: () => {
            camera.lookAt(0, 1.3, 0);
          },
        });
        gsap.to(group.current.rotation, {
          y: MathUtils.degToRad(0),
          duration: 3,
        });
        gsap.to(group.current.position, {
          y: 0.3,
          x: 1,
          duration: 3,
        });

        break;
      case 2:
        setAnimation("Typing");
        setFollow(false);

        gsap.to(camera.position, {
          z: 6,
          x: 0,
          duration: 3,
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
          x: 0,
          duration: 3,
        });

        break;
      case 3:
        setAnimation("Talking");
        setFollow(false);

        gsap.to(camera.position, {
          z: 1.5,
          duration: 3,
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
          x: 0,
          duration: 1,
        });

        break;

      default:
        setAnimation("Idle");
        setFollow(false);

        gsap.to(camera.position, {
          y: 2,
          z: 2.3,
          duration: 3,
          onUpdate: () => {
            camera.lookAt(0, 1.3, 0);
          },
        });
        break;
    }
  }, [section]);

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
