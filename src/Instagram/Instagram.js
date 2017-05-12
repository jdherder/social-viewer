import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import './Instagram.css';
import Loading from '../Loading/Loading';

class Instagram extends Component {
  constructor() {
    super();

    this.state = {
      imgDataArr: [],
    };
  }

  componentDidMount() {
    const accounts = this.props.accounts || [];
    this.getAllAccountData(accounts);
  }

  render() {
    let markup;

    if (this.state.imgDataArr.length > 0) {
      markup = this.buildImgMarkup(this.state.imgDataArr);
    } else {
      markup = (<div className="loading-posts"><Loading /></div>);
    }

    return this.buildComponentTemplate(markup);
  }

  getAllAccountData(accounts) {
    const dataPromises = accounts.map(account => {
      return this.fetchInstagramData(account);
    });

    return Promise.all(dataPromises)
      .then(instagramData => {
        const combinedImgArr = [];
        instagramData.forEach(dataSet => {
          dataSet.forEach(item => {
            combinedImgArr.push(item);
          });
        });

        return combinedImgArr;
      })
      .then(x => {
        const sortedImgArr = x.sort(this.comparePostCreatedTime);
        this.setState({
          imgDataArr: sortedImgArr,
        });
      });
  }

  fetchInstagramData(account) {
    const url = `https://igapi.ga/${account}/media/?count=10`;

    return fetchJsonp(url)
      .then(res => res.json())
      .then(instagramData => {
        return this.normalizeInstagramData(instagramData);
      }).catch(e => {
        console.error('parsing failed', e)
      });
  }

  buildComponentTemplate(markup) {
    return (
      <div className="instagram">{markup}</div>
    );
  }

  buildImgMarkup(images) {
    return images.map((imgObj, i) => {
      let author;

      if (imgObj.user) {
        author = (
          <p className="author">{imgObj.user.username}</p>
        );
      }

      return (
        <div
          key={i}
          className="post-container"
          style={{backgroundImage: `url(${imgObj.imgUrl})`}}
          onClick={() => this.props.showDetailModal(imgObj)}
        >
          {author}
        </div>
      );
    })
  }

  normalizeInstagramData(instagramData) {
    return instagramData.items.map(item => ({
      caption: item.caption,
      time: item.created_time,
      date: this.getDataFromEpoch(item.created_time),
      imgUrl: item.images.standard_resolution.url,
      likes: item.likes,
      user: item.user,
    }));
  }

  getDataFromEpoch(epoch) {
    const date = new Date(0);
    date.setUTCSeconds(epoch);
    return {
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    };
  }

  comparePostCreatedTime(a, b) {
    if (a.time > b.time)
      return -1;
    if (a.time < b.time)
      return 1;
    return 0;
  }
}

export default Instagram;
