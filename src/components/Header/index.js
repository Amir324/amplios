import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_WIDGET } from "../../constants/widgets";
import {LOGIN, LOGOUT} from "../../constants/user";
import {Input} from "../Input";
import {Button} from "../Button";
import {LoginWrapper} from "../../pages/Home/style";
import {Icon, Title, Container, User} from "./style";
import chartIcon from "../../assets/icons/chart.svg";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.username);

  const [username, setUsername] = useState("");

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
    dispatch({ type: SELECT_WIDGET });
  };

  const loginHandler = () => {
    dispatch({ type: LOGIN, username: username });
  };

  return (
    <Container>
      <Icon src={chartIcon} alt="" />
      <Title onClick={() => history.push("/")}>Polls app</Title>
      {!user ? (
        <LoginWrapper>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <Button onClick={loginHandler}>Login</Button>
        </LoginWrapper>
      ) : (
        <LoginWrapper>
          <User>{user}</User>
          <Button onClick={logoutHandler}>Logout</Button>
        </LoginWrapper>
      )}
    </Container>
  );
};

export default Header;
