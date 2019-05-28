// External Dependencies
import Hammer from "hammerjs";

// Cornerstone Libraries
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import * as dicomParser from 'dicom-parser'

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

const input = document.getElementById('selectFile')

console.log({input})

// Injects cornerstone "enabled" canvas into DOM
const element = document.getElementById('dicomImage');
cornerstone.enable(element);

export const loadImage = file => cornerstone.loadImage(
  cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
)
