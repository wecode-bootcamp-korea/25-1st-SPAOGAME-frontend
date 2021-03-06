import React, { Component } from 'react';

import GoodsList from './Goods/GoodList';
import Filters from './Filter/Filters';
import CategoryFilter from './Filter/CategoryFilter';
import PageBtn from '../PageBtn/PageBtn';
import './SubjectList.scss';

const LIMIT = 15;

class SubjectList extends Component {
  constructor() {
    super();
    this.state = {
      goods: [],
      category: [],
      filterdFunction: [],
      nonfilterd: [],
      offset: 0,
      standard: 0,
      order_id: 0,
    };
  }

  componentDidMount() {
    fetch(
      `http://10.58.3.134:8000/products/women/outer?offset=0&limit=${LIMIT}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          goods: data.goods,
          filterdFunction: data.goods,
          nonfilterd: data.goods,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.offset !== this.state.offset ||
      prevState.order_id !== this.state.order_id
    ) {
      fetch(
        `http://10.58.3.134:8000/products/women/outer?offset=${this.state.offset}&limit=${LIMIT}&order_id=${this.state.order_id}`
      )
        .then(res => res.json())
        .then(data => {
          this.setState({
            goods: data.goods,
            filterdFunction: data.goods,
            nonfilterd: data.goods,
          });
        });
    }
  }

  sortByPrice = () => {
    this.setState({ order_id: 1 });
  };

  sortByPriceDesc = () => {
    this.setState({ order_id: 2 });
  };

  sortByName = () => {
    this.setState({ order_id: 3 });
  };

  sortByNew = () => {
    this.setState({ order_id: 0 });
  };

  colorSort = e => {
    const targetColor = e.target.getAttribute('name');
    const sortByColor = [...this.state.filterdFunction].filter(item =>
      item.colors.includes(targetColor)
    );
    this.setState({ goods: sortByColor });
  };

  colorRevert = e => {
    this.setState({ goods: this.state.nonfilterd });
  };

  pageBtn = e => {
    window.scrollTo(0, 0);

    this.setState({
      limit: 15 * e.target.name,
      offset: 15 * (e.target.name - 1),
    });
  };

  render() {
    const { goods, filterdFunction } = this.state;
    return (
      <div className="subject_list">
        <nav />
        <main>
          <Filters
            goods={goods}
            colorSort={this.colorSort}
            FILTER={FILTER}
            filterdFunction={filterdFunction}
            colorRevert={this.colorRevert}
          />

          <div className="main_mid">
            <h1>?????????</h1>
            <div className="category_filter_wrapper">
              <div className="category_filter">
                {CATEGORY.map(item => (
                  <CategoryFilter key={item.id} category={item} />
                ))}
              </div>

              <button className="item_count"> 8 items</button>
              <button className="sort">
                ???????????? &nbsp;<i className="fas fa-chevron-down"></i>
                <ul className="dropbox">
                  <li className="dropbox_item" onClick={this.sortByNew}>
                    ?????????
                  </li>
                  <li
                    className="dropbox_item"
                    name="name"
                    onClick={this.sortByName}
                  >
                    ?????????
                  </li>
                  <li
                    className="dropbox_item"
                    name="price"
                    onClick={this.sortByPrice}
                  >
                    ???????????????
                  </li>
                  <li
                    className="dropbox_item"
                    name="price"
                    onClick={this.sortByPriceDesc}
                  >
                    ???????????????
                  </li>
                </ul>
              </button>
            </div>

            <ul className="subjects">
              <GoodsList goods={goods} />
            </ul>
            <PageBtn pageBtn={this.pageBtn} />
          </div>

          <div className="main_right"></div>
        </main>
        <footer />
      </div>
    );
  }
}
const FILTER = [
  { color: 'black', material: '??????' },
  { color: 'yellow', material: '?????????' },
  { color: 'orange', material: '??????' },
  { color: 'red', material: '?????????' },
  { color: 'blue', material: '??????' },
  { color: 'white', material: '??????' },
  { color: 'green', material: '????????????' },
  { color: 'gray', material: '????????????' },
  { color: 'pink', material: '??????' },
  { color: 'purple', material: '??????' },
  { color: 'brown', material: '????????????' },
  { color: '#A99477', material: '????????????' },
];

const CATEGORY = [
  {
    id: 1,
    name: 'NEW',
  },
  {
    id: 2,
    name: 'BEST',
  },
  {
    id: 3,
    name: '?????????',
  },
  {
    id: 4,
    name: '??????',
  },
  {
    id: 5,
    name: '??????',
  },
  {
    id: 6,
    name: '?????????',
  },
  {
    id: 7,
    name: '??????',
  },
  {
    id: 8,
    name: '??????',
  },
  {
    id: 9,
    name: 'ACC',
  },
  {
    id: 10,
    name: '????????????',
  },
  {
    id: 11,
    name: '?????????/??????',
  },
  {
    id: 12,
    name: '???????????????',
  },
];

export default SubjectList;
