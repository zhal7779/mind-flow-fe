import React, { useState } from "react";

import {
  DirectionNodeContainer,
  Node,
  MainTopicInput,
  ContentInput,
  ButtonWrapper,
  Button,
  NodeLine,
} from "../../styles/NodeCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const LeftNodeRender = (props) => {
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

  const { x: x1, y: y1 } = node.parentNode.position;

  const {
    x: x2,
    y: y2,
    r: r2,
    t: t2,
  } = node.position || { x: 0, y: 0, r: 0, t: 0 };

  const lineProps = {
    $top: t2,
    $right: r2,
    $width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
    $angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
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
    <DirectionNodeContainer $side={"left"}>
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
          {node.node > 0 && <NodeLine {...lineProps} $direction={"left"} />}
        </Node>
      </div>

      {node.childNode.length > 0 && <div>{leftChildNodeRender}</div>}
    </DirectionNodeContainer>
  );
};

export default LeftNodeRender;
