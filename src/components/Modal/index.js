import React from "react";
import { connect } from "react-redux";
import { showModal } from "../../actions/ui";
import { Backdrop, CloseButton, Container, InnerContainer } from "./style";

const Modal = ({ children, onShowModal }) => {
  return (
    <Container>
      <Backdrop onClick={() => onShowModal(false)} />
      <InnerContainer>
        <CloseButton onClick={() => onShowModal(false)}>X</CloseButton>
        {children}
      </InnerContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  onShowModal: showModal,
};

export default connect(null, mapDispatchToProps)(Modal);
