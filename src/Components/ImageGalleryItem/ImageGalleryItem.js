import React from "react";
import PropTypes from "prop-types";

import styles from "../../styles.module.css";

const ImageGalleryItem = ({ webformatURL, tags, largeImage }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={webformatURL} alt={tags} className={styles.ImageGalleryItemImage} onClick={largeImage}/>
  </li>
);

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImage: PropTypes.func.isRequired
}

export default ImageGalleryItem;
