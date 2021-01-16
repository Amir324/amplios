import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  margin-left: 30px;
  @media (max-width: 700px) {
    margin-left: 0;
    padding-left: 0;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  margin: 0 10px 10px 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Answer = styled.label`
  width: 200px;
  height: 40px;
  display: flex;
  padding: 10px;
  justify-items: flex-start;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 10px;
  margin: 0 10px 0 10px;
`;

export const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const Icon = styled.img`
  height: 20px;
`;
