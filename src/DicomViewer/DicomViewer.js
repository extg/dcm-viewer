import React, { Component, Fragment } from "react";
import styled from "styled-components";
import system from "@smooth-ui/system";
import { fabric } from "fabric";
import { Grid, Row, Col, Box, Button } from "@smooth-ui/core-sc";
import imgExample from "../mri-scan-of-the-human-brain.jpg";
import imgSecond from "../BRAINIX.jpg";
import { colors, fonts, media } from "../theme";
import Thumb from "../Thumb";

const fabricFilters = fabric.Image.filters;

const filterMap = {
  Brightness: {
    min: "-1",
    max: "1",
    step: "0.003921"
  },
  Contrast: {
    min: "-1",
    max: "1",
    step: "0.003921"
  },
  Saturation: {
    min: "-1",
    max: "1",
    step: "0.003921"
  },
  Hue: {
    min: "-2",
    max: "2",
    step: "0.002"
  },
  Sharpen: {
    type: "checkbox"
  }
};

const getFiltersValues = (name, value) =>
  console.log("name, value", name, value) ||
  {
    Sharpen: new fabricFilters.Convolute({
      matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1]
    }),
    Saturation: new fabricFilters.Saturation({
      saturation: parseFloat(value)
    }),
    Brightness: new fabricFilters.Brightness({
      brightness: parseFloat(value)
    }),
    Contrast:
      value === true &&
      new fabricFilters.Contrast({
        contrast: parseFloat(value)
      })
  }[name];

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
      filters: Object.entries(filterMap).reduce(
        (acc, [name, val]) => ({
          ...acc,
          [name]: !val.type ? (Number(val.min) + Number(val.max)) / 2 : false
        }),
        {}
      )
    };
  }

  applyFilter = (index, filter) => {
    let obj = this.canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters();
    this.canvas.renderAll();
  };

  filterOnChange = ({ target: { name, value, checked, type } }) => {
    console.log(name, value, checked, type);
    this.setState({
      filters: {
        ...this.state.filters,
        [name]: type === "checkbox" ? checked : Number(value)
      }
    });
  };

  save = () => {
    this.test();
  };

  test = () => {
    const { canvas, state } = this;
    try {
      const obj = canvas.getActiveObject();
      obj.filters = Object.entries(state.filters).map(([name, val]) =>
        getFiltersValues(name, val)
      );
      obj.applyFilters();
      console.log("filters", obj.filters);
      canvas.renderAll();
    } catch (e) {
      console.warn("У вас ошибОчка", e.message);
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
    console.log(filters);
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
              {Object.entries(filters).map(([filter, val]) => (
                <InputGroup>
                  <label htmlFor={filter}>{filter}</label>
                  {!val.type ? (
                    <input
                      type="range"
                      id={filter}
                      name={filter}
                      min="0"
                      max="100"
                      onChange={this.filterOnChange}
                      {...filterMap[filter]}
                      value={filters[filter]}
                    />
                  ) : (
                    <input
                      onChange={this.filterOnChange}
                      type="checkbox"
                      checked={val.value}
                    />
                  )}
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
