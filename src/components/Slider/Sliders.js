import React, { useEffect, useState } from 'react'
import Slider from '@material-ui/core/Slider'
import TypographyUI from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

function Sliders({ getSliders, mapJoints }){

    const [value, setValue] = useState(getSliders)

    useEffect(() => {
        setValue(getSliders)
    }, [getSliders])

/*     var mark = {};
    var marks = [];

    value.map((slider, index) =>{
        marks[index].rotation.x = slider[index].rotation.x
        marks[index].rotation.y = slider[index].rotation.y
        marks[index].rotation.z = slider[index].rotation.z
    }) */

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

    return value && (
        <div style={{position:'absolute', top:10, left:10, background:'white', padding: 10, borderRadius:15, width:'50%'}}>
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
