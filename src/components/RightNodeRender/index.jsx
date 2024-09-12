import React, { useState } from "react";

import {
  DirectionNodeContainer,
  Node,
  MainTopicInput,
  ContentInput,
  ButtonWrapper,
  Button,
} from "../../styles/NodeCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const RightNodeRender = (props) => {
  const { node, addNode, updateNodeInputValue, deleteNode } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddChild = () => {
    addNode(node.node, "right");
  };

  const handleDeleteNode = () => {
    deleteNode(node.node, "right");
  };

  const rightChildNodeRender = node.childNode.map((child) => (
    <RightNodeRender
      node={child}
      addNode={addNode}
      updateNodeInputValue={updateNodeInputValue}
      deleteNode={deleteNode}
    />
  ));

  return (
    <DirectionNodeContainer $side={"right"}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "50px",
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
                onClick={() => handleDeleteNode("right")}
                style={{ right: "-1rem" }}
                $size={2}
                $color={"var(--color-red)"}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button
                onClick={handleAddChild}
                style={{ right: "-4rem" }}
                $size={2.6}
                $color={"var(--color-blue)"}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </ButtonWrapper>
          )}
          {node.level === 1 ? (
            <MainTopicInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node, "right")}
              value={node.value}
              placeholder="브랜치 주제를 입력해주세요"
            />
          ) : (
            <ContentInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node, "right")}
              value={node.value}
              placeholder="내용을 입력해주세요"
            />
          )}
        </Node>
      </div>

      {node.childNode.length > 0 && <div>{rightChildNodeRender}</div>}
    </DirectionNodeContainer>
  );
};

export default RightNodeRender;
