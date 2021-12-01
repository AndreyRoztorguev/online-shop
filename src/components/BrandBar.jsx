import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex flex-row mt-2">
      {device.brands.map((brand) => {
        return (
          <Card
            border={brand.id === device.selectedBrand.id ? "danger" : "light"}
            style={{ cursor: "pointer" }}
            key={brand.id}
            className="p-3"
            onClick={() => device.setSelectedBrand(brand)}
          >
            {brand.name}
          </Card>
        );
      })}
    </Row>
  );
});

export default BrandBar;
