import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";

const color = "#FFFFFF"; // Change color to white

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color={color} />
  </mesh>
);

const Star = ({ p }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

function Scene({ numStars = 100 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(0.3));

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />);
  }

  return (
    <>
      <Icosahedron />
      {stars}
    </>
  );
}

export default function ThreeD() {
  return (
    <div className="container">
      <style>
        {`
        body {
          --black: #000000;
          --ash-black: #222;
          --white: #fafafa;
          --sky: #00ccff;
          --green: #22dddd;
          --blue: #1300ff;
          --dusk: #6600ff;
          --purple: #9900ff;
          --pink: #ff0066;
          --red: #fe0222;
          --orange: #fd7702;
          --yellow: #ffbb00;

          --background: var(--yellow);
          --accent: var(--black);

          margin: 0;
          padding: 0;
          background-color: var(--background);
          color: var(--accent);
        }

        * {
          font-family: sofia-pro, sans-serif;
          font-weight: 400;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
        }

        h1,
        h2,
        h3 {
          font-family: sofia-pro, sans-serif;
          font-weight: 600;
          font-style: normal;
        }

        h1 {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 1.2;
          text-align: center;
          margin: 100px 0 40px;
        }

        h2 {
          font-weight: 400;
          margin: 50px 0 10px;
        }

        p {
          margin: 0 0 30px 0;
          font-size: 18px;
        }

        footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 20px;
          background-image: radial-gradient(
            rgba(0, 0, 0, 0) 1px,
            var(--background) 1px
          );
          background-size: 4px 4px;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          -moz-backdrop-filter: blur(3px);
          font-size: 14px;
          line-height: 14px;
        }

        #root {
          height: 500vh;
        }

        footer::before {
          display: block;
          content: "";
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--accent);
          opacity: 0.2;
        }

        footer svg {
          margin-right: 20px;
        }

        footer a {
          text-decoration: none;
          color: var(--accent);
        }

        code {
          font-family: input-mono, monospace;
          font-weight: 400;
          font-style: normal;
        }

        ::-webkit-scrollbar {
          height: 12px;
          width: 5px;
          background: var(--background);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--accent);
          -webkit-border-radius: 1ex;
        }

        ::-webkit-scrollbar-corner {
          background: var(--background);
        }

 

        canvas {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: pixelated;
          image-rendering: optimize-contrast;
        }
        `}
      </style>
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>
    </div>
  );
}
