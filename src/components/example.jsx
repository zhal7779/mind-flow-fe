import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Line = ({ from, to }) => {
  console.log(from, to);
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

const TreeNode = ({ node, addNode, updateNodePosition, deleteNode }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (nodeRef.current) {
        const { top, left, width, height } =
          nodeRef.current.getBoundingClientRect();
        const newPosition = {
          x: left + width / 2,
          y: top + height / 2,
        };
        if (
          !node.position ||
          node.position.x !== newPosition.x ||
          node.position.y !== newPosition.y
        ) {
          updateNodePosition(node.node, newPosition);
        }
      }
    };

    // Initial position update
    updatePosition();
  }, [node.node, node.position, updateNodePosition]);
  const handleAddChild = () => {
    addNode(node.node);
  };

  const handleDeleteNode = () => {
    deleteNode(node.node);
  };

  return (
    <NodeContainer>
      <Node ref={nodeRef}>
        <Button
          onClick={handleAddChild}
          style={{ right: "-4rem" }}
          $size={2.6}
          $color={"var(--color-blue)"}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          onClick={handleDeleteNode}
          style={{ right: "-1.5rem" }}
          $size={2}
          $color={"var(--color-red)"}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <NodeText>{node.title}</NodeText>
        <NodeLine></NodeLine>
      </Node>
      {node.childNode.length > 0 && (
        <div style={{ marginLeft: "50px" }}>
          {node.childNode.map((child) => (
            <React.Fragment key={child.node}>
              {child.position &&
                child.position.left !== 0 &&
                child.position.top !== 0 && (
                  <Line from={node.position} to={child.position} />
                )}
              <TreeNode
                node={child}
                addNode={addNode}
                updateNodePosition={updateNodePosition}
                deleteNode={deleteNode}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </NodeContainer>
  );
};

const Example = () => {
  const [tree, setTree] = useState({
    title: "Root",
    node: 0,
    position: { x: 0, y: 0 },
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  function addNode(targetNode) {
    const updateTree = (tree, level) => {
      if (tree.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
          node: nodeValue,
          position: { x: 0, y: 0 },
          childNode: [],
        };
        return {
          ...tree,
          childNode: [...tree.childNode, newNode],
        };
      }
      return {
        ...tree,
        childNode: tree.childNode.map((child) => updateTree(child, level + 1)),
      };
    };
    setTree((prevTree) => updateTree(prevTree, 1));
    setNodeValue((prevValue) => prevValue + 1);
  }

  const updateNodePosition = (node, position) => {
    const updatePosition = (tree) => {
      if (tree.node === node) {
        return { ...tree, position };
      }
      return { ...tree, childNode: tree.childNode.map(updatePosition) };
    };
    setTree((prevTree) => updatePosition(prevTree));
  };

  function deleteNode(targetNode) {
    const updateTree = (tree) => {
      if (tree.node === targetNode) {
        return { ...tree, childNode: [] };
      }
      return {
        ...tree,
        childNode: tree.childNode.map((child) => updateTree(child)),
      };
    };
    setTree((prevTree) => updateTree(prevTree));
  }

  return (
    <TreeContainer>
      <TreeNode
        node={tree}
        addNode={addNode}
        updateNodePosition={updateNodePosition}
        deleteNode={deleteNode}
      />
    </TreeContainer>
  );
};

export default Example;
const TreeContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5rem;
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px;
  padding: 15px;
  position: relative;
`;

const Node = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  border: 5px solid var(--color-primary);
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--color-butter);
`;
const NodeLine = styled.span`
  position: absolute;
  left: 0;
  width: 5rem;
  background-color: pink;
  height: 2rem;
`;

const NodeText = styled.p`
  position: absolute;
  font-weight: 600;
`;

const Button = styled.button`
  position: absolute;
  color: ${(props) => props.$color};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 1rem;
  }
`;
