import React, { useContext, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"} </h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="d-flex flex-row ms-1 my-3 align-items-center justify-content-between">
            <div>
              {isLogin ? "Нет Аккаунта?" : "Есть Аккаунт Войдите"}{" "}
              <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                {isLogin ? "Зарегистрируйтесь!" : "Авторизируйтесь!"}
              </NavLink>
            </div>
            <Button
              variant="outline-success"
              className="d-flex align-self-end"
              onClick={click}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
