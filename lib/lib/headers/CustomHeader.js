'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HeadersContext = require('./HeadersContext');

var _TimelineStateContext = require('../timeline/TimelineStateContext');

var _calendar = require('../utility/calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomHeader = exports.CustomHeader = function (_React$Component) {
  _inherits(CustomHeader, _React$Component);

  function CustomHeader(props) {
    _classCallCheck(this, CustomHeader);

    var _this = _possibleConstructorReturn(this, (CustomHeader.__proto__ || Object.getPrototypeOf(CustomHeader)).call(this, props));

    _initialiseProps.call(_this);

    var canvasTimeStart = props.canvasTimeStart,
        canvasTimeEnd = props.canvasTimeEnd,
        canvasWidth = props.canvasWidth,
        unit = props.unit,
        timeSteps = props.timeSteps,
        showPeriod = props.showPeriod;

    var ratio = _this.calculateRatio(canvasWidth, canvasTimeEnd, canvasTimeStart);
    var intervals = _this.getHeaderIntervals({
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
      canvasWidth: canvasWidth,
      unit: unit,
      timeSteps: timeSteps,
      showPeriod: showPeriod,
      ratio: ratio
    });

    _this.state = {
      intervals: intervals,
      ratio: ratio
    };
    return _this;
  }

  _createClass(CustomHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod || nextProps.children !== this.props.children) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod) {
        var canvasTimeStart = nextProps.canvasTimeStart,
            canvasTimeEnd = nextProps.canvasTimeEnd,
            canvasWidth = nextProps.canvasWidth,
            unit = nextProps.unit,
            timeSteps = nextProps.timeSteps,
            showPeriod = nextProps.showPeriod;

        var ratio = this.calculateRatio(canvasWidth, canvasTimeEnd, canvasTimeStart);
        var intervals = this.getHeaderIntervals({
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          unit: unit,
          timeSteps: timeSteps,
          showPeriod: showPeriod,
          ratio: ratio
        });

        this.setState({ intervals: intervals, ratio: ratio });
      }
    }
  }, {
    key: 'calculateRatio',
    value: function calculateRatio(canvasWidth, canvasTimeEnd, canvasTimeStart) {
      return canvasWidth / (canvasTimeEnd - canvasTimeStart);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.getStateAndHelpers();
      return this.props.children(props, this.props.props);
    }
  }]);

  return CustomHeader;
}(_react2.default.Component);

CustomHeader.propTypes = {
  //component props
  children: _propTypes2.default.func.isRequired,
  unit: _propTypes2.default.string.isRequired,
  timeSteps: _propTypes2.default.object.isRequired,
  //Timeline context
  visibleTimeStart: _propTypes2.default.number.isRequired,
  visibleTimeEnd: _propTypes2.default.number.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  showPeriod: _propTypes2.default.func.isRequired,
  props: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getHeaderIntervals = function (_ref4) {
    var canvasTimeStart = _ref4.canvasTimeStart,
        canvasTimeEnd = _ref4.canvasTimeEnd,
        unit = _ref4.unit,
        timeSteps = _ref4.timeSteps,
        ratio = _ref4.ratio;

    var intervals = [];
    (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, unit, timeSteps, function (startTime, endTime) {
      var labelWidth = Math.ceil((endTime.valueOf() - startTime.valueOf()) * ratio);
      intervals.push({
        startTime: startTime,
        endTime: endTime,
        labelWidth: labelWidth
      });
    });
    return intervals;
  };

  this.rootProps = {
    style: {
      position: 'relative'
    }
  };

  this.getRootProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var style = props.style;

    return {
      style: Object.assign({}, style ? style : {}, _this2.rootProps.style)
    };
  };

  this.getIntervalProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var interval = props.interval,
        style = props.style;

    if (!interval) throw new Error("you should provide interval to the prop getter");
    var startTime = interval.startTime,
        labelWidth = interval.labelWidth;

    return {
      style: _this2.getIntervalStyle({
        style: style,
        startTime: startTime,
        labelWidth: labelWidth,
        canvasTimeStart: _this2.props.canvasTimeStart,
        unit: _this2.props.unit,
        ratio: _this2.state.ratio
      }),
      key: 'label-' + startTime.valueOf()
    };
  };

  this.getIntervalStyle = function (_ref5) {
    var startTime = _ref5.startTime,
        canvasTimeStart = _ref5.canvasTimeStart,
        ratio = _ref5.ratio,
        unit = _ref5.unit,
        labelWidth = _ref5.labelWidth,
        style = _ref5.style;

    var left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio);
    var unitValue = startTime.get(unit === 'day' ? 'date' : unit);
    var firstOfType = unitValue === (unit === 'day' ? 1 : 0);
    var leftCorrect = firstOfType ? 1 : 0;
    return _extends({}, style, {
      left: left - leftCorrect,
      width: labelWidth,
      position: 'absolute'
    });
  };

  this.getStateAndHelpers = function () {
    var _props = _this2.props,
        canvasTimeStart = _props.canvasTimeStart,
        canvasTimeEnd = _props.canvasTimeEnd,
        unit = _props.unit,
        showPeriod = _props.showPeriod,
        timelineWidth = _props.timelineWidth,
        visibleTimeStart = _props.visibleTimeStart,
        visibleTimeEnd = _props.visibleTimeEnd;
    //TODO: only evaluate on changing params

    return {
      timelineContext: {
        timelineWidth: timelineWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd
      },
      headerContext: {
        unit: unit,
        intervals: _this2.state.intervals
      },
      getRootProps: _this2.getRootProps,
      getIntervalProps: _this2.getIntervalProps,
      showPeriod: showPeriod
    };
  };
};

var CustomHeaderWrapper = function CustomHeaderWrapper(_ref) {
  var children = _ref.children,
      unit = _ref.unit,
      props = _ref.props;
  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref2) {
      var getTimelineState = _ref2.getTimelineState,
          showPeriod = _ref2.showPeriod;

      var timelineState = getTimelineState();
      return _react2.default.createElement(
        _HeadersContext.TimelineHeadersConsumer,
        null,
        function (_ref3) {
          var timeSteps = _ref3.timeSteps;
          return _react2.default.createElement(CustomHeader, _extends({
            children: children,
            timeSteps: timeSteps,
            showPeriod: showPeriod,
            unit: unit ? unit : timelineState.timelineUnit
          }, timelineState, {
            props: props
          }));
        }
      );
    }
  );
};

CustomHeaderWrapper.propTypes = {
  children: _propTypes2.default.func.isRequired,
  unit: _propTypes2.default.string,
  props: _propTypes2.default.object
};

exports.default = CustomHeaderWrapper;