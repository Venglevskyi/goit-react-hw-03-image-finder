import React, { Component } from "react";

import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Spiner from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";

import { fetchImages } from "./services/imageApi";

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    largeImg: null,
    searchQuery: " ",
    page: 1
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    const prevImage = prevState.images;
    const nextImage = this.state.images;

    if (prevQuery !== nextQuery) {
      this.fetchImagesByQuery();
    }
    if (prevImage !== nextImage && prevImage.length !== 0) {
      this.scroller();
    }
  }

  fetchImagesByQuery = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    fetchImages(searchQuery, page)
      .then(images =>
        this.setState(state => ({
          images: [...state.images, ...images],
          page: state.page + 1
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  scroller = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  setLargeImage = url => {
    this.setState({ largeImg: url });
  };

  closeModal = () => {
    this.setState({ largeImg: null });
  };

  render() {
    const { images, loading, error, largeImg } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {error && <p>Whoops, something went wrong: {error.massage}</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onLargeImage={this.setLargeImage} />
        )}
        {loading && <Spiner />}
        {images.length > 0 && !loading && (
          <Button clickButton={this.fetchImagesByQuery} />
        )}
        {largeImg && (
          <Modal onCloseModal={this.closeModal}>
            <img src={largeImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
