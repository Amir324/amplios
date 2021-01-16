import styled from "styled-components";

export const Container = styled.div``;

export const InnerContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  min-height: calc(100vh - 80px);
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const WidgetListWrapper = styled.div`
  position: relative;
`;

export const WidgetDetailsWrapper = styled.div`
  flex: 1 1 auto;
`;

export const NoSelectedWidget = styled.div`
  margin: 10px;
  text-align: center;
`;

export const LoginWrapper = styled.div`
display: flex;
align-items: center;
margin-left: auto;
`
