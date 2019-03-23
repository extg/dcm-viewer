import React from 'react'
import styled from 'styled-components'
import system from '@smooth-ui/system'
import { Grid, Row, Col, Box } from '@smooth-ui/core-sc'

import {colors, fonts, media} from '../theme';


const Image = styled.img(
  system({
    width: '100%',
    boxShadow: '0px -2px 35px -5px rgba(0,0,0,0.75)',
  }),
)

const DicomViewer = () => (
  <Grid color={colors.white} p={1}>
    <Row pt={2}>
      <Col sm={10}>
        <Image src="./mri-scan-of-the-human-brain.jpg" alt=""/>
      </Col>
      <Col sm={2}>
        <Box textAlign='left'>
          Filters
        </Box>
      </Col>
    </Row>
  </Grid>
)

export default DicomViewer
