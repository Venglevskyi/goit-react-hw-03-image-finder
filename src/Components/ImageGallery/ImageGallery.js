import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import styles from "../../styles.module.css";

const ImageGallery = ({ images }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, webformatURL, tags }) => (
      <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      webformatURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired
    })
  )
};

export default ImageGallery;
