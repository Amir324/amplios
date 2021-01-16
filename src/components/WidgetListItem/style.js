import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  width: 160px;
  
    &:hover {
    background-color: #f3f3f3;
  }
  background-color: ${({selectedWidgetId, id}) => selectedWidgetId === id ? "#f3f3f3" : "#ffffff"};
  margin-bottom: 10px;
`;

export const WidgetName = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  color: #212529;
  font-weight: 600;
  margin: 10px 10px 10px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
`;

export const Icon = styled.img`
  width: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
