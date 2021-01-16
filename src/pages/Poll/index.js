import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createWidget,
  deleteWidget,
  editWidget,
  getWidgets,
  selectWidget,
  saveWidget,
  updateInEditWidget,
} from "../../actions/widgets";
import { showModal } from "../../actions/ui";
import Header from "../../components/Header";
import WidgetDetails from "../../components/WidgetDetails";
import { Container, InnerContainer, WidgetDetailsWrapper } from "./style";
import { saveAnswer } from "../../actions/results";
import PollResults from "../../components/PollResults";

const Poll = ({ onGetWidgets, question, onSaveAnswer, polls }) => {
  const { id } = useParams();
  const user = useSelector((state) => state.user?.username);
  useEffect(() => {
    onGetWidgets(id);
  }, [onGetWidgets]);

  const onSubmit = (result) => {
    onSaveAnswer(result);
  };

  const userAnswered = () => {
    const poll = polls.find((p) => p.id === id);
    return poll?.results?.some((p) => p.user === user);
  };

  const findPoll = () => {
    return polls.find((p) => p.id === question.id);
  };

  return (
    <Container>
      <Header />
      <InnerContainer>
        <WidgetDetailsWrapper>
          {question && !userAnswered() && (
            <WidgetDetails
              id={question.id}
              name={question.name}
              question={question.question}
              choices={question.choices}
              user={user}
              preview={!Boolean(user)}
              onSubmit={onSubmit}
            />
          )}

          {question && user && userAnswered() && (
            <PollResults data={findPoll()?.results} id={findPoll()?.id} />
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
  onUpdateWidget: saveWidget,
  onEditWidget: editWidget,
  onUpdateInEditWidget: updateInEditWidget,
  onSelectWidget: selectWidget,
  onShowModal: showModal,
  onSaveAnswer: saveAnswer,
};

const mapStateToProps = ({ widgets, ui, results }) => {
  return {
    widgets: widgets?.widgets,
    selectedWidget: widgets?.selectedWidget,
    inEditWidget: widgets?.inEditWidget,
    isModalOpen: ui?.isModalOpen,
    question: widgets?.questionBeingAnswered,
    polls: results?.polls,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
