import React, { useState } from "react";
import {
  Node,
  RootTopicInput,
  ButtonWrapper,
  Button,
} from "../NodeRender/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const RootNodeRender = ({
  tree,
  addNode,
  deleteNode,
  updateNodeInputValue,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Node
      id={0}
      $level={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <ButtonWrapper>
          <Button
            onClick={() => addNode(0, "left")}
            style={{ right: "-1rem" }}
            $size={2.6}
            $color={"var(--color-blue)"}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button
            onClick={() => deleteNode(0, "left")}
            style={{ right: "-1rem" }}
            $size={2}
            $color={"var(--color-red)"}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button
            onClick={() => deleteNode(0, "right")}
            style={{ right: "-1rem" }}
            $size={2}
            $color={"var(--color-red)"}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button
            onClick={() => addNode(0, "right")}
            style={{ right: "-4rem" }}
            $size={2.6}
            $color={"var(--color-blue)"}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonWrapper>
      )}
      <RootTopicInput
        rows={1}
        onChange={(e) => updateNodeInputValue(e, tree, null)}
        value={tree.value}
        placeholder="메인 주제를 입력해주세요"
      />
    </Node>
  );
};

export default RootNodeRender;
