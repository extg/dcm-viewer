import React, { Component } from "react";
import { fabric } from "fabric";
import { Grid, Row, Col, Box } from "@smooth-ui/core-sc";
import imgExample from "../BRAINIX.jpg";
import { colors } from "../theme";

// import * as cornerstone from "cornerstone-core";
// // import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
// import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import * as dicomParser from "dicom-parser";
// import * as pako from "pako";


const fabricFilters = fabric.Image.filters;
const f = fabric.Image.filters;

const filterMap = {
  Brightness: {
    type: "range",
    min: "-1",
    max: "1",
    step: "0.003921",
    value: "0",
    create: value =>
      new f.Brightness({
        brightness: parseFloat(value)
      })
  },
  Contrast: {
    type: "range",
    min: "-1",
    max: "1",
    step: "0.003921",
    value: "0",
    create: value =>
      new f.Contrast({
        contrast: parseFloat(value)
      })
  },
  Saturation: {
    type: "range",
    min: "-1",
    max: "1",
    step: "0.003921",
    value: "0",
    create: value =>
      new f.Saturation({
        saturation: parseFloat(value)
      })
  },
  Hue: {
    type: "range",
    min: "-2",
    max: "2",
    step: "0.002",
    value: "0",
    create: value =>
      new f.HueRotation({
        rotation: parseFloat(value)
      })
  },
  Sharpen: {
    type: "checkbox",
    create: () =>
      new f.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
      })
  }
};


const convertFiltersToArray = filtersObj =>
  Object.entries(filtersObj).map(
    ([name, { create, value }]) => value !== false && create(value)
  );

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
  }[name]);

class DicomViewer extends Component {
  state = {
    filters: filterMap
  };

  applyFilter = (index, filter) => {
    let obj = this.canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters();
    this.canvas.renderAll();
  };

  applyFilterValue = (index, prop, value) => {
    var obj = this.canvas.getActiveObject();
    console.log(obj.filters);

    if (obj.filters[index]) {
      // obj.filters[index][prop] = value;
      // var timeStart = +new Date();
      // obj.applyFilters();
      // var timeEnd = +new Date();
      // var dimString = canvas.getActiveObject().width + ' x ' +
      //   canvas.getActiveObject().height;
      // $('bench').innerHTML = dimString + 'px ' +
      //   parseFloat(timeEnd-timeStart) + 'ms';
      // canvas.renderAll();
    }
  };

  filterOnChange = ({ target: { name, value, checked, type } }) => {
    console.log(name, value, checked, type);

    filterMap[name].value = value;

    const obj = this.canvas.getActiveObject();
    if (!obj) return;

    obj.filters = convertFiltersToArray(filterMap);
    obj.applyFilters();
    this.canvas.renderAll();

    this.setState({
      filters: {
        ...this.state.filters,
        [name]: {
          ...this.state.filters[name],
          value: type === "checkbox" ? checked : value
        }
      }
    });
  };

  reset = () => {
    this.setState({
      filters: Object.assign({}, filterMap)
    });
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
    const canvas = new fabric.Canvas("canvas");
    this.canvas = canvas;

    fabric.Image.fromURL(imgExample, function(img) {
      img.scale(0.8);
      canvas.add(img);
    });
    fabric.Image.fromURL(imgExample, function(img) {
      img.scale(0.8);
      img.set({
        opacity: 0.5,
        backgroundColor: "palevioletred"
      });
      canvas.add(img).setActiveObject(img);
    });
  }

  onInputInsert = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    console.log(imageId)
    cornerstone.loadImage(imageId).then(function(image) {
      console.log(image);
    })

    //
    // cornerstone
    //   .loadImage(imageId)
    //   .then(
    //     legitImage =>
    //       console.log(legitImage) ||
    //       fabric.Image.fromObject(legitImage, console.log)
    //   )
    //   .catch(console.error);
  };

  render() {
    console.log("state", this.state);
    return (
      <Grid color={colors.white} p={1}>
        <Row pt={2}>
          <Col sm={10}>
            <canvas width="950" height="800" id="canvas" />
          </Col>
          <Col sm={2}>
            <Box textAlign="left">
              {Object.entries(this.state.filters).map(
                ([name, { create, ...props }]) => (
                  <Grid key={name}>
                    <label htmlFor={name}>{name}</label>
                    <input
                      {...props}
                      name={name}
                      onChange={this.filterOnChange}
                    />
                  </Grid>
                )
              )}
              <br />
              {/*<Button backgroundColor="#61dafb" onClick={this.reset}>*/}
              {/*Reset*/}
              {/*</Button>*/}
            </Box>
          </Col>
          <Col>
            <input type="file" onChange={this.onInputInsert} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DicomViewer;
