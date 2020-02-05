import React, { Component } from "react";

import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";

import { fetchImages } from "./services/imageApi";

export default class App extends Component {
  state = {
    images: [],
    searchQuery: " ",
    page: 0
  };

  componentDidMount() {
  };

  componentDidUpdate(prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    console.log(prevQuery);
    console.log(nextQuery);

    if (prevQuery !== nextQuery) {
      this.fetchImagesByQuery(nextQuery);
    }
  };

  fetchImagesByQuery = query => {
    fetchImages(query)
      .then(images =>
        this.setState(state => ({ images, page: state.page + 1 }))
      )
      .catch(err => this.setState({ err }));
  };

  handleSearchFormSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && <Button />}
      </>
    );
  }
}
