import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
  const [isModalCreateTypeVisible, setIsModalCreateTypeVisible] =
    useState(false);
  const [isModalCreateBrandVisible, setIsModalCreateBrandVisible] =
    useState(false);
  const [isModalCreateDeviceVisible, setIsModalCreateDeviceVisible] =
    useState(false);
  return (
    <Container>
      <Button onClick={() => setIsModalCreateTypeVisible(true)}>
        Добавить Тип
      </Button>
      <Button onClick={() => setIsModalCreateBrandVisible(true)}>
        Добавить Бренд
      </Button>
      <Button onClick={() => setIsModalCreateDeviceVisible(true)}>
        Добавить Устройство
      </Button>
      <CreateType
        show={isModalCreateTypeVisible}
        onHide={() => setIsModalCreateTypeVisible(false)}
      />
      <CreateBrand
        show={isModalCreateBrandVisible}
        onHide={() => setIsModalCreateBrandVisible(false)}
      />
      <CreateDevice
        show={isModalCreateDeviceVisible}
        onHide={() => setIsModalCreateDeviceVisible(false)}
      />
    </Container>
  );
};

export default Admin;
