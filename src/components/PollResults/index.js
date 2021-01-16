import React from "react";
import { useSelector } from "react-redux";
import { Choice, Column, Result, ResultsWrapper, Value, Title } from "./style";

const PollResults = ({ data = [], id }) => {
  const allQuestions = useSelector((state) => state.widgets.allQuestions);
  const allChoices = useSelector((state) => state.widgets.allChoices);

  const countEachAnswer = () => {
    const totalByAnswers = data?.reduce((acc, r) => {
      if (acc[r.answerId]) {
        acc[r.answerId]++;
        return acc;
      }
      acc[r.answerId] = 1;
      return acc;
    }, {});
    return totalByAnswers;
  };

  const calculatePercentage = (val) => {
    const total = data?.length;

    let value = (val / total) * 100;
    if (Math.round(value) !== value) value = ((val / total) * 100).toFixed(1);
    return value + "%";
  };

  return (
    <div>
      <Title>Poll results</Title>
      <Title>Question: </Title>
      {allQuestions[id]}
      <Title>Results </Title>
      {Object.entries(countEachAnswer()).map(([k, v]) => {
        return (
          <ResultsWrapper>
            <Result>
              <Column>
                <Choice>{allChoices[k]}</Choice>
              </Column>
              <Column>
                Answers <Value>{v}</Value>
              </Column>
              <Column>
                <Value>{calculatePercentage(v)}</Value>
              </Column>
            </Result>
          </ResultsWrapper>
        );
      })}
    </div>
  );
};

export default PollResults;
