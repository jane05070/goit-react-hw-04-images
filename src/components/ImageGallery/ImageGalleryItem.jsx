import Modal from '../Modal/Modal';
import { useState, useCallback } from 'react'
import React from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';


export default function ImageGalleryItem(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

   const toggleModal = useCallback(() => {
    setModalIsOpen((prevModalIsOpen) => !prevModalIsOpen);
   }, []);
  
  return (
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={props.webformatURL}
          alt={props.tags}
          onClick={toggleModal}
          id={props.id}
        />
        {modalIsOpen && (
          <Modal
            largeImageURL={props.largeImageURL}
            tags={props.tags}
            closeModal={toggleModal}
          />
        )}
      </li>
    );
}



ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

// export default class ImageGalleryItem extends React.Component {
//   state = {
//     modalIsOpen: false,
//   };

//   toggleModal = () => {
//     this.setState(({ modalIsOpen }) => ({ modalIsOpen: !modalIsOpen }));
//   };

//   render() {
//     const { webformatURL, tags, id, largeImageURL } = this.props;
//     return (
//       <li className={s.ImageGalleryItem}>
//         <img
//           className={s.ImageGalleryItemImage}
//           src={webformatURL}
//           alt={tags}
//           onClick={this.toggleModal}
//           id={id}
//         />
//         {this.state.modalIsOpen && (
//           <Modal
//             largeImageURL={largeImageURL}
//             tags={tags}
//             closeModal={this.toggleModal}
//           />
//         )}
//       </li>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };
