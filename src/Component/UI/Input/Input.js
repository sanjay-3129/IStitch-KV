import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId={props.id}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.Value}
          name={props.name}
        />
        {props.isText && (
          <Form.Text className="text-muted">{props.text}</Form.Text>
        )}
      </Form.Group>
    </div>
  );
};

export default Input;
