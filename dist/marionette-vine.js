(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"), require("underscore"), require("backbone.marionette"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone", "underscore", "backbone.marionette"], factory);
	else if(typeof exports === 'object')
		exports["Vine"] = factory(require("backbone"), require("underscore"), require("backbone.marionette"));
	else
		root["Vine"] = factory(root["backbone"], root["underscore"], root["backbone.marionette"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _backbone = __webpack_require__(1);
	
	var _backbone2 = _interopRequireDefault(_backbone);
	
	var _underscore = __webpack_require__(2);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _backbone3 = __webpack_require__(3);
	
	var _backbone4 = _interopRequireDefault(_backbone3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Vine = _backbone4.default.Vine = Object.create(null);
	
	function Events() {}
	Events.prototype = _backbone2.default.Events;
	
	/**
	 * Vine.Scope
	 * ----------
	 *
	 * A vine scope has an owner (typically a Marionette.View)
	 * which is part of a view hierarchy.
	 *
	 * @param {object} owner - a Marionette.Object that is part of a view hierarchy
	 *                         which can traversed upwards via the owner._parent property
	 */
	
	var Scope = function (_Events) {
	  _inherits(Scope, _Events);
	
	  function Scope(owner) {
	    _classCallCheck(this, Scope);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scope).call(this));
	
	    _this.owner = owner;
	    return _this;
	  }
	
	  _createClass(Scope, [{
	    key: 'trigger',
	    value: function trigger() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      _backbone2.default.Events.trigger.apply(this, args);
	      var parentScope = this.getParentScope();
	      if (parentScope) {
	        parentScope.trigger.apply(parentScope, args);
	      }
	    }
	  }, {
	    key: 'getParentScope',
	    value: function getParentScope() {
	      return this.owner._parent && this.owner._parent.scope;
	    }
	  }]);
	
	  return Scope;
	}(Events);
	
	Vine.Scope = Scope;
	
	function addScopedEvents(View) {
	  var _super = _underscore2.default.pick(View.prototype, 'delegateEvents', 'undelegateEvents');
	
	  _underscore2.default.extend(View.prototype, {
	    delegateEvents: function delegateEvents(events) {
	      var _this2 = this;
	
	      _super.delegateEvents.call(this, events);
	      this.bindEntityEvents(this.scope, this.getOption('scopeEvents'));
	      _underscore2.default.each(this._behaviors, function (behavior) {
	        behavior.bindEntityEvents(_this2.scope, behavior.getOption('scopeEvents'));
	      });
	      return this;
	    },
	    undelegateEvents: function undelegateEvents(events) {
	      var _this3 = this;
	
	      _super.undelegateEvents.call(this, events);
	      this.unbindEntityEvents(this.scope, this.getOption('scopeEvents'));
	      _underscore2.default.each(this._behaviors, function (behavior) {
	        behavior.unbindEntityEvents(_this3.scope, behavior.getOption('scopeEvents'));
	      });
	      return this;
	    }
	  });
	
	  return View;
	};
	
	Vine.extend = function extend(Component) {
	  if (Component.prototype instanceof _backbone2.default.View) {
	    addScopedEvents(Component);
	  }
	  return Component.extend({
	    constructor: function constructor() {
	      this.scope = new Scope(this);
	      Component.apply(this, arguments);
	    }
	  });
	};
	
	Vine.installTo = function installTo(Marionette) {
	  Marionette.Object = Vine.extend(Marionette.Object);
	  Marionette.Controller = Vine.extend(Marionette.Controller);
	  Marionette.View = Vine.extend(Marionette.View);
	};
	
	exports.default = Vine;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=marionette-vine.js.map