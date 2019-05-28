// External Dependencies
import Hammer from "hammerjs";

// Cornerstone Libraries
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import * as dicomParser from 'dicom-parser'

console.log({
  cornerstone,
  cornerstoneMath,
  cornerstoneTools,
  cornerstoneWADOImageLoader,
  dicomParser,
})


// Specify external dependencies
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
/*
const config = {
  touchEnabled: false,
};
const csTools = cornerstoneTools.init(config);
*/

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({
  beforeSend: function(xhr) {
    // Add custom headers here (e.g. auth tokens)
    //xhr.setRequestHeader('x-auth-token', 'my auth token');
  },
  useWebWorkers: true,
});

// If we were using the cornerstoneWADOImageLoader, we could load .dcm files
// The cornerstoneWebImageLoader supports loading and displaying .jpg and .png files
// const exampleImageId = 'path/to/example-image.jpg'
// const canvas = document.querySelector('#cornerstone')
const input = document.getElementById('selectFile')

console.log({input})

// Injects cornerstone "enabled" canvas into DOM
const element = document.getElementById('dicomImage');
cornerstone.enable(element);

input.addEventListener('change', function(e) {
  console.log({e})
  // Add the file to the cornerstoneFileImageLoader and get unique
  // number for that file
  const file = e.target.files[0];
  console.log({file})
  const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
  console.log({imageId})
  loadAndViewImage(imageId);
});

/*
// Load & Display
cornerstone
  .loadImage(exampleImageId)
  .then(function (image) {

    // Now that we've "loaded" the image, we can display it on
    // our Cornerstone enabled canvas of choice
    cornerstone.displayImage(canvas, image)

    // We need to enable each way we'd like to be able to receive
    // and respond to input (mouse, touch, scrollwheel, etc.)
    cornerstoneTools.mouseInput.enable(canvas)
    cornerstoneTools.touchInput.enable(canvas)

    // Activate mouse tools we'd like to use
    cornerstoneTools.wwwc.activate(canvas, 1) // left click
    cornerstoneTools.pan.activate(canvas, 2) // middle click
    cornerstoneTools.zoom.activate(canvas, 4) // right click

    // Activate Touch / Gesture tools we'd like to use
    cornerstoneTools.wwwcTouchDrag.activate(canvas) // - Drag
    cornerstoneTools.zoomTouchPinch.activate(canvas) // - Pinch
    cornerstoneTools.panMultiTouch.activate(canvas) // - Multi (x2)
  })
*/

function loadAndViewImage(imageId) {
  const element = document.getElementById('dicomImage');
  const start = new Date().getTime();
  cornerstone.loadImage(imageId).then(function(image) {
    console.log(image);
    /*
    const viewport = cornerstone.getDefaultViewportForImage(element, image);
    document.getElementById('toggleModalityLUT').checked = (viewport.modalityLUT !== undefined);
    document.getElementById('toggleVOILUT').checked = (viewport.voiLUT !== undefined);
    cornerstone.displayImage(element, image, viewport);
    if(loaded === false) {
      cornerstoneTools.mouseInput.enable(element);
      cornerstoneTools.mouseWheelInput.enable(element);
      cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
      cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
      cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
      cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

      cornerstoneTools.imageStats.enable(element);
      loaded = true;
    }

    function getTransferSyntax() {
      const value = image.data.string('x00020010');
      return value + ' [' + uids[value] + ']';
    }

    function getSopClass() {
      const value = image.data.string('x00080016');
      return value + ' [' + uids[value] + ']';
    }

    function getPixelRepresentation() {
      const value = image.data.uint16('x00280103');
      if(value === undefined) {
        return;
      }
      return value + (value === 0 ? ' (unsigned)' : ' (signed)');
    }

    function getPlanarConfiguration() {
      const value = image.data.uint16('x00280006');
      if(value === undefined) {
        return;
      }
      return value + (value === 0 ? ' (pixel)' : ' (plane)');
    }

    document.getElementById('transferSyntax').textContent = getTransferSyntax();
    document.getElementById('sopClass').textContent = getSopClass();
    document.getElementById('samplesPerPixel').textContent = image.data.uint16('x00280002');
    document.getElementById('photometricInterpretation').textContent = image.data.string('x00280004');
    document.getElementById('numberOfFrames').textContent = image.data.string('x00280008');
    document.getElementById('planarConfiguration').textContent = getPlanarConfiguration();
    document.getElementById('rows').textContent = image.data.uint16('x00280010');
    document.getElementById('columns').textContent = image.data.uint16('x00280011');
    document.getElementById('pixelSpacing').textContent = image.data.string('x00280030');
    document.getElementById('bitsAllocated').textContent = image.data.uint16('x00280100');
    document.getElementById('bitsStored').textContent = image.data.uint16('x00280101');
    document.getElementById('highBit').textContent = image.data.uint16('x00280102');
    document.getElementById('pixelRepresentation').textContent = getPixelRepresentation();
    document.getElementById('windowCenter').textContent = image.data.string('x00281050');
    document.getElementById('windowWidth').textContent = image.data.string('x00281051');
    document.getElementById('rescaleIntercept').textContent = image.data.string('x00281052');
    document.getElementById('rescaleSlope').textContent = image.data.string('x00281053');
    document.getElementById('basicOffsetTable').textContent = image.data.elements.x7fe00010 && image.data.elements.x7fe00010.basicOffsetTable ? image.data.elements.x7fe00010.basicOffsetTable.length : '';
    document.getElementById('fragments').textContent = image.data.elements.x7fe00010 && image.data.elements.x7fe00010.fragments ? image.data.elements.x7fe00010.fragments.length : '';
    document.getElementById('minStoredPixelValue').textContent = image.minPixelValue;
    document.getElementById('maxStoredPixelValue').textContent = image.maxPixelValue;
    const end = new Date().getTime();
    const time = end - start;
    document.getElementById('totalTime').textContent = time + "ms";
    document.getElementById('loadTime').textContent = image.loadTimeInMS + "ms";
    document.getElementById('decodeTime').textContent = image.decodeTimeInMS + "ms";
    */
  }, function(err) {
    alert(err);
  });
}
