import React from 'react';
import s from './Searchbar.module.css'
import PropTypes from 'prop-types';

export default class Searchbar extends React.Component {

    state = { 
        query: '' 
    };

    handleQueryChange = (e) => {
        this.setState({query: e.currentTarget.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query.trim());
        this.reset()
        console.log();
    }

    reset = () => {
        this.setState({ query: '' });
      };

  render() {
    const {query} = this.state
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { 
    onSubmit: PropTypes.func.isRequired 
};



