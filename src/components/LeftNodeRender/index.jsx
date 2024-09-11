import React, { useState } from "react";

import {
  LeftNodeContainer,
  Node,
  MainTopicInput,
  ContentInput,
  ButtonWrapper,
  Button,
} from "../NodeRender/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const LeftNodeRender = (props) => {
  console.log(props);
  const { node, addNode, updateNodeInputValue, deleteNode } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddChild = () => {
    addNode(node.node, "left");
  };

  const handleDeleteNode = () => {
    deleteNode(node.node, "left");
  };

  const leftChildNodeRender = node.childNode.map((child) => (
    <LeftNodeRender
      node={child}
      addNode={addNode}
      updateNodeInputValue={updateNodeInputValue}
      deleteNode={deleteNode}
    />
  ));

  return (
    <LeftNodeContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          flexDirection: "row",
          alignItems: "center",
          marginRight: "50px",
        }}
      >
        <Node
          id={node.node}
          $level={node.level}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && (
            <ButtonWrapper>
              <Button
                onClick={handleAddChild}
                style={{ right: "-4rem" }}
                $size={2.6}
                $color={"var(--color-blue)"}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button
                onClick={() => handleDeleteNode("left")}
                style={{ right: "-1rem" }}
                $size={2}
                $color={"var(--color-red)"}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </ButtonWrapper>
          )}
          {node.level === 1 ? (
            <MainTopicInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node, "left")}
              value={node.value}
              placeholder="브랜치 주제를 입력해주세요"
            />
          ) : (
            <ContentInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node, "left")}
              value={node.value}
              placeholder="내용을 입력해주세요"
            />
          )}
        </Node>
      </div>

      {node.childNode.length > 0 && <div>{leftChildNodeRender}</div>}
    </LeftNodeContainer>
  );
};

export default LeftNodeRender;
