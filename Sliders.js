import React, { useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'
import TypographyUI from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function Sliders({ getSliders, mapJoints }){

    const [value, setValue] = useState(getSliders)

    useEffect(() => {
        setValue(getSliders)
    }, [getSliders])

    const handleChangeCommitedX = (index, event, newValue) => {
        let i = index

        let temp_props = [...value]

        if(newValue)
        temp_props[i].rotation.x = newValue

        setValue(temp_props)
        mapJoints(temp_props)
    }

    const handleChangeCommitedY = (index, event, newValue) => {
        let i = index

        let temp_props = [...value]

        if(newValue)
        temp_props[i].rotation.y = newValue

        setValue(temp_props)
        mapJoints(temp_props)
    }

    const handleChangeCommitedZ = (index, event, newValue) => {
        let i = index

        let temp_props = [...value]

        if(newValue)
        temp_props[i].rotation.z = newValue

        setValue(temp_props)
        mapJoints(temp_props)
    }

    const ConsoleClick = () => {
        value.map((bone, index) => (
            console.table([index, bone.name, bone.rotation.x, bone.rotation.y, bone.rotation.z])
        ))
    }

    const HomeClick = () => {
        window.location.reload()
    }

    const SetZeroClick = () => {
        let dataX = value.map((bone) =>(bone.rotation.x))
        let dataY = value.map((bone) =>(bone.rotation.y))
        let dataZ = value.map((bone) =>(bone.rotation.z))
        
        localStorage.clear()
        
        localStorage.setItem('DataX', JSON.stringify(dataX))
        localStorage.setItem('DataY', JSON.stringify(dataY))
        localStorage.setItem('DataZ', JSON.stringify(dataZ))
    }

    const GoZeroClick = () => {
        let temp_props = [...value]
        const dataX = JSON.parse(localStorage.getItem('DataX'))
        const dataY = JSON.parse(localStorage.getItem('DataY'))
        const dataZ = JSON.parse(localStorage.getItem('DataZ'))

        temp_props.map((bone, index) => {
            bone.rotation.x = dataX[index]
            bone.rotation.y = dataY[index]
            bone.rotation.z = dataZ[index]
        })

/*         temp_props.rotation.x = JSON.parse(dataX)
        temp_props.rotation.y = JSON.parse(dataY)
        temp_props.rotation.z = JSON.parse(dataZ) */

        setValue(temp_props)
    }

    return value && (
        <div style={{position:'absolute', top:10, left:10, background:'white', padding: 10, borderRadius:15, width:'50%'}}>
            {/* Reset, Set, Home Buttons */}
            <Button variant='contained' color='default' style={{marginRight:10}} onClick={HomeClick}>Home</Button>
            <Button variant='contained' color='secondary' style={{marginRight:10}} onClick={SetZeroClick}>Set 0</Button>
            <Button variant='contained' color='default' style={{marginRight:10}} onClick={GoZeroClick}>Go 0</Button>
            
            <Button color='primary' variant='contained' onClick={ConsoleClick}>Console Angles</Button>
            {value.map((slider,index) => (
                <div style={{padding:10}} key={index}>
                    <h4>{slider.name}</h4>
                    <Grid container spacing={3}>
        
                        <Grid item xs>X</Grid>
                        <Grid item xs>Y</Grid>
                        <Grid item xs>Z</Grid>
        
                    </Grid>
        
                    <Grid container spacing={3}>
        
                        <Grid item xs>
                            {slider.rotation.x}
                            <Slider
                                min={-10}
                                max={10}
                                step={.001}

                                defaultValue={value[index].rotation.x}
                                value={value[index].rotation.x}

                                onChange={handleChangeCommitedX.bind(null, index)}

                            />
                        </Grid>
        
                        <Grid item xs>
                            {slider.rotation.y}
                            <Slider
                                min={-10}
                                max={10}
                                step={.001}

                                defaultValue={value[index].rotation.y}
                                value={value[index].rotation.y}

                                onChange={handleChangeCommitedY.bind(null, index)}
                            />
                        </Grid>
        
                        <Grid item xs>
                            {slider.rotation.z}
                            <Slider
                                min={-10}
                                max={10}
                                step={.001}

                                defaultValue={value[index].rotation.z}
                                value={value[index].rotation.z}

                                onChange={handleChangeCommitedZ.bind(null, index)}
                            />
                        </Grid>
        
                    </Grid>
                </div>
            ))}
        </div>
    )
}

export default Sliders
