import React from "react";
import { connect } from "react-redux";
import {
  createWidget,
  deleteWidget,
  getWidgets,
  selectWidget,
  updateInEditWidget,
} from "../../actions/widgets";
import { showModal } from "../../actions/ui";
import Header from "../../components/Header";
import WidgetListItem from "../../components/WidgetListItem";
import WidgetDetails from "../../components/WidgetDetails";
import Modal from "../../components/Modal";
import WidgetEdit from "../../components/WidgetEdit";
import { Button } from "../../components/Button";
import {
  Container,
  InnerContainer,
  WidgetDetailsWrapper,
  WidgetListWrapper,
  NoSelectedWidget,
} from "./style";

const Home = ({
  widgets,
  onSelectWidget,
  onDeleteWidget,
  selectedWidget,
  isModalOpen,
  onShowModal,
  onCreateWidget,
  user,
}) => {

  const onCreateHandler = () => {
    onShowModal(true);
    onCreateWidget();
  };

  if (!user) {
    return (
      <Container>
        <Header />
        <InnerContainer>Please login</InnerContainer>
      </Container>
    );
  }

  return (
    <Container>
      {isModalOpen && (
        <Modal>
          <WidgetEdit />
        </Modal>
      )}
      <Header />
      <InnerContainer>
        <WidgetListWrapper>
          {widgets
            .filter((i) => i.user === user)
            .map(({ id, name }) => (
              <WidgetListItem
                key={id}
                id={id}
                name={name}
                onSelect={onSelectWidget}
                onDelete={onDeleteWidget}
              />
            ))}
          <Button onClick={onCreateHandler}>+ New Poll</Button>
        </WidgetListWrapper>

        <WidgetDetailsWrapper>
          {selectedWidget?.id ? (
            <WidgetDetails
              id={selectedWidget?.id}
              name={selectedWidget?.name}
              question={selectedWidget?.question}
              choices={selectedWidget?.choices}
            />
          ) : (
            <NoSelectedWidget>Select or create poll</NoSelectedWidget>
          )}
        </WidgetDetailsWrapper>
      </InnerContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  onGetWidgets: getWidgets,
  onDeleteWidget: deleteWidget,
  onCreateWidget: createWidget,
  onUpdateInEditWidget: updateInEditWidget,
  onSelectWidget: selectWidget,
  onShowModal: showModal,
};

const mapStateToProps = ({ widgets, ui, user }) => {
  return {
    widgets: widgets?.widgets,
    selectedWidget: widgets?.selectedWidget,
    inEditWidget: widgets?.inEditWidget,
    isModalOpen: ui?.isModalOpen,
    user: user?.username,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
