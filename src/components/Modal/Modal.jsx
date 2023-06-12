import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

// використовуєьо хук useEffect для додавання та видалення слухача події keydown.
// компонент Modal приймає onClose як один зі своїх пропсів.Коли компонент рендериться або оновлюється, useEffect додає слухач події keydown, а при знищенні компонента - видаляє його.
// Клік по бекдропу також був переписаний на функціональний підхід, де onClickBackdrop є локальною функцією в компоненті Modal.

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    // виконуємо перевірку, чи була натиснута клавіша Escape, якщо так, то виконується функція onClose, яка передана до компонента через пропси.
    const onClickEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    // додаємо подію прослуховування клавіші (keydown) та обробник події кліку (onClickEsc)
    // у залежність useEffect передаємо посилання на функцію (onClose), у зв`язку з чим  useEffect буде перезапускатися тільки тоді, коли зміниться значення onClose.
    window.addEventListener('keydown', onClickEsc);
    return () => {
      // "підмітаємо" за собою. Після закриття модалки видаляємо обробник події onClickEsc, щоб уникнути виток пам'яті та непотрібні виклики функції.
      window.removeEventListener('keydown', onClickEsc);
    };
  }, [onClose]);

  // закриваємо модалку при кліку на бекдроп
  // функція приймає об'єкт події (е) і перевіряє, чи елемент, на якому було клікнуто (e.target), є поточним елементом (e.currentTarget). Якщо так виконується функція onClose, яка передана до компонента через пропси.
  const onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={onClickBackdrop}>
      <div className={css.modalDiv}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
// ======================================
// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';

// // об'єкт модального вікна у DOM-дереві
// const modalRoot = document.querySelector('#modal-root');

// class Modal extends Component {
//   // слухач для кнопок
//   componentDidMount() {
//     window.addEventListener('keydown', this.onClickEsc); // додаємо обробник події клику по клавіатурі
//   }
//   // "підмітаємо" за собою після закриття модалки
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onClickEsc); // видаляємо обробник події клику по клавіатурі
//   }

//   onClickEsc = e => {
//     // перевіряємо чи клікнули ми на клвішу Escape, якщо так модалка закриється
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   // закриття модалки по кліку на бекдроп
//   onClickBackdrop = e => {
//     // перевірка чи клікнули ми на бекдроп, якщо так модалка закриється
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { children } = this.props;
//     return createPortal(
//       <div className={css.overlay} onClick={this.onClickBackdrop}>
//         <div className={css.modalDiv}>{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
