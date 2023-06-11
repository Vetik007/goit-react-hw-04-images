import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item, openModal }) => {
  const { largeImageURL, tags, webformatURL } = item;
  return (
    <li
      onClick={e => {
        // e.preventDefault();
        openModal(largeImageURL, tags);
      }}
      className={css.galleryItem}
    >
      <img
        src={webformatURL}
        alt={tags}
        loading="lazy"
        className={css.ImageGalleryItem}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};
