import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { DEVICE_ROUTE } from "../utils/constants";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col md={3} onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
      <Card style={{ width: "150px", cursor: "pointer" }} border="light">
        <Image
          width="150px"
          height="150px"
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="d-flex justify-content-between align-items-center text-black-50"></div>
        <div className="d-flex">
          <div>{device.rating}</div>
          <Image src="" />
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
