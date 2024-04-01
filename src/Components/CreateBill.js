import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [customers, setCustomers] = useState();
  const [billData, setBillData] = useState({
    billNumber: `${new Date().getFullYear()}${Math.floor(
      Math.random() * 10000
    )}`,
    billDate: new Date().toLocaleDateString("en-CA"),
    customerID: "",
    netAmount: "",
    totalDiscountAmount: "0",
    Remarks: "",
    billItems: [
      {
        descr: "",
        rate: 0,
        qty: 0,
        amount: 0,
      },
    ],
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const getBillById = async () => {
    try {
      const response = await axios.get(
        `https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/GetModel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const billDataById = response.data;
      setBillData({
        ...billDataById,
        Remarks: billDataById.remarks,
        billNumber: billDataById.billNo,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      getBillById();
    }
  }, []);

  const totalAmount = billData.billItems.reduce(
    (total, row) => total + row.amount,
    0
  );
  const netAmount = totalAmount - billData.totalDiscountAmount;

  const getCustomers = async () => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        axios
          .get(
            "https://reacttestprojectapi.azurewebsites.net/api/CustomerManagement/Customer/GetList",
            config
          )
          .then((response) => {
            const newArray = response.data.map((item) => ({
              value: item.customerID,
              label: item.customerName,
            }));
            setCustomers(newArray);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {}
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);

  const handleCustomerChange = (selectedOption) => {
    setBillData({ ...billData, customerID: selectedOption.value });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...billData.billItems];
    updatedRows[index][field] = value;

    const amount = updatedRows[index].rate * updatedRows[index].qty;
    updatedRows[index].amount = isNaN(amount) ? 0 : amount;

    setBillData({ ...billData, billItems: updatedRows });
  };

  const handleAddRow = () => {
    setBillData({
      ...billData,
      billItems: [
        ...billData.billItems,
        { descr: "", rate: 0, qty: 0, amount: 0 },
      ],
    });
  };

  const handleRemarksChange = (value) => {
    setBillData({ ...billData, Remarks: value });
  };

  useEffect(() => {
    setBillData({ ...billData, netAmount: netAmount });
  }, [netAmount]);

  const handleNetAmount = () => {
    setBillData({ ...billData, netAmount: netAmount });
  };

  const handleSubmit = async () => {
    if (id) {
      try {
        const response = await axios.put(
          "https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/Update",
          {
            billID: id,
            billNo: Number(billData.billNumber),
            billDate: billData.billDate,
            customerID: billData.customerID,
            netAmount: billData.netAmount,
            totalDiscountAmount: billData.totalDiscountAmount,
            Remarks: billData.Remarks,
            billItems: billData.billItems,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/bill");
      } catch (error) {
        console.error("Error making API request:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "https://reacttestprojectapi.azurewebsites.net/api/BillManagement/Bill/Insert",
          {
            billNo: Number(billData.billNumber),
            billDate: billData.billDate,
            customerID: billData.customerID,
            netAmount: billData.netAmount,
            totalDiscountAmount: billData.totalDiscountAmount,
            Remarks: billData.Remarks,
            billItems: billData.billItems,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/bill");
      } catch (error) {
        console.error("Error making API request:", error);
      }
    }
  };

  return (
    <div>
      <Container>
        <h2>Create Bill</h2>
        <Form className="container">
          <Form.Group controlId="formBillNumber">
            <Form.Label>Bill Number</Form.Label>
            <Form.Control type="text" readOnly value={billData.billNumber} />
          </Form.Group>
          <Form.Group controlId="formBillDate">
            <Form.Label>Bill Date</Form.Label>
            <DatePicker
              selected={new Date(billData.billDate)}
              onChange={(date) =>
                setBillData({
                  ...billData,
                  billDate: date.toLocaleDateString("en-CA"),
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formCustomer">
            <Form.Label>Customer</Form.Label>
            <Select
              options={customers}
              value={
                customers &&
                customers.find(
                  (customer) => customer.value === billData.customerID
                )
              }
              onChange={handleCustomerChange}
            />
          </Form.Group>
          <Form.Group controlId="formRows">
            <Form.Label>Bill Rows</Form.Label>
            {billData.billItems.map((row, index) => (
              <Row key={index}>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={row.descr}
                    onChange={(e) =>
                      handleRowChange(index, "descr", e.target.value)
                    }
                    name={`descr_${index}`}
                    id={`descr_${index}`}
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
            <ReactQuill
              value={billData.Remarks}
              onChange={handleRemarksChange}
            />
          </Form.Group>
          <Form.Group controlId="formTotalAmount">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" readOnly value={totalAmount.toFixed(2)} />
          </Form.Group>
          <Form.Group controlId="formNetAmount">
            <Form.Label>Net Amount</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={netAmount.toFixed(2)}
              onChange={handleNetAmount}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateBill;
