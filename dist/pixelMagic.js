var pixelMagic =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_cartesian__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cartesian */ "./lib/cartesian.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  cartesian: _lib_cartesian__WEBPACK_IMPORTED_MODULE_0__
});

/***/ }),

/***/ "./lib/cartesian.js":
/*!**************************!*\
  !*** ./lib/cartesian.js ***!
  \**************************/
/*! exports provided: toCartesian, fromCartesian, paintCartesian */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCartesian", function() { return toCartesian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCartesian", function() { return fromCartesian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paintCartesian", function() { return paintCartesian; });
var toCartesian = function toCartesian(canvas, context) {
  var imageSrc = context.getImageData(0, 0, canvas.width, canvas.height);
  var imageData = imageSrc.data; // the data from a canvas object is a one-dimensional Uint8ClampedArray in 4-item sequences: r, g, b and a, all clamped by [0, 255]
  // https://developer.mozilla.org/en-US/docs/Web/API/ImageData

  var pixels = [];

  for (var c = 0; c < imageData.length; c += 4) {
    var x = c / 4 % imageSrc.width;
    var y = Math.floor(c / (4 * imageSrc.width)); // make a new row

    if (pixels.length <= y) {
      pixels.push([]);
    }

    var pixel = {
      r: imageData[c + 0],
      g: imageData[c + 1],
      b: imageData[c + 2],
      a: imageData[c + 3]
    };
    pixels[y].push(pixel);
  }

  return pixels;
};

var fromCartesian = function fromCartesian(pixels) {
  var width = pixels[0].length;
  var height = pixels.length;
  var imageSrc = new ImageData(width, height);
  var imageData = imageSrc.data;

  for (var c = 0; c < imageData.length; c += 4) {
    var x = c / 4 % imageSrc.width;
    var y = Math.floor(c / (4 * imageSrc.width));
    var pixel = pixels[y][x];
    imageData[c + 0] = pixel.r;
    imageData[c + 1] = pixel.g;
    imageData[c + 2] = pixel.b;
    imageData[c + 3] = pixel.a;
  }

  return imageSrc;
};

var paintCartesian = function paintCartesian(canvas, context, pixels) {
  var imageSrc = fromCartesian(pixels);
  console.log(imageSrc);
  context.putImageData(imageSrc, 0, 0);
};



/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXhlbE1hZ2ljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BpeGVsTWFnaWMvLi9pbmRleC5qcyIsIndlYnBhY2s6Ly9waXhlbE1hZ2ljLy4vbGliL2NhcnRlc2lhbi5qcyJdLCJuYW1lcyI6WyJjYXJ0ZXNpYW4iLCJ0b0NhcnRlc2lhbiIsImNhbnZhcyIsImNvbnRleHQiLCJpbWFnZVNyYyIsImdldEltYWdlRGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwiaW1hZ2VEYXRhIiwiZGF0YSIsInBpeGVscyIsImMiLCJsZW5ndGgiLCJ4IiwieSIsIk1hdGgiLCJmbG9vciIsInB1c2giLCJwaXhlbCIsInIiLCJnIiwiYiIsImEiLCJmcm9tQ2FydGVzaWFuIiwiSW1hZ2VEYXRhIiwicGFpbnRDYXJ0ZXNpYW4iLCJjb25zb2xlIiwibG9nIiwicHV0SW1hZ2VEYXRhIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFD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O0FBQ0E7O0FBRUQsU0FBT2xCLFFBQVA7QUFDQSxDQW5CRDs7QUFxQkEsSUFBTXFCLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBU3ZCLE1BQVQsRUFBaUJDLE9BQWpCLEVBQTBCTyxNQUExQixFQUFrQztBQUN4RCxNQUFJTixRQUFRLEdBQUdtQixhQUFhLENBQUNiLE1BQUQsQ0FBNUI7QUFFQWdCLFNBQU8sQ0FBQ0MsR0FBUixDQUFZdkIsUUFBWjtBQUNBRCxTQUFPLENBQUN5QixZQUFSLENBQXFCeEIsUUFBckIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEM7QUFDQSxDQUxEIiwiZmlsZSI6InBpeGVsTWFnaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICogYXMgY2FydGVzaWFuIGZyb20gJy4vbGliL2NhcnRlc2lhbidcblxuZXhwb3J0IGRlZmF1bHQgeyBjYXJ0ZXNpYW4gfTsiLCJjb25zdCB0b0NhcnRlc2lhbiA9IGZ1bmN0aW9uKGNhbnZhcywgY29udGV4dCkge1xuXHRsZXQgaW1hZ2VTcmMgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRsZXQgaW1hZ2VEYXRhID0gaW1hZ2VTcmMuZGF0YTtcblxuXHQvLyB0aGUgZGF0YSBmcm9tIGEgY2FudmFzIG9iamVjdCBpcyBhIG9uZS1kaW1lbnNpb25hbCBVaW50OENsYW1wZWRBcnJheSBpbiA0LWl0ZW0gc2VxdWVuY2VzOiByLCBnLCBiIGFuZCBhLCBhbGwgY2xhbXBlZCBieSBbMCwgMjU1XVxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW1hZ2VEYXRhXG5cblx0bGV0IHBpeGVscyA9IFtdO1xuXG5cdGZvciAobGV0IGMgPSAwOyBjIDwgaW1hZ2VEYXRhLmxlbmd0aDsgYyArPSA0KSB7XG5cdFx0bGV0IHggPSAoYyAvIDQpICUgaW1hZ2VTcmMud2lkdGg7XG5cdFx0bGV0IHkgPSBNYXRoLmZsb29yKGMgLyAoNCAqIGltYWdlU3JjLndpZHRoKSk7XG5cblx0XHQvLyBtYWtlIGEgbmV3IHJvd1xuXHRcdGlmIChwaXhlbHMubGVuZ3RoIDw9IHkpIHtcblx0XHRcdHBpeGVscy5wdXNoKFtdKTtcblx0XHR9XG5cblx0XHR2YXIgcGl4ZWwgPSB7XG5cdFx0XHRyOiBpbWFnZURhdGFbYyswXSxcblx0XHRcdGc6IGltYWdlRGF0YVtjKzFdLFxuXHRcdFx0YjogaW1hZ2VEYXRhW2MrMl0sXG5cdFx0XHRhOiBpbWFnZURhdGFbYyszXVxuXHRcdH07XG5cblx0XHRwaXhlbHNbeV0ucHVzaChwaXhlbCk7XG5cdH1cblxuXHRyZXR1cm4gcGl4ZWxzO1xufVxuXG5jb25zdCBmcm9tQ2FydGVzaWFuID0gZnVuY3Rpb24ocGl4ZWxzKSB7XG5cdGNvbnN0IHdpZHRoID0gcGl4ZWxzWzBdLmxlbmd0aDtcblx0Y29uc3QgaGVpZ2h0ID0gcGl4ZWxzLmxlbmd0aDtcblxuXHRsZXQgaW1hZ2VTcmMgPSBuZXcgSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXHRsZXQgaW1hZ2VEYXRhID0gaW1hZ2VTcmMuZGF0YTtcblxuXHRmb3IgKGxldCBjID0gMDsgYyA8IGltYWdlRGF0YS5sZW5ndGg7IGMgKz0gNCkge1xuXHRcdGxldCB4ID0gKGMgLyA0KSAlIGltYWdlU3JjLndpZHRoO1xuXHRcdGxldCB5ID0gTWF0aC5mbG9vcihjIC8gKDQgKiBpbWFnZVNyYy53aWR0aCkpO1xuXHRcdGxldCBwaXhlbCA9IHBpeGVsc1t5XVt4XTtcblxuXHRcdGltYWdlRGF0YVtjKzBdID0gcGl4ZWwucjtcblx0XHRpbWFnZURhdGFbYysxXSA9IHBpeGVsLmc7XG5cdFx0aW1hZ2VEYXRhW2MrMl0gPSBwaXhlbC5iO1xuXHRcdGltYWdlRGF0YVtjKzNdID0gcGl4ZWwuYTtcblx0fVxuXG5cdHJldHVybiBpbWFnZVNyYztcbn1cblxuY29uc3QgcGFpbnRDYXJ0ZXNpYW4gPSBmdW5jdGlvbihjYW52YXMsIGNvbnRleHQsIHBpeGVscykge1xuXHRsZXQgaW1hZ2VTcmMgPSBmcm9tQ2FydGVzaWFuKHBpeGVscyk7XG5cblx0Y29uc29sZS5sb2coaW1hZ2VTcmMpO1xuXHRjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZVNyYywgMCwgMCk7XG59XG5cbmV4cG9ydCB7IHRvQ2FydGVzaWFuLCBmcm9tQ2FydGVzaWFuLCBwYWludENhcnRlc2lhbiB9XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=