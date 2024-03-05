import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";

const CreateBill = () => {
  const [bill, setBill] = useState({
    billNumber: `B${new Date().getFullYear()}${Math.floor(
      Math.random() * 10000
    )}`, // Auto-generate Bill Number
    billDate: new Date(),
    customer: null,
    rows: [
      {
        description: "",
        rate: 0,
        qty: 0,
        amount: 0,
      },
    ],
    remarks: "",
  });

  const customers = [
    { value: 1, label: "John Doe" },
    { value: 2, label: "Jane Smith" },
    // Add more customers as needed
  ];

  const handleCustomerChange = (selectedOption) => {
    setBill({ ...bill, customer: selectedOption });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...bill.rows];
    updatedRows[index][field] = value;

    // Auto-calculate amount
    const amount = updatedRows[index].rate * updatedRows[index].qty;
    updatedRows[index].amount = isNaN(amount) ? 0 : amount;

    setBill({ ...bill, rows: updatedRows });
  };

  const handleAddRow = () => {
    setBill({
      ...bill,
      rows: [...bill.rows, { description: "", rate: 0, qty: 0, amount: 0 }],
    });
  };

  const handleRemarksChange = (value) => {
    setBill({ ...bill, remarks: value });
  };

  // Auto-calculate total and net amount
  const totalAmount = bill.rows.reduce((total, row) => total + row.amount, 0);
  const netAmount = totalAmount; // You can add more calculations if needed

  return (
    <Container>
      <h2>Create Bill</h2>
      <Form>
        <Form.Group controlId="formBillNumber">
          <Form.Label>Bill Number</Form.Label>
          <Form.Control type="text" readOnly value={bill.billNumber} />
        </Form.Group>
        <Form.Group controlId="formBillDate">
          <Form.Label>Bill Date</Form.Label>
          <DatePicker
            selected={bill.billDate}
            onChange={(date) => setBill({ ...bill, billDate: date })}
          />
        </Form.Group>
        <Form.Group controlId="formCustomer">
          <Form.Label>Customer</Form.Label>
          <Select
            options={customers}
            value={bill.customer}
            onChange={handleCustomerChange}
          />
        </Form.Group>
        <Form.Group controlId="formRows">
          <Form.Label>Bill Rows</Form.Label>
          {bill.rows.map((row, index) => (
            <Row key={index}>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={row.description}
                  onChange={(e) =>
                    handleRowChange(index, "description", e.target.value)
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Rate"
                  value={row.rate}
                  onChange={(e) =>
                    handleRowChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Qty"
                  value={row.qty}
                  onChange={(e) =>
                    handleRowChange(index, "qty", parseFloat(e.target.value))
                  }
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  readOnly
                  value={row.amount.toFixed(2)}
                />
              </Col>
            </Row>
          ))}
          <Button variant="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Form.Group>
        <Form.Group controlId="formRemarks">
          <Form.Label>Remarks</Form.Label>
          <ReactQuill value={bill.remarks} onChange={handleRemarksChange} />
        </Form.Group>
        <Form.Group controlId="formTotalAmount">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control type="text" readOnly value={totalAmount.toFixed(2)} />
        </Form.Group>
        <Form.Group controlId="formNetAmount">
          <Form.Label>Net Amount</Form.Label>
          <Form.Control type="text" readOnly value={netAmount.toFixed(2)} />
        </Form.Group>
        <Button variant="primary" onClick={() => console.log(bill)}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBill;
