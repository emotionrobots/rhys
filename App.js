import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import WhiteGolfer from './components/Three/WhiteGolfer.js'
import Lights from './components/Three/lights.js'
import Sliders from './components/Slider/Sliders.js'
import { OrbitControls } from '@react-three/drei'

function App() {

  const [SliderArr, setSliderArr] = useState([])

  let kp;

  const mapJoints = (keypoints) => {
    kp = keypoints;
  }

  const getJoints = () => {
    return kp;
  }

  return (
    <>
    <div style ={{ background:'#EAEBED'}}>
      <div style={{position: '-webkit-sticky', position: 'fixed', top: 0, left: 0, width:'100%', height:'100%', background:'#EAEBED'}}>
      <Canvas
        colorManagement
        shadowMap
        /* camera={{position: [0,0,3], fov: 60}} */
      >
        <Lights/>
        <Suspense fallback={null}> 
          <mesh position={[4,-2,-1]}>
            <WhiteGolfer mapSliders={SliderArr => setSliderArr(SliderArr)} getJoints={getJoints}/>
          </mesh>
        </Suspense>
        {/* Work on fixing orbit controls */}
        <OrbitControls 
          target0={[4,-2,-1]}
        />
      </Canvas>
      </div>
      <Sliders getSliders={SliderArr} mapJoints={mapJoints}/>
    </div>
    </>
  );
}

export default App;
