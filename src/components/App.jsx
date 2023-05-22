import React from 'react';
import { useState, useEffect } from 'react'
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import s from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery'
import getImages from './Pixabay/pixabay';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Loader from './Loader/Loader';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryImage = async () => {
      if (searchQuery === null) return;
    if (searchQuery === undefined)
        return Notify.warning('Search query is invalid');
       setIsLoading(true);
    

    try {
      const {
        data: { hits, totalHits },
      } = await getImages(searchQuery, 1);
      if (!totalHits) Notify.failure('No results, please, try again');
      
        
      setImages(hits);
          setPage(1);
          setTotalHits(totalHits);
          setIsLoading(false);
      
    } catch (error) {
      setError(error);
      setIsLoading(false);
      Notify.failure('Error');
    }
  };
   queryImage();
  }, [searchQuery]);

  const onBtnClick = async () => {
    try {
      setIsLoading(true);

      const {
        data: { hits },
      } = await getImages(searchQuery, page + 1);
      if (hits.length === 0) Notify.failure('No results, please, try again');

      setImages(prevImages => [...prevImages, ...hits]);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
      
    } catch (error) {
      setError(error);
      setIsLoading(false);
      Notify.failure('Error');
    }
  };
 
  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSearch} />
        {error && <h2>Error, please, try again</h2>}
        <ImageGallery data={images}/>
        
        {images.length > 0 && totalHits > images.length && (
          <Button onBtnClick={onBtnClick} />
        )}
        { isLoading && <Loader />}
      </div>
    );

}

export default App


// export default class App extends React.Component {

//   state = {
//     searchQuery: null,
//     images: [],
//     page: 1,
//     totalHits: 0,
//     isLoading: false,
//     error: null,
//   };

//   queryImage = async searchQuery => {
//     if (this.state.searchQuery === searchQuery)
//       return Notify.warning('Search query is invalid');
//     this.setState({ isLoading: true });

//     try {
//       const {
//         data: { hits, totalHits }
//       } = await getImages(searchQuery, 1);
//       if (!totalHits) Notify.failure('No results, please, try again');
//       this.setState(_ => ({
//         searchQuery,
//         images: [...hits],
//         page: 1,
//         totalHits: totalHits,
//         isLoading: false,
//       }));
//     } catch (error) {
//       this.setState({ error });
//       Notify.failure('Error');
//     }
//   };

//   onBtnClick = async () => {
//     try {
//       const { page, searchQuery } = this.state;
//       this.setState({ isLoading: true });

//       const {
//         data: { hits },
//       } = await getImages(searchQuery, page + 1);
//       if (hits.length === 0) Notify.failure('No results, please, try again');

//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         page: prevState.page + 1,
//         isLoading: false,
//       }));
//     } catch (error) {
//       this.setState({ error});
//       Notify.failure('Error');
//     }
//   };




//   render() {
//     const { images, isLoading, error,  totalHits} = this.state;
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.queryImage} />
//         {error && <h2>Error, please, try again</h2>}
//         <ImageGallery data={images}/>
        
//         {images.length > 0 && totalHits > images.length && (
//           <Button onBtnClick={this.onBtnClick} />
//         )}
//         { isLoading && <Loader />}
//       </div>
//     );
//   }
// }

