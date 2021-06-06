/* tslint:disable */
// @ts-ignore
import PropTypes from 'prop-types';
import * as React from 'react';
import {Fragment} from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const ranges = [];

  while (i <= to) {
    ranges.push(i);
    i += step;
  }

  return ranges;
};


class Pagination extends React.Component<any, any> {
  totalRecords: number;
  totalPages: number;
  maxSize: number;
  itemsPerPage: number;
  currentPage: number;

  constructor(props) {
    super(props);
    const {totalRecords = 0, itemsPerPage = 30, maxSize = 0, initPageSize} = props;
    this.initDataPage(totalRecords, itemsPerPage, maxSize, initPageSize);
  }

  componentDidMount() {
    // this.gotoPage(1);
  }

  initDataPage(totalRecords, itemsPerPage, maxSize, initPageSize) {
    this.itemsPerPage = typeof itemsPerPage === 'number' ? itemsPerPage : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    this.maxSize =
      typeof maxSize === 'number'
        ? Math.max(0, Math.min(maxSize, 2))
        : 0;
    this.totalPages = initPageSize && initPageSize > 0 ?
    Math.ceil((this.totalRecords - initPageSize) / this.itemsPerPage) + 1:  
    Math.ceil(this.totalRecords / this.itemsPerPage);
    this.totalPages = this.totalPages === 0 ? 1 : this.totalPages;
  }

  gotoPage = (page: number) => {
    // @ts-ignore
    const {onPageChanged = f => f} = this.props;

    this.currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      totalPages: this.totalPages,
      totalRecords: this.totalRecords
    };

    this.setState(() => onPageChanged(paginationData));
  }

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  }

  handleMoveLeft = evt => {
    evt.preventDefault();
    // @ts-ignore
    this.gotoPage(this.currentPage - this.maxSize * 2 - 1);
  }

  handleMoveRight = evt => {
    evt.preventDefault();
    // @ts-ignore
    this.gotoPage(this.currentPage + this.maxSize * 2 + 1);
  }

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    // @ts-ignore
    const maxSize = this.maxSize;

    const totalNumbers = this.maxSize * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = this.currentPage - maxSize;
      const rightBound = this.currentPage + maxSize;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }

  render() {
    // @ts-ignore
    const {totalRecords = 0, itemsPerPage = 30, maxSize = 0, initPageSize} = this.props;
    this.initDataPage(totalRecords, itemsPerPage, maxSize, initPageSize);
    this.currentPage = this.props.currentPage;
    if (!this.totalRecords || this.totalRecords <= 0) {
      return null;
    }

    if (!this.totalPages || this.totalPages <= 1) {
      return null;
    }
    // @ts-ignore
    const pages = this.fetchPageNumbers();
    return (
      React.createElement(Fragment, null,
        React.createElement("nav", { className: this.props.className, "aria-label": 'Countries Pagination' },
          React.createElement("ul", { className: 'pagination' }, pages.map(function(page, index){
            if (page === LEFT_PAGE){
              return (React.createElement("li", { key: index, className: 'page-item' },
                React.createElement("a", { className: 'page-link', "aria-label": 'Previous', onClick: this.handleMoveLeft },
                  React.createElement("span", { "aria-hidden": 'true' }, "\u00AB"),
                  React.createElement("span", { className: 'sr-only' }, "Previous"))));
            }
            if (page === RIGHT_PAGE){
              return (React.createElement("li", { key: index, className: 'page-item' },
                React.createElement("a", { className: 'page-link', "aria-label": 'Next', onClick: this.handleMoveRight },
                  React.createElement("span", { "aria-hidden": 'true' }, "\u00BB"),
                  React.createElement("span", { className: 'sr-only' }, "Next"))));
            }
            return (React.createElement("li", { key: index, className: "page-item" + (this.currentPage === page ? ' active' : '') },
              React.createElement("a", { className: 'page-link', onClick: function(e){ return this.handleClick(page, e); } }, page)));
          }))))
      /*
      <Fragment>
        <nav className={this.props.className} aria-label='Countries Pagination'>
          <ul className='pagination'>
            {pages.map((page, index) => {
              if (page === LEFT_PAGE) {
                return (
                  <li key={index} className='page-item'>
                    <a className='page-link'
                       aria-label='Previous'
                       onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden='true'>&laquo;</span>
                      <span className='sr-only'>Previous</span>
                    </a>
                  </li>
                );
              }

              if (page === RIGHT_PAGE) {
                return (
                  <li key={index} className='page-item'>
                    <a className='page-link'
                       aria-label='Next'
                       onClick={this.handleMoveRight}
                    >
                      <span aria-hidden='true'>&raquo;</span>
                      <span className='sr-only'>Next</span>
                    </a>
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className={`page-item${
                    this.currentPage === page ? ' active' : ''
                    }`}
                >
                  <a
                    className='page-link'
                    onClick={(e) => this.handleClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>*/
    );
  }
}

// @ts-ignore
Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  maxSize: PropTypes.number,
  onPageChanged: PropTypes.func,
  totalRecords: PropTypes.number,
};

export default Pagination;
