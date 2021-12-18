"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var LEFT_PAGE = 'LEFT';
var RIGHT_PAGE = 'RIGHT';
var range = function (from, to, step) {
  if (step === void 0) { step = 1; }
  var i = from;
  var ranges = [];
  while (i <= to) {
    ranges.push(i);
    i += step;
  }
  return ranges;
};
function getNumber(n, m) {
  return (typeof n === 'number' && n !== undefined && n != null && n > 0 ? n : m);
}
exports.getNumber = getNumber;
function getMaxSize(maxSize, m) {
  return typeof maxSize === 'number' ? Math.max(0, Math.min(maxSize, 2)) : m;
}
exports.getMaxSize = getMaxSize;
function getTotalPages(totalRecords, itemsPerPage) {
  var x = Math.ceil(totalRecords / itemsPerPage);
  return (x <= 0 ? 1 : x);
}
exports.getTotalPages = getTotalPages;
var Pagination = (function (_super) {
  __extends(Pagination, _super);
  function Pagination(props) {
    var _this = _super.call(this, props) || this;
    _this.gotoPage = function (page) {
      var _a = _this.props.onPageChanged, onPageChanged = _a === void 0 ? function (f) { return f; } : _a;
      _this.currentPage = Math.max(0, Math.min(page, _this.totalPages));
      var paginationData = {
        currentPage: _this.currentPage,
        itemsPerPage: _this.itemsPerPage,
        totalPages: _this.totalPages,
        totalRecords: _this.totalRecords
      };
      _this.setState(function () { return onPageChanged(paginationData); });
    };
    _this.handleClick = function (page, evt) {
      evt.preventDefault();
      _this.gotoPage(page);
    };
    _this.handleMoveLeft = function (evt) {
      evt.preventDefault();
      _this.gotoPage(_this.currentPage - _this.maxSize * 2 - 1);
    };
    _this.handleMoveRight = function (evt) {
      evt.preventDefault();
      _this.gotoPage(_this.currentPage + _this.maxSize * 2 + 1);
    };
    _this.fetchPageNumbers = function () {
      var totalPages = _this.totalPages;
      var maxSize = _this.maxSize;
      var totalNumbers = _this.maxSize * 2 + 3;
      var totalBlocks = totalNumbers + 2;
      if (totalPages > totalBlocks) {
        var pages = [];
        var leftBound = _this.currentPage - maxSize;
        var rightBound = _this.currentPage + maxSize;
        var beforeLastPage = totalPages - 1;
        var startPage = leftBound > 2 ? leftBound : 2;
        var endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
        pages = range(startPage, endPage);
        var pagesCount = pages.length;
        var singleSpillOffset = totalNumbers - pagesCount - 1;
        var leftSpill = startPage > 2;
        var rightSpill = endPage < beforeLastPage;
        var leftSpillPage = LEFT_PAGE;
        var rightSpillPage = RIGHT_PAGE;
        if (leftSpill && !rightSpill) {
          var extraPages = range(startPage - singleSpillOffset, startPage - 1);
          pages = __spreadArrays([leftSpillPage], extraPages, pages);
        }
        else if (!leftSpill && rightSpill) {
          var extraPages = range(endPage + 1, endPage + singleSpillOffset);
          pages = __spreadArrays(pages, extraPages, [rightSpillPage]);
        }
        else if (leftSpill && rightSpill) {
          pages = __spreadArrays([leftSpillPage], pages, [rightSpillPage]);
        }
        return __spreadArrays([1], pages, [totalPages]);
      }
      return range(1, totalPages);
    };
    _this.totalRecords = getNumber(props.totalRecords, 0);
    _this.maxSize = getMaxSize(props.maxSize, 7);
    _this.itemsPerPage = getNumber(props.itemsPerPage, 12);
    _this.initPageSize = getNumber(props.initPageSize, _this.itemsPerPage);
    _this.totalPages = getTotalPages(_this.totalRecords, _this.itemsPerPage);
    _this.currentPage = getNumber(props.currentPage, 1);
    return _this;
  }
  Pagination.prototype.componentDidMount = function () {
  };
  Pagination.prototype.render = function () {
    this.itemsPerPage = getNumber(this.props.itemsPerPage, 12);
    this.totalRecords = getNumber(this.props.totalRecords, 0);
    this.totalPages = getTotalPages(this.totalRecords, this.itemsPerPage);
    this.currentPage = getNumber(this.props.currentPage, 1);
    if (!this.totalRecords || this.totalRecords <= 0) {
      return null;
    }
    if (!this.totalPages || this.totalPages <= 1) {
      return null;
    }
    var pages = this.fetchPageNumbers();
    var x = this;
    return (React.createElement(react_1.Fragment, null, React.createElement("nav", { className: this.props.className, "aria-label": 'Countries Pagination' }, React.createElement("ul", { className: 'pagination' }, pages.map(function (page, index) {
      if (page === LEFT_PAGE) {
        return (React.createElement("li", { key: index, className: 'page-item' }, React.createElement("a", { className: 'page-link', "aria-label": 'Previous', onClick: x.handleMoveLeft }, React.createElement("span", { "aria-hidden": 'true' }, "\u00AB"), React.createElement("span", { className: 'sr-only' }, "Previous"))));
      }
      if (page === RIGHT_PAGE) {
        return (React.createElement("li", { key: index, className: 'page-item' }, React.createElement("a", { className: 'page-link', "aria-label": 'Next', onClick: x.handleMoveRight }, React.createElement("span", { "aria-hidden": 'true' }, "\u00BB"), React.createElement("span", { className: 'sr-only' }, "Next"))));
      }
      return (React.createElement("li", { key: index, className: "page-item" + (x.currentPage === page ? ' active' : '') }, React.createElement("a", { className: 'page-link', onClick: function (e) { return x.handleClick(page, e); } }, page)));
    })))));
  };
  return Pagination;
}(React.Component));
exports.Pagination = Pagination;
exports.default = Pagination;
