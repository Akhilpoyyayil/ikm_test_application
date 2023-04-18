import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import AppHeader from "../layout/AppHeader";
import editIcon from "../asset/edit.png";
import deleteIcon from "../asset/delete.png";
import "./home.css";

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modelStatus, setModelStatus] = useState(false);
  const [addEditType, setAddEditType] = useState("");
  const [formData, setFormData] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState([
    {
      id: 1,
      code: "ABC123",
      description: "Product A",
    },
    {
      id: 2,
      code: "DEF456",
      description: "Product B",
    },
    {
      id: 3,
      code: "GHI789",
      description: "Product C",
    },
    {
      id: 4,
      code: "JKL012",
      description: "Product D",
    },
    {
      id: 5,
      code: "MNO345",
      description: "Product E",
    },
    {
      id: 6,
      code: "PQR678",
      description: "Product F",
    },
    {
      id: 7,
      code: "STU901",
      description: "Product G",
    },
    {
      id: 8,
      code: "VWX234",
      description: "Product H",
    },
    {
      id: 9,
      code: "YZA567",
      description: "Product I",
    },
    {
      id: 10,
      code: "BCD890",
      description: "Product J",
    },
  ]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setAddEditType("Edit Data");
    const itemToEdit = setFormData(data.find((item) => item.id === id));
    setModelStatus(!modelStatus);
  };

  const handleAdd = () => {
    setModelStatus(!modelStatus);
    setAddEditType("Add Data");
    setFormData({});
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClose = () => setModelStatus(false);

  const handleSave = () => {
    const newData = [...data];
    if (addEditType === "Add Data") {
      newData.push({ ...formData, id: data.length + 1 });
    } else {
      const index = newData.findIndex((item) => item.id === formData.id);
      if (index !== -1) {
        newData[index] = {
          ...newData[index],
          code: formData.code,
          description: formData.description,
        };
      }
    }
    setData(newData);
    setModelStatus(false);
  };

  const renderTableData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((item) => (
      <tr key={item.id}>
        <td>{item.code}</td>
        <td>{item.description}</td>
        <td>
          <Button variant="primary" onClick={() => handleEdit(item.id)}>
            <img src={editIcon} alt="My Icon" />
          </Button>
          <Button variant="danger" onClick={() => handleDelete(item.id)}>
            <img src={deleteIcon} alt="My Icon" />
          </Button>
        </td>
      </tr>
    ));
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th>Code</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    );
  };

  const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Row>
        <Col xs={1}>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Select>
        </Col>
        <Col xs={11} className="containers">
          <div className="pagination">
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={
                  currentPage === pageNumber ? "primary" : "outline-primary"
                }
                onClick={() => handlePaginationClick(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <AppHeader />
      <Container className="content">
        <Row>
          <Col xs={6}>
            <h2>Section Code</h2>
          </Col>
          <Col xs={6} className="containers">
            <Button
              className="ml-auto"
              variant="primary"
              onClick={() => handleAdd()}
            >
              + Section Code
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="table-container">
            <Table striped bordered hover>
              <thead>{renderTableHeader()}</thead>
              <tbody>{renderTableData()}</tbody>
            </Table>
            {renderPagination()}
          </Col>
        </Row>
      </Container>
      <Modal show={modelStatus} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter the Code"
            aria-label="Enter the Code"
            name="code"
            onChange={(e) => handleInputChange(e)}
            value={formData?.code}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Enter the Description"
            aria-label="Enter the Description"
            onChange={(e) => handleInputChange(e)}
            name="description"
            value={formData?.description}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            {addEditType}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaginatedTable;
