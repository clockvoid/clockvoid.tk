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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Field = __webpack_require__(1);
var View = __webpack_require__(2);
var Event = __webpack_require__(3);
window.onload = function () {
    var size = 8;
    var view = new View.View();
    var field = new Field.Field(size, view);
    view.drawField(field.field, size);
    var clickEventListener = new Event.UIEventListener(field, view);
    var touchEventListener = new Event.TouchEventListener(field, view);
    var buttonEventListener = new Event.ButtonEventListener(field);
    view.addCanvasEventListener(clickEventListener);
    view.addCanvasEventListener(touchEventListener);
    view.addButtonEventListener(buttonEventListener);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
var Field = (function () {
    function Field(arg1, arg2) {
        var _this = this;
        this.ai = [-1, -1, -1, 0, 1, 1, 1, 0];
        this.aj = [-1, 0, 1, -1, -1, 0, 1, 1];
        this.doubleArrayCopy = function (source) {
            var body = new Array(source.length);
            for (var i = 0; i < source.length; i++) {
                var column = new Array(source[i].length);
                for (var j = 0; j < source[i].length; j++) {
                    column[j] = source[i][j];
                }
                body[i] = column;
            }
            return body;
        };
        this.doubleArrayEquals = function (target, source) {
            for (var i = 0; i < source.length; i++) {
                for (var j = 0; j < source[i].length; j++) {
                    if (target[i][j] != source[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        };
        this.makeNewPutableZone = function () {
            _this._put_able_zone = new Array();
            for (var i = 0; i < _this._size; i++) {
                for (var j = 0; j < _this._size; j++) {
                    _this._new_field = _this.doubleArrayCopy(_this._field);
                    _this.checkReverce([i, j]);
                    if (!_this.doubleArrayEquals(_this._new_field, _this._field)) {
                        _this._put_able_zone.push([i, j]);
                    }
                }
            }
        };
        this.check = function (x, y, dx, dy) {
            var returnValue = 0;
            if (x + dx >= 0 && x + dx < _this._size && y + dy >= 0 && y + dy < _this._size) {
                if (_this._field[x + dx][y + dy] == (_this._turn == 0 ? 2 : 1)) {
                    returnValue = _this.check(x + dx, y + dy, dx, dy);
                    if (returnValue == 1) {
                        _this._new_field[x + dx][y + dy] = _this._turn == 0 ? 1 : 2;
                    }
                    return returnValue;
                }
                else if (_this._field[x + dx][y + dy] == (_this._turn == 0 ? 1 : 2)) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                return 0;
            }
        };
        this.checkReverce = function (vec) {
            var returnValue = 0;
            for (var n = 0; n < 8; n++) {
                var flag = _this.check(vec[0], vec[1], _this.ai[n], _this.aj[n]);
                returnValue = returnValue < flag ? flag : returnValue;
            }
            return returnValue;
        };
        this.searchNewPosition = function (vec) {
            var returnValue = 0;
            for (var i = 0; i < _this._put_able_zone.length; i++) {
                if (vec[0] == _this._put_able_zone[i][0] && vec[1] == _this._put_able_zone[i][1]) {
                    returnValue = 1;
                }
            }
            return returnValue;
        };
        this.putStone = function (vec) {
            if (_this.searchNewPosition(vec) && _this._field[vec[0]][vec[1]] == 0) {
                _this.checkReverce(vec);
                _this._field = _this._new_field;
                _this._field[vec[0]][vec[1]] = _this._turn == 1 ? 2 : 1;
                _this._turn = 1 - _this._turn;
                _this._view.viewTurn(_this._turn);
                _this.makeNewPutableZone();
                _this._view.drawField(_this._field, _this._size);
            }
            else {
            }
        };
        this.skip = function () {
            console.log("skipped");
            _this._turn = 1 - _this._turn;
            _this.makeNewPutableZone();
            _this._view.viewTurn(_this._turn);
        };
        this._size = arg1;
        this._turn = 0;
        var body = new Array();
        for (var i = 0; i < arg1; i++) {
            var column = new Array(arg1);
            for (var j = 0; j < arg1; j++) {
                if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
                    column[j] = 2;
                }
                else if ((i == 4 && j == 3) || (i == 3 && j == 4)) {
                    column[j] = 1;
                }
                else {
                    column[j] = 0;
                }
            }
            body[i] = column;
        }
        this._field = body;
        this._view = arg2;
        this.makeNewPutableZone();
    }
    Object.defineProperty(Field.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "field", {
        get: function () {
            return this._field;
        },
        enumerable: true,
        configurable: true
    });
    return Field;
}());
exports.Field = Field;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View() {
        var _this = this;
        this._start_angle = 0;
        this._end_angle = 2 * Math.PI;
        this.addCanvasEventListener = function (listener) {
            _this._canvas.addEventListener(listener.eventname, listener.callback);
        };
        this.addButtonEventListener = function (listener) {
            _this._skip_button.addEventListener(listener.eventname, listener.callback);
        };
        this.draw = function () {
            var ctx = _this._canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(20, 20);
            ctx.lineTo(120, 20);
            ctx.lineTo(120, 120);
            ctx.lineTo(20, 120);
            ctx.closePath();
            ctx.stroke();
        };
        this.drawField = function (field, size) {
            var radius = _this._monitor_size / size / 2;
            var ctx = _this._canvas.getContext('2d');
            ctx.beginPath();
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    ctx.beginPath();
                    ctx.strokeRect(i * radius * 2, j * radius * 2, radius * 2, radius * 2);
                    ctx.closePath();
                    if (field[i][j] == 1) {
                        ctx.beginPath();
                        ctx.arc(i * radius * 2 + radius, j * radius * 2 + radius, radius - 2, _this._start_angle, _this._end_angle, true);
                        ctx.fill();
                        ctx.closePath();
                    }
                    else if (field[i][j] == 2) {
                        ctx.beginPath();
                        ctx.fillStyle = "white";
                        ctx.strokeStyle = "white";
                        ctx.arc(i * radius * 2 + radius, j * radius * 2 + radius, radius - 2, _this._start_angle, _this._end_angle, true);
                        ctx.fill();
                        ctx.fillStyle = "black";
                        ctx.strokeStyle = "black";
                        ctx.closePath();
                    }
                }
            }
        };
        this.seeDialog = function (body) {
            alert(body);
        };
        this.viewTurn = function (turn) {
            _this._turn_monitor.innerHTML = "Turn: " + (turn == 0 ? "黒" : "白");
        };
        this._canvas = document.getElementById("canvas");
        this._monitor_size = this._canvas.width;
        this._skip_button = document.getElementById("skip");
        this._turn_monitor = document.getElementById("turn");
    }
    Object.defineProperty(View.prototype, "canvasSize", {
        get: function () {
            return this._monitor_size;
        },
        enumerable: true,
        configurable: true
    });
    return View;
}());
exports.View = View;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIEventListener = (function () {
    function UIEventListener(arg0, arg1) {
        var _this = this;
        this.callback = function (event) {
            var rect = event.target.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            _this._field.putStone([Math.floor(x / (_this._canvas_size / _this._field_size)), Math.floor(y / (_this._canvas_size / _this._field_size))]);
        };
        this._field_size = arg0.size;
        this._canvas_size = arg1.canvasSize;
        this._event = "click";
        this._field = arg0;
    }
    Object.defineProperty(UIEventListener.prototype, "eventname", {
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIEventListener.prototype, "field", {
        get: function () {
            return this._field;
        },
        enumerable: true,
        configurable: true
    });
    return UIEventListener;
}());
exports.UIEventListener = UIEventListener;
var TouchEventListener = (function () {
    function TouchEventListener(arg0, arg1) {
        var _this = this;
        this.callback = function (event) {
            event.preventDefault();
            var rect = event.target.getBoundingClientRect();
            var x = event.changedTouches[0].clientX - rect.left;
            var y = event.changedTouches[0].clientY - rect.top;
            _this._field.putStone([Math.floor(x / (_this._canvas_size / _this._field_size)), Math.floor(y / (_this._canvas_size / _this._field_size))]);
        };
        this._field_size = arg0.size;
        this._canvas_size = arg1.canvasSize;
        this._event = "touchstart";
        this._field = arg0;
    }
    Object.defineProperty(TouchEventListener.prototype, "eventname", {
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEventListener.prototype, "field", {
        get: function () {
            return this._field;
        },
        enumerable: true,
        configurable: true
    });
    return TouchEventListener;
}());
exports.TouchEventListener = TouchEventListener;
var ButtonEventListener = (function () {
    function ButtonEventListener(arg0) {
        var _this = this;
        this.callback = function (event) {
            _this._field.skip();
        };
        this._event = "click";
        this._field_size = arg0.size;
        this._field = arg0;
    }
    Object.defineProperty(ButtonEventListener.prototype, "eventname", {
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonEventListener.prototype, "field", {
        get: function () {
            return this._field;
        },
        enumerable: true,
        configurable: true
    });
    return ButtonEventListener;
}());
exports.ButtonEventListener = ButtonEventListener;


/***/ })
/******/ ]);