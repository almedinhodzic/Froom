import React from "react";
import styles from "./Popup.module.css";

// This component will run if user klicks on delete Acount button, and he has to confirm his action. If he clicks on Conform, deleteAccount action will be dispatched, and his account, profile and posts will be deleted. User also can Cancel his action, by click on Cancel button.
const Popup = ({ onDeleteClick, showPopup }) => {
  const onConfirm = () => {
    onDeleteClick();
  };

  const onCancel = () => {
    showPopup(false);
  };

  return (
    <div className={styles.alertContainer}>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={onConfirm} className={styles.confirm}>
        CONFIRM
      </button>
      <button onClick={onCancel} className={styles.cancel}>
        CANCEL
      </button>
    </div>
  );
};

export default Popup;
