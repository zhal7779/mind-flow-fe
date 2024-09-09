import React, { forwardRef, useState } from "react";
import {
  NodeContainer,
  Node,
  NodeLine,
  RootTopicInput,
  MainTopicInput,
  ContentInput,
  ButtonWrapper,
  Button,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const NodeRender = forwardRef((props, ref) => {
  const { node, addNode, updateNodeInputValue, deleteNode } = props;

  const [rootActive, setRootActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddChild = (side) => {
    addNode(node.node, side);
  };

  const handleDeleteNode = (side) => {
    deleteNode(node.node, side);
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

  const leftChildNodeRender = (node.leftChildNode || []).map((child) => (
    <React.Fragment key={child.node}>
      <NodeRender
        node={child}
        addNode={addNode}
        updateNodeInputValue={updateNodeInputValue}
        deleteNode={deleteNode}
        side={"left"}
      />
    </React.Fragment>
  ));

  const rightChildNodeRender = (node.rightChildNode || []).map((child) => (
    <React.Fragment key={child.node}>
      <NodeRender
        node={child}
        addNode={addNode}
        updateNodeInputValue={updateNodeInputValue}
        deleteNode={deleteNode}
        side={"right"}
      />
    </React.Fragment>
  ));

  const childNodeRender = (node.childNode || []).map((child) => (
    <React.Fragment key={child.node}>
      <NodeRender
        node={child}
        addNode={addNode}
        updateNodeInputValue={updateNodeInputValue}
        deleteNode={deleteNode}
      />
    </React.Fragment>
  ));

  return (
    <NodeContainer ref={ref} $side={node.side} $isRoot={node.level === 0}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: node.side === "left" ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        {/* 왼쪽 자식 노드 렌더링 */}
        <div style={{ flex: 1, marginRight: "50px" }}>
          {node.level === 0 &&
            node.leftChildNode.length > 0 &&
            leftChildNodeRender}
        </div>

        {/* Root Topic */}
        <Node
          id={node.node}
          $level={node.level}
          onClick={() => node.node === 0 && setRootActive(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered &&
            (node.level === 0 ? (
              <ButtonWrapper>
                <Button
                  onClick={() => handleAddChild("left")}
                  style={{ right: "-1rem" }}
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
                <Button
                  onClick={() => handleDeleteNode("right")}
                  style={{ right: "-1rem" }}
                  $size={2}
                  $color={"var(--color-red)"}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button
                  onClick={() => handleAddChild("right")}
                  style={{ right: "-4rem" }}
                  $size={2.6}
                  $color={"var(--color-blue)"}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </ButtonWrapper>
            ) : node.level !== 0 && node.side === "right" ? (
              <ButtonWrapper>
                <Button
                  onClick={() => handleDeleteNode(node.side)}
                  style={{ right: "-1rem" }}
                  $size={2}
                  $color={"var(--color-red)"}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button
                  onClick={() => handleAddChild(node.side)}
                  style={{ right: "-4rem" }}
                  $size={2.6}
                  $color={"var(--color-blue)"}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper>
                <Button
                  onClick={() => handleAddChild(node.side)}
                  style={{ right: "-4rem" }}
                  $size={2.6}
                  $color={"var(--color-blue)"}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button
                  onClick={() => handleDeleteNode(node.side)}
                  style={{ right: "-1rem" }}
                  $size={2}
                  $color={"var(--color-red)"}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
              </ButtonWrapper>
            ))}

          {/* Root Topic Input */}
          {node.level === 0 ? (
            <RootTopicInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node)}
              value={node.value}
              placeholder="메인 주제를 입력해주세요"
            />
          ) : node.level === 1 ? (
            <MainTopicInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node)}
              value={node.value}
              placeholder="브랜치 주제를 입력해주세요"
            />
          ) : (
            <ContentInput
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node)}
              value={node.value}
              placeholder="내용을 입력해주세요"
            />
          )}
          {node.node > 0 && <NodeLine {...lineProps} />}
        </Node>

        {/* 오른쪽 자식 노드 렌더링 */}
        <div style={{ flex: 1, marginLeft: "50px" }}>
          {node.level === 0 &&
            node.rightChildNode.length > 0 &&
            rightChildNodeRender}
        </div>

        {/* 자식 노드 렌더링 */}
        <div style={{ flex: 1 }}>
          {node.level > 0 && node.childNode.length > 0 && childNodeRender}
        </div>
      </div>
    </NodeContainer>
  );
});

export default NodeRender;
