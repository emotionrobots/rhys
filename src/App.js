import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import WhiteGolfer from './components/Three/WhiteGolfer.js'
import Lights from './components/Three/lights.js'
import Sliders from './components/Slider/Sliders.js'



function App() {

  const [SliderArr, setSliderArr] = useState([])

/*   const mapSliders = (Sliders) => {
    console.log(Sliders)
    setSliderArr(Sliders)
  } */

  let kp;

  const mapJoints = (keypoints) => {
    kp = keypoints;
  }

  const getJoints = () => {
    return kp;
  }

  return (
    <>
    <div>
      <div style={{position: '-webkit-sticky', position: 'fixed', top: 0, left: 0, width:'100%', height:'100%', background:'#EAEBED'}}>
      <Canvas
        colorManagement
        shadowMap
        camera={{position: [0,0,3], fov: 60}}
      >
        <Lights/>
        <Suspense fallback={null}> 
          <mesh position={[4,-2,-5]}>
            <WhiteGolfer mapSliders={SliderArr => setSliderArr(SliderArr)} getJoints={getJoints}/>
          </mesh>
        </Suspense>
      </Canvas>
      </div>
      <Sliders getSliders={SliderArr} mapJoints={mapJoints}/>
    </div>
    </>
  );
}

export default App;
