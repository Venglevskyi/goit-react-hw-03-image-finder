import React from "react";
import PropTypes from "prop-types";

import styles from "../../styles.module.css";

const ImageGalleryItem = ({ webformatURL, tags }) => (
  <li className={styles.ImageGalleryItem}>
    <img src={webformatURL} alt={tags} className={styles.ImageGalleryItemImage} />
  </li>
);

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}

export default ImageGalleryItem;
