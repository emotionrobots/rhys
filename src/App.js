import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraView from './components/CameraView'
import Model from './components/Three/Model.js'
import WhiteGolfer from './components/Three/WhiteGolfer.js'
import Lights from './components/Three/lights.js'



function App() {
  let kp;

  const mapJoints = (keypoints) => {
    kp = keypoints;
  }

  const getJoints = () => {
    return kp;
  }

  return (
    <>
    <div style={{position:'relative', width:'100%', height:700, backgroundColor:'grey'}}>
      <Canvas
        colorManagement
        shadowMap
        camera={{position: [0,0,2], fov: 60}}
      >
        <Lights/>
        <Suspense fallback={null}> 
          <mesh position={[3,-2,-5]}>
            <WhiteGolfer getJoints={getJoints}/>
          </mesh>
        </Suspense>
      </Canvas>
    </div>
    <CameraView mapJoints={mapJoints}/>
    </>
  );
}

export default App;
