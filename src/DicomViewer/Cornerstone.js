import React, {Component} from 'react'
import Hammer from "hammerjs";
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import * as dicomParser from 'dicom-parser'
import DicomViewer from './DicomViewer'

/*
// Тут можно посмотреть АПИ :)
console.log({
  cornerstone,
  cornerstoneMath,
  cornerstoneTools,
  cornerstoneWADOImageLoader,
  dicomParser,
})
*/

// Specify external dependencies
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({
  beforeSend: function(xhr) {
    // Add custom headers here (e.g. auth tokens)
    //xhr.setRequestHeader('x-auth-token', 'my auth token');
  },
  useWebWorkers: true,
});

const loadImage = file => cornerstone.loadImage(
  cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
)

class Cornerstone extends Component {
  loaded = false;
  state = { image: null }
  constructor(props) {
    super(props)

    this.element = React.createRef();
  }

  componentDidMount() {
    cornerstone.enable(this.element.current);
  }

  onInputInsert = e => {
    e.preventDefault();

    loadImage(e.target.files[0]).then((image) => {
      console.log(image);
      const viewport = cornerstone.getDefaultViewportForImage(this.element.current, image);
      this.setState({image})
      cornerstone.displayImage(this.element.current, image, viewport);
      if(this.loaded === false) {
        // cornerstoneTools.mouseInput.enable(this.element.current);
        // cornerstoneTools.mouseWheelInput.enable(this.element.current);
        // cornerstoneTools.wwwc.activate(this.element.current, 1); // ww/wc is the default tool for left mouse button
        // cornerstoneTools.pan.activate(this.element.current, 2); // pan is the default tool for middle mouse button
        // cornerstoneTools.zoom.activate(this.element.current, 4); // zoom is the default tool for right mouse button
        // cornerstoneTools.zoomWheel.activate(this.element.current); // zoom is the default tool for middle mouse wheel
        //
        // cornerstoneTools.imageStats.enable(this.element.current);
        this.loaded = true;
      }
    })
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.onInputInsert} />
        <DicomViewer image={this.state.image}/>
        <div ref={this.element}></div>
      </div>
    );
  }
}

export default Cornerstone
