import React from "react";
// import { propTypes } from "react-bootstrap/esm/Image";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmModal = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure want to delete it?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => props.confirmDelete(props.deleteId)}
        >
          Delete
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
