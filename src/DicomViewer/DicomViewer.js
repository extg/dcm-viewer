import React, { Component } from "react";
import { fabric } from "fabric";
import { Grid, Row, Col, Box, Button } from "@smooth-ui/core-sc";
import imgExample from "../BRAINIX.jpg";
import { colors } from "../theme";

const fabricFilters = fabric.Image.filters;

const filterMap = {
  Brightness: {
    type: 'range',
    min: "-1",
    max: "1",
    step: "0.003921",
    value: '0',
  },
  Contrast: {
    type: 'range',
    min: "-1",
    max: "1",
    step: "0.003921",
    value: '0',
  },
  Saturation: {
    type: 'range',
    min: "-1",
    max: "1",
    step: "0.003921",
    value: '0',
  },
  Hue: {
    type: 'range',
    min: "-2",
    max: "2",
    step: "0.002",
    value: '0',
  },
  Sharpen: {
    type: "checkbox"
  }
};

const getFiltersValues = (name, value) =>
  ({
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
  })[name];

class DicomViewer extends Component {
  state = {
    filters: filterMap,
  }

  applyFilter = (index, filter) => {
    let obj = this.canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters();
    this.canvas.renderAll();
  };

  filterOnChange = ({ target: { name, value, checked, type } }) => {
    console.log(name, value, checked, type);
    // this.setState({
    //   filters: {
    //     ...this.state.filters,
    //     [name]: type === "checkbox" ? checked : Number(value)
    //   }
    // });
  };

  save = () => {
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

  componentDidMount() {
    this.canvas = new fabric.Canvas("canvas");

    fabric.util.loadImage(imgExample, img => this.canvas.add(new fabric.Image(img)), this, "Anonymous");
    fabric.util.loadImage(imgExample, img => this.canvas.add(
      new fabric.Image(img).set({
        opacity: 0.5,
        backgroundColor: "palevioletred"
      })
    ), this, "Anonymous");
  }

  render() {
    return (
      <Grid color={colors.white} p={1}>
        <Row pt={2}>
          <Col sm={10}>
            <canvas width="950" height="800" id="canvas" />
          </Col>
          <Col sm={2}>
            <Box textAlign="left">
              {Object.entries(filterMap).map(([name, props]) => (
                <Grid key={name}>
                  <label htmlFor={name}>{name}</label>
                  <input
                    {...props}
                    name={name}
                    onChange={this.filterOnChange}
                  />
                </Grid>
              ))}
              <br/>
              <Button backgroundColor="#61dafb" onClick={this.save}>
                Apply
              </Button>
            </Box>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DicomViewer;
