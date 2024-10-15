import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteQuizModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteQuizModal;
