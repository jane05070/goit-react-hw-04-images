import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onBtnClick }) {
  return (
    <button 
    className={s.Button} 
    onClick={onBtnClick}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
