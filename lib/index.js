"use strict";
var __extends = (this && this.__extends) || (function(){
  var extendStatics = function(d, b){
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function(d, b){ d.__proto__ = b; }) ||
      function(d, b){ for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function(d, b){
    extendStatics(d, b);
    function __(){ this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
/* tslint:disable */
// @ts-ignore
import PropTypes from 'prop-types';
import * as React from 'react';
import { Fragment } from 'react';
var LEFT_PAGE = 'LEFT';
var RIGHT_PAGE = 'RIGHT';
var range = function(from, to, step){
  if (step === void 0){ step = 1; }
  var i = from;
  var ranges = [];
  while (i <= to){
    ranges.push(i);
    i += step;
  }
  return ranges;
};
var Pagination = /** @class */ (function(_super){
  __extends(Pagination, _super);
  function Pagination(props){
    var _this = _super.call(this, props) || this;
    _this.gotoPage = function(page){
      // @ts-ignore
      var _a = _this.props.onPageChanged, onPageChanged = _a === void 0 ? function(f){ return f; } : _a;
      _this.currentPage = Math.max(0, Math.min(page, _this.totalPages));
      var paginationData = {
        currentPage: _this.currentPage,
        itemsPerPage: _this.itemsPerPage,
        totalPages: _this.totalPages,
        totalRecords: _this.totalRecords
      };
      _this.setState(function(){ return onPageChanged(paginationData); });
    };
    _this.handleClick = function(page, evt){
      evt.preventDefault();
      _this.gotoPage(page);
    };
    _this.handleMoveLeft = function(evt){
      evt.preventDefault();
      // @ts-ignore
      _this.gotoPage(_this.currentPage - _this.maxSize * 2 - 1);
    };
    _this.handleMoveRight = function(evt){
      evt.preventDefault();
      // @ts-ignore
      _this.gotoPage(_this.currentPage + _this.maxSize * 2 + 1);
    };
    _this.fetchPageNumbers = function(){
      var totalPages = _this.totalPages;
      // @ts-ignore
      var maxSize = _this.maxSize;
      var totalNumbers = _this.maxSize * 2 + 3;
      var totalBlocks = totalNumbers + 2;
      if (totalPages > totalBlocks){
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
        if (leftSpill && !rightSpill){
          var extraPages = range(startPage - singleSpillOffset, startPage - 1);
          pages = [leftSpillPage].concat(extraPages, pages);
        }
        else if (!leftSpill && rightSpill){
          var extraPages = range(endPage + 1, endPage + singleSpillOffset);
          pages = pages.concat(extraPages, [rightSpillPage]);
        }
        else if (leftSpill && rightSpill){
          pages = [leftSpillPage].concat(pages, [rightSpillPage]);
        }
        return [1].concat(pages, [totalPages]);
      }
      return range(1, totalPages);
    };
    var _a = props.totalRecords, totalRecords = _a === void 0 ? 0 : _a, _b = props.itemsPerPage, itemsPerPage = _b === void 0 ? 30 : _b, _c = props.maxSize, maxSize = _c === void 0 ? 0 : _c;
    _this.initDataPage(totalRecords, itemsPerPage, maxSize);
    return _this;
  }
  Pagination.prototype.componentDidMount = function(){
    // this.gotoPage(1);
  };
  Pagination.prototype.initDataPage = function(totalRecords, itemsPerPage, maxSize){
    this.itemsPerPage = typeof itemsPerPage === 'number' ? itemsPerPage : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    this.maxSize =
      typeof maxSize === 'number'
        ? Math.max(0, Math.min(maxSize, 2))
        : 0;
    this.totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
    this.totalPages = this.totalPages === 0 ? 1 : this.totalPages;
  };
  Pagination.prototype.render = function(){
    var _this = this;
    // @ts-ignore
    var _a = this.props, _b = _a.totalRecords, totalRecords = _b === void 0 ? 0 : _b, _c = _a.itemsPerPage, itemsPerPage = _c === void 0 ? 30 : _c, _d = _a.maxSize, maxSize = _d === void 0 ? 0 : _d;
    this.initDataPage(totalRecords, itemsPerPage, maxSize);
    this.currentPage = this.props.currentPage;
    if (this.totalRecords === 0){
      return null;
    }
    if (this.totalPages === 1){
      return null;
    }
    // @ts-ignore
    var pages = this.fetchPageNumbers();
    return (React.createElement(Fragment, null,
      React.createElement("nav", { className: this.props.className, "aria-label": 'Countries Pagination' },
        React.createElement("ul", { className: 'pagination' }, pages.map(function(page, index){
          if (page === LEFT_PAGE){
            return (React.createElement("li", { key: index, className: 'page-item' },
              React.createElement("a", { className: 'page-link', "aria-label": 'Previous', onClick: _this.handleMoveLeft },
                React.createElement("span", { "aria-hidden": 'true' }, "\u00AB"),
                React.createElement("span", { className: 'sr-only' }, "Previous"))));
          }
          if (page === RIGHT_PAGE){
            return (React.createElement("li", { key: index, className: 'page-item' },
              React.createElement("a", { className: 'page-link', "aria-label": 'Next', onClick: _this.handleMoveRight },
                React.createElement("span", { "aria-hidden": 'true' }, "\u00BB"),
                React.createElement("span", { className: 'sr-only' }, "Next"))));
          }
          return (React.createElement("li", { key: index, className: "page-item" + (_this.currentPage === page ? ' active' : '') },
            React.createElement("a", { className: 'page-link', onClick: function(e){ return _this.handleClick(page, e); } }, page)));
        })))));
  };
  return Pagination;
}(React.Component));
// @ts-ignore
Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  maxSize: PropTypes.number,
  onPageChanged: PropTypes.func,
  totalRecords: PropTypes.number,
};
export default Pagination;
