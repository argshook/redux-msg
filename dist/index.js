(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reduxMsg"] = factory();
	else
		root["reduxMsg"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'MESSAGE';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelectors = exports.mergeReducers = exports.createMessagesReducer = exports.createMessage = exports.createReducer = undefined;

var _createReducer2 = __webpack_require__(2);

var _createReducer3 = _interopRequireDefault(_createReducer2);

var _createMessage2 = __webpack_require__(3);

var _createMessage3 = _interopRequireDefault(_createMessage2);

var _createMessagesReducer2 = __webpack_require__(4);

var _createMessagesReducer3 = _interopRequireDefault(_createMessagesReducer2);

var _mergeReducers2 = __webpack_require__(5);

var _mergeReducers3 = _interopRequireDefault(_mergeReducers2);

var _createSelectors2 = __webpack_require__(6);

var _createSelectors3 = _interopRequireDefault(_createSelectors2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createReducer = _createReducer3.default;
exports.createMessage = _createMessage3.default;
exports.createMessagesReducer = _createMessagesReducer3.default;
exports.mergeReducers = _mergeReducers3.default;
exports.createSelectors = _createSelectors3.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
  * type Derivations = {
  *   ...([ACTION_TYPE]: (state, action) -> state)
  * }
  */

// createReducer : INITIAL_STATE -> Derivations -> (state, action) -> state
exports.default = function (initialState) {
  return function () {
    var derivations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments[1];
      return (derivations[action.type] || function () {
        return state;
      })(state, action);
    };
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _messageType = __webpack_require__(0);

var _messageType2 = _interopRequireDefault(_messageType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (stateName) {
  return function (message) {
    return { type: _messageType2.default, stateName: stateName, message: message };
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _messageType = __webpack_require__(0);

var _messageType2 = _interopRequireDefault(_messageType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// createMessagesReducer : STATE_NAME -> INITIAL_STATE -> (state, action) -> state
exports.default = function (stateName) {
  return function (initialState) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments[1];
      return action.type === _messageType2.default && action.stateName === stateName ? action.message(state) : state;
    };
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// give many reducers, get one.
// reducers will be called in order they are given to mergeReducers

// mergeReducers : ...((state, action) -> state) -> (state, action) -> state
exports.default = function () {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  return reducers.reduceRight(function (mergedReducers, reducer) {
    return function (state, action) {
      return mergedReducers(reducer(state, action), action);
    };
  }, function (i) {
    return i;
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// createSelectors : (NAME, INITIAL_STATE) => ({ INITIAL_STATE.key: (state -> value) })
exports.default = function (name) {
  return function (initialState) {
    return Object.keys(initialState).reduce(function (selectors, key) {
      selectors[key] = function (state) {
        return state[name][key];
      };
      return selectors;
    }, {});
  };
};

/***/ })
/******/ ]);
});