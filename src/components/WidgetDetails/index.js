import React, { useState } from "react";
import { Label, Row, Container, Answer, AnswerRow } from "./style";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import linkIcon from "../../assets/icons/link.svg";
import { Icon } from "./style";

const WidgetDetails = ({
  id: questionId,
  name,
  choices = [],
  preview = true,
  onSubmit,
  user,
  question,
}) => {
  const [answerId, setAnswerId] = useState("");

  const onSubmitHandler = () => {
    onSubmit({ id: questionId, user: user, answerId: answerId });
  };

  return (
    <Container>
        <Row>
            <Label>Poll preview</Label>
        </Row>
      <Row>
        <Label>id</Label>
        <span>{questionId}</span>
      </Row>
      <Row>
        <Label>Link (follow the link to vote)</Label>
        <Link to={`/poll/${questionId}`}>
          <Icon src={linkIcon} alt="" />
        </Link>
      </Row>
      <Row>
        <Label>Name</Label>
        <span>{name}</span>
      </Row>
      <Row>
        <Label>Question</Label>
        <span>{question}</span>
      </Row>

      <Row>
        {choices?.length > 0
          ? choices?.map(({ answer, id }) => (
              <AnswerRow key={id}>
                <input
                  id={id}
                  value={id}
                  checked={id === answerId}
                  onChange={() => {
                    setAnswerId(id);
                  }}
                  name={questionId}
                  type="radio"
                />
                <Answer htmlFor={id}>{answer}</Answer>
              </AnswerRow>
            ))
          : "N/A"}
      </Row>
      {!preview && <Button onClick={onSubmitHandler}>Submit</Button>}
    </Container>
  );
};

export default WidgetDetails;
