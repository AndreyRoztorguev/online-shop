import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import {
  createDevice,
  fetchBrands,
  fetchDevices,
  fetchTypes,
} from "../../http/deviceAPI";

const CreateDevice = observer(({ show, onHide }) => {
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices().then((data) => device.setDevices(data.rows));
  }, []);

  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("typeId", device.selectedType.id);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить Девайс</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {device.selectedType.name || "Выберите Тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Выберите Бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            className="mt-3"
            placeholder="Введите стоимость устройства"
          />
          <Form.Control
            type="file"
            className="mt-3"
            onChange={selectFile}
            placeholder="Введите название устройства"
          />
          <hr />
          <Button onClick={addInfo}>Добавить новое свойство</Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(event) =>
                    changeInfo("title", event.target.value, i.number)
                  }
                  placeholder="Введите название характеристики"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(event) =>
                    changeInfo("description", event.target.value, i.number)
                  }
                  placeholder="Введите описание"
                />
              </Col>
              <Col md={4}>
                <Button onClick={() => removeInfo(i.number)}>Удалить</Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
