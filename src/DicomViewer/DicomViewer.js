import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import system from '@smooth-ui/system'
import { fabric } from 'fabric'
import { Grid, Row, Col, Box } from '@smooth-ui/core-sc'

import {colors, fonts, media} from '../theme';
import Thumb from '../Thumb'

const Image = styled.img(
  system({
    // display: 'none'
    width: '100%',
    minHeight: 'calc(100% - 147px)',
    boxShadow: '0px -2px 35px -5px rgba(0,0,0,0.75)',
    objectFit: 'cover',
  }),
)



const Canvas = styled.canvas(
  system({
    width: '100%',
    boxShadow: '0px -2px 35px -5px rgba(0,0,0,0.75)',
  }),
)

const $ = id => document.getElementById(id);

const filters = [
  'Brightness',
  'Contrast',
  'Convolute',
  'BlendColor',
  'BlendImage',
  'Gamma',
  'Grayscale',
  // 'HueRotation',
  'Invert',
  'Noise',
  // 'Pixelate',
  // 'RemoveColor',
]

const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const InputGroup = ({children}) => {
  return (
    <Grid>
      {children}
    </Grid>
  )
}

class DicomViewer extends Component {
  componentDidMount() {

    // TODO: нормально отображать canvas
    return
    const canvas = new fabric.StaticCanvas(this.canvas);
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

    canvas.setDimensions({
      width: '100%',
      height: 'auto',
    }, {cssOnly: true})

    // var rect = new fabric.Image(this.image, {
    //   top: 0,
    //   left: 0,
    //   width: '600',
    //   height: '400'
    // });

    // fabricCanvas.add(rect).setActiveObject(rect);

    fabric.Image.fromURL('./mri-scan-of-the-human-brain.jpg', img =>
      canvas.add(img.set({ left: 0, top: 0 }).scaleToWidth(500) )
    );

  }

  render() {
    return (
      <Grid color={colors.white} p={1}>
        <Row pt={2}>
          <Col sm={10}>
            {/*<Image ref={el => this.image = el} src="./mri-scan-of-the-human-brain.jpg" alt=""/>*/}
            <Thumb ref={el => this.image = el} src="./mri-scan-of-the-human-brain.jpg" alt=""/>
            {/*<Canvas ref={el => this.canvas = el} id='canvas'/>*/}
          </Col>
          <Col sm={2}>
            <Box textAlign='left'>
              {filters.map(filter => (
                <InputGroup>
                  <label htmlFor={filter}>{filter}</label>
                  <input type="range" id={filter} name={filter} min="0" max="100" value={rand(10, 90)}/>
                </InputGroup>
              ))}
            </Box>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DicomViewer
