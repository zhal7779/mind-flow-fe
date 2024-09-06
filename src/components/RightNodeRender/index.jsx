import React, { forwardRef, useState } from "react";
import {
  NodeContainer,
  Node,
  NodeLine,
  MainTopicInput,
  ContentInput,
  ButtonWrapper,
  Button,
} from "../NodeRender/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const RightNodeRender = forwardRef((props, ref) => {
  const { node, addNode, updateNodeInputValue, deleteNode } = props;
  console.log(node);

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

  return (
    <NodeContainer ref={ref}>
      <Node
        id={node.node}
        $level={node.level}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
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
        )}

        {node.level === 1 ? (
          <MainTopicInput
            rows={1}
            onChange={(e) => updateNodeInputValue(e, node)}
            value={node.value}
            placeholder="브랜치 주제를 입력해주세요"
          ></MainTopicInput>
        ) : (
          <ContentInput
            rows={1}
            onChange={(e) => updateNodeInputValue(e, node)}
            value={node.value}
            placeholder="내용을 입력해주세요"
          ></ContentInput>
        )}
        {node.node > 0 && <NodeLine {...lineProps} />}
      </Node>
      <div style={{ marginLeft: "100px" }}>
        <React.Fragment key={node.node}>
          <RightNodeRender
            node={node}
            addNode={addNode}
            updateNodeInputValue={updateNodeInputValue}
            deleteNode={deleteNode}
          />
        </React.Fragment>
      </div>
    </NodeContainer>
  );
});

export default RightNodeRender;
