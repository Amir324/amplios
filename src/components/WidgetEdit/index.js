import React, { useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  selectWidget,
  updateInEditWidget,
  saveWidget,
  addAnswerOptionInEditWidget,
  deleteAnswerOptionToInEditWidget,
} from "../../actions/widgets";
import { showModal } from "../../actions/ui";
import { Button } from "../Button";
import { Input } from "../Input";
import { SmallButton } from "../SmallButton";
import { WIDGET } from "../../constants/widgets";
import { Error, Label, Row } from "./style";

const WidgetEdit = ({
  inEditWidget,
  onUpdateWidget,
  onUpdateInEditWidget,
  onShowModal,
  onAddAnswerOption,
  onDeleteAnswerOption,
  user,
}) => {
  const [error, setError] = useState(null);

  const onChangeHandler = (e, i) => {
    setError(null);
    const cloneInEditWidget = _.cloneDeep(inEditWidget);

    cloneInEditWidget.user = user;

    const { name, value } = e.target;
    if (name === WIDGET.answer) {
      const updatedEntries = cloneInEditWidget.choices.map((entry, index) =>
        index === i ? { ...entry, [name]: value } : entry
      );
      cloneInEditWidget.choices = updatedEntries;
      onUpdateInEditWidget(cloneInEditWidget);
      return;
    }

    cloneInEditWidget[name] = value;
    onUpdateInEditWidget(cloneInEditWidget);
  };

  const onSaveHandler = () => {
    if (!validatePoll()) {
      setError("Invalid form");
      return;
    }
    onUpdateWidget(inEditWidget);
    onShowModal(false);
  };

  const validatePoll = () => {
    let validChoicesAmount = inEditWidget?.choices?.length > 1;
    let validChoicesValue = inEditWidget?.choices?.every(
      (c) => c?.answer?.length > 0
    );
    let validName = inEditWidget?.name;
    let validQuestion = inEditWidget?.question;

    return (
      validChoicesAmount && validChoicesValue && validName && validQuestion
    );
  };

  const addKeyValueRow = () => {
    onAddAnswerOption();
  };

  const deleteKeyValueRow = (index) => {
    onDeleteAnswerOption(index);
  };

  return (
    <div>
      <Row>
        <Label>Poll name (required)</Label>
        <Input
          name={WIDGET.name}
          onChange={onChangeHandler}
          value={inEditWidget?.name}
        />
      </Row>
      <Row>
        <Label>Question (required)</Label>
        <Input
          name={WIDGET.question}
          onChange={onChangeHandler}
          value={inEditWidget?.question}
        />
      </Row>
      <Row>
        <Label>Answer options (min 2 options required)</Label>

        {inEditWidget?.choices?.map(({ answer, id }, index) => (
          <div key={index}>
            <Input
              name={WIDGET.answer}
              onChange={(e) => onChangeHandler(e, index)}
              value={answer}
            />
            <SmallButton onClick={() => deleteKeyValueRow(index)}>
              x
            </SmallButton>
          </div>
        ))}
        <span>
          <SmallButton onClick={addKeyValueRow}>Add</SmallButton>
        </span>
      </Row>
      <Button onClick={onSaveHandler}>Create Poll</Button>
      {error && <Error>{error}</Error>}
    </div>
  );
};

const mapDispatchToProps = {
  onUpdateWidget: saveWidget,
  onUpdateInEditWidget: updateInEditWidget,
  onShowModal: showModal,
  onSelectWidget: selectWidget,
  onAddAnswerOption: addAnswerOptionInEditWidget,
  onDeleteAnswerOption: deleteAnswerOptionToInEditWidget,
};

const mapStateToProps = (state) => ({
  inEditWidget: state.widgets?.inEditWidget,
  user: state.user?.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(WidgetEdit);
