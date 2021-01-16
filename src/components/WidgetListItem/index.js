import React from "react";
import { useSelector } from "react-redux";
import { SmallButton } from "../SmallButton";
import { Icon, Container, WidgetName, Wrapper } from "./style";
import deleteIcon from "../../assets/icons/delete.svg";

const WidgetListItem = ({ id, name, onSelect, onDelete }) => {
  const selectedWidget = useSelector(({ widgets }) => widgets?.selectedWidget);
  return (
    <Container
      selectedWidgetId={selectedWidget?.id}
      id={id}
      onClick={() => onSelect(id)}
    >
      <WidgetName>{name}</WidgetName>
      <Wrapper>
        <SmallButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <Icon src={deleteIcon} alt="" />
        </SmallButton>
      </Wrapper>
    </Container>
  );
};

export default WidgetListItem;
