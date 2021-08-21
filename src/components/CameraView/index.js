import React, { useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'
import { drawKeypoints, drawSkeleton } from '../utilities'

const CameraView = (props) => {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)

    const style = {
        position: 'absolute',
        marginLeft: 'auto', 
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9,
        width: 475,
        height: 250
    }

    const runPosenet = async () =>{
        const net = await posenet.load({
            inputResolution:{width:640, height:480},
            scale:0.75
        })
        
        setInterval(() =>{
            detect(net)
        }, 100)
    }

    const detect = async (net) =>{
        if(typeof webcamRef.current !== 'undefined' &&
         webcamRef.current !== null && 
         webcamRef.current.video.readyState===4) {
            //get video properties
            const video = webcamRef.current.video
            const videoWidth = webcamRef.current.video.videoWidth
            const videoHeight = webcamRef.current.video.videoHeight

            //set video width & height
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight

            //make detections
            const pose = await net.estimateSinglePose(video)
            /* console.log(pose) */

            drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
        }
    }

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) =>{
        if(pose.score > 0){
            const keypoints = pose.keypoints;
            props.mapJoints(keypoints)
        }
        const ctx = canvas.current.getContext('2d')
        canvas.current.width = videoWidth
        canvas.current.height = videoHeight

        drawKeypoints(pose['keypoints'], 0.5, ctx)
        drawSkeleton(pose['keypoints'], 0.5, ctx)
    }

    runPosenet()

    /* const runPosenet = async () => {
        const net = await posenet.load()
        console.log('Posenet loaded')
        setInterval(()=>{
            detect(net)
        }, 100)
    }

    const drawPose = (predictions, canvas) => {
        if(predictions.score > 0){
            const keypoints = predictions.keypoints;
            //console.log(keypoints)
            props.mapJoints(keypoints)
            keypoints.forEach((point)=>{
                const x = point.position.x
                const y = point.position.y
                canvas.beginPath();
                canvas.arc(x, y, 5, 0, 3 * Math.PI);
                canvas.fillStyle = "Indigo";
                canvas.fill();
            })
        }
    }

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null && 
            webcamRef.current.video.readyState === 4
        ){
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const pose = await net.estimateSinglePose(video);
            drawPose(pose, canvasRef.current.getContext("2d"))
        }
    }

    runPosenet() */

    return (
        <div>
            <Webcam ref={webcamRef} style={style} />
            <canvas ref={canvasRef} style={style} />
        </div>
    )
}

export default CameraView