import React, { useState, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorMessage from './ErrorView/ErrorMessage';
import getApi from './Servise/getApi';

const App = () => {
  // замість state та setState використовуємо хук useState для створення і управління станом компонентів. Повертає масив з двома елементами: поточне значення стану і функцію для оновлення цього значення.
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [tag, setTag] = useState('');

  // Замість сомпоненту життевого циклу componentDidUpdate використовуємо хук useEffect який буде реагувати на кожну зміну залежностей. В залежності передаємо властивості searchText, currentPage стан яких зберігається у  useState
  useEffect(() => {
    // функція яка виконує запит на сервер
    const fetchData = async () => {
      // запуск спінера
      setLoading(true);

      //  робимо запит на бекенд за допомогою функції getApi
      try {
        const response = await getApi(searchText, currentPage);
        const { hits, totalHits } = response.data;
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalPage(totalHits);
      } catch (error) {
        setError('Something wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // перевіряємо, чи відбулися зміни у searchText або currentPage. Якщо searchText не є пустим рядком або currentPage не дорівнює 1 викликаємо функцію fetchData,
    //  тобто виконання запиту на сервер відбувається тільки у випадку, якщо зміниться searchText(текст пошуку) або currentPage(номер поточної сторінки).
    if (searchText !== '' || currentPage !== 1) {
      fetchData();
    }
  }, [searchText, currentPage]);

  //  використовуємо хук useCallback який оптимізує функціональні компоненти шляхом кешування і повторного використання колбеків.
  //функція handleSubmit встановлює нові (оновлює) значення властивостей стан яких зберігається у useState.
  // useCallback буде повертатися знову тільки в разі зміни залежностей.
  const handleSubmit = useCallback(searchValue => {
    setSearchText(searchValue);
    setCurrentPage(1);
    setImages([]);
    setLoading(false);
    setShowModal(false);
    setError(null);
    setTotalPage(null);
  }, []);

  // функція яка збільшує значення currentPage на 1. Вона використовує попереднє значення currentPage як аргумент у функції обновлення стану setCurrentPage.
  const onLoadMore = useCallback(() => {
    setCurrentPage(prevPage => prevPage + 1);
  }, []);

  // встановлюємо значення showModal на true(відкрити модалку), та оновлюємо значення imgUrl і tag.
  const onOpenModal = useCallback((imgUrl, tag) => {
    setShowModal(true);
    setImgUrl(imgUrl);
    // console.log(imgUrl);
    setTag(tag);
    // console.log(tag);
  }, []);

  // закриваємо модалку
  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery images={images} openModal={onOpenModal} />

      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={imgUrl} alt={tag} />
        </Modal>
      )}

      <Loader isLoading={loading} />

      {Math.ceil(totalPage / 12) > currentPage && (
        <Button loadMore={onLoadMore} />
      )}

      {totalPage === 0 && <ErrorMessage />}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default App;

//* ============================================================
//* ============================================================
// import 'react-toastify/dist/ReactToastify.css';
// import { Component } from 'react';
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';
// import ErrorMessage from './ErrorView/ErrorMessage';
// import getApi from './Servise/getApi';

// class App extends Component {
//   state = {
//     searchText: '',
//     images: [],
//     currentPage: 1,
//     loading: false, // spiner
//     showModal: false,
//     error: null,
//     totalPage: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     // Перевіряємо, чи змінились пропси запиту або state сторінки (currentPage)
//     if (
//       prevState.searchText !== this.state.searchText ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       // запуск спінера
//       this.setState({ loading: true });

//       //  запит на бекенд
//       try {
//         const response = await getApi(
//           this.state.searchText,
//           this.state.currentPage
//         );
//         const { hits, totalHits } = response.data;
//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           totalPage: totalHits,
//         }));
//       } catch (error) {
//         this.setState({ error: 'Something wrong. Please try again.' });
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   //  запит пошуку в App з Searchbar
//   handleSubmit = searchValue => {
//     this.setState({
//       searchText: searchValue,
//       currentPage: 1,
//       images: [],
//       loading: false,
//       showModal: false,
//       error: null,
//       totalPage: null,
//     });
//   };

//   // кнопка завантаження наступних фото
//   onLoadMore = () => {
//     this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
//   };

//   //модалка відкрити
//   onOpenModal = (imgUrl, tag) => {
//     this.setState({ showModal: true, imgUrl, tag });
//   };

//   //модалка закрити
//   onCloseModal = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const {
//       images,
//       showModal,
//       imgUrl,
//       tag,
//       loading,
//       totalPage,
//       error,
//       currentPage,
//     } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} />

//         <ImageGallery images={images} openModal={this.onOpenModal} />

//         {/* модалка  */}
//         {showModal && (
//           <Modal onClose={this.onCloseModal}>
//             <img src={imgUrl} alt={tag} />
//           </Modal>
//         )}

//         {/* спінер */}
//         <Loader isLoading={loading} />

//         {/* кнопка завантажити ще */}
//         {Math.ceil(totalPage / 12) > currentPage && (
//           <Button loadMore={this.onLoadMore} />
//         )}

//         {/* нічого не знайшло */}
//         {/* {totalPage === 0 && <ErrorMessadge />} */}
//         {totalPage === 0 ? <ErrorMessage /> : null}

//         {/* помилка запиту */}
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//       </>
//     );
//   }
// }

// export default App;
