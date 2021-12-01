import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Button, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState({ info: [] });

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            style={{ border: "1px solid red" }}
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col style={{ border: "1px solid red" }} md={4}>
          <div className="">
            <h2>{device.name}</h2>
            <div>Рейтинг: {device.rating}</div>
          </div>
        </Col>
        <Col md={4}>
          <Card>
            <h3>{device.price}</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <h1>Характеристики</h1>
        {device.info.map((info) => (
          <Row key={info.id}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
