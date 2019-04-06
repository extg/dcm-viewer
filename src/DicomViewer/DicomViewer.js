import React, { Component, Fragment } from "react";
import styled from "styled-components";
import system from "@smooth-ui/system";
import { fabric } from "fabric";
import { Grid, Row, Col, Box, Button } from "@smooth-ui/core-sc";
import imgExample from "../mri-scan-of-the-human-brain.jpg";
import imgSecond from "../BRAINIX.jpg";
import { colors, fonts, media } from "../theme";
import Thumb from "../Thumb";

const Image = styled.img(
  system({
    // display: 'none'
    width: "100%",
    minHeight: "calc(100% - 147px)",
    boxShadow: "0px -2px 35px -5px rgba(0,0,0,0.75)",
    objectFit: "cover"
  })
);

const Canvas = styled.canvas(
  system({
    width: "100%",
    boxShadow: "0px -2px 35px -5px rgba(0,0,0,0.75)"
  })
);

const $ = id => document.getElementById(id);

const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const InputGroup = ({ children }) => {
  return <Grid>{children}</Grid>;
};

class DicomViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        brightness: 50,
        contrast: 50,
        grayscale: 0,
        invert: 0
      }
    };
  }

  applyFilter = (index, filter) => {
    let obj = this.canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters();
    this.canvas.renderAll();
  };

  filterOnChange = ({ target: { name, value } }) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    });

    this.applyFilterValue(name, value);
  };

  save = () => {
    console.log(this.state.filters);
    this.test();
  };

  test = () => {
    try {
      const obj = this.canvas.getActiveObject();
      const filter = new fabric.Image.filters.Brightness({
        brightness: 0.4
      });
      obj.filters[0] = filter;
      obj.applyFilters();
      this.canvas.renderAll();
    } catch (e) {
      console.log(e.message);
    }
  };

  loadImage = (src, callback = img => this.canvas.add(new fabric.Image(img))) =>
    fabric.util.loadImage(src, callback, this, "Anonymous");

  componentDidMount() {
    this.canvas = new fabric.Canvas("canvas");
    this.loadImage(imgExample);
    this.loadImage(imgSecond, img =>
      this.canvas.add(
        new fabric.Image(img).set({
          opacity: 0.5,
          backgroundColor: "palevioletred"
        })
      )
    );
  }

  render() {
    const { filters } = this.state;

    return (
      <Grid color={colors.white} p={1}>
        <Button backgroundColor="#61dafb" onClick={this.save}>
          Save
        </Button>
        <Row pt={2}>
          <Col sm={10}>
            <canvas width="950" height="800" id="canvas" />
          </Col>
          <Col sm={2}>
            <Box textAlign="left">
              {Object.keys(filters).map(filter => (
                <InputGroup>
                  <label htmlFor={filter}>{filter}</label>
                  <input
                    type="range"
                    id={filter}
                    name={filter}
                    min="0"
                    max="100"
                    onChange={this.filterOnChange}
                    value={filters[filter]}
                  />
                </InputGroup>
              ))}
            </Box>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DicomViewer;
