import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

// об'єкт модального вікна у DOM-дереві
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  // слухач для кнопок
  componentDidMount() {
    window.addEventListener('keydown', this.onClickEsc); // додаємо обробник події клику по клавіатурі
  }
  // "підмітаємо" за собою після закриття модалки
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClickEsc); // видаляємо обробник події клику по клавіатурі
  }

  onClickEsc = e => {
    // перевіряємо чи клікнули ми на клвішу Escape, якщо так модалка закриється
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  // закриття модалки по кліку на бекдроп
  onClickBackdrop = e => {
    // перевірка чи клікнули ми на бекдроп, якщо так модалка закриється
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.onClickBackdrop}>
        <div className={css.modalDiv}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
