import React from 'react';
import { useState, useEffect } from 'react'
import s from './Modal.module.css';
import PropTypes from 'prop-types';


export default function Modal(props) {
  const [showModal, setShowModal] = useState(true);

  const closeByEsc = (e) => {
    if (e.code === 'Escape') {
      props.closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  const closeByBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };

  return (
    
      <div className={s.Overlay} onClick={closeByBackdrop}>
        <div className={s.Modal}>
          <img src={props.largeImageURL} alt={props.tags} />
        </div>
      </div>
    
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

// export default class Modal extends React.Component {
//     componentDidMount() {
//         window.addEventListener('keydown', this.closeByEsc);
//       }
    
//       componentWillUnmount() {
//         window.removeEventListener('keydown', this.closeByEsc);
//       }
    
//       closeByEsc = (e) => {
//         if (e.code === 'Escape') {
//           this.props.closeModal();
//         }
//       };
    
//       closeByBackdrop = event => {
//         if (event.target === event.currentTarget) {
//           this.props.closeModal();
//         }
//       };


//   render() {
//     const { largeImageURL, tags } = this.props;
//     return (
//       <div className={s.Overlay} onClick={this.closeByBackdrop}>
//         <div className={s.Modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
// };