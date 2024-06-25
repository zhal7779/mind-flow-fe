import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const TreeContainer = styled.div`
  position: relative;
`;

const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 10px;
  position: relative;
`;

const Node = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
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

const NodeText = styled.span`
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

const Line = ({ from, to }) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={from.left}
        y1={from.top}
        x2={to.left}
        y2={to.top}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

const TreeNode = ({ node, addNode, deleteNode, updateNodePosition }) => {
  const nodeRef = useRef();

  useEffect(() => {
    if (nodeRef.current) {
      const { top, left, width, height } =
        nodeRef.current.getBoundingClientRect();
      const newPosition = {
        top: top + height / 2,
        left: left + width / 2,
      };
      updateNodePosition(node.node, newPosition);
    }
  }, [node.node, updateNodePosition]);

  const handleAddChild = () => {
    addNode(node.node);
  };

  const handleDeleteNode = () => {
    deleteNode(node.node);
  };

  return (
    <NodeContainer ref={nodeRef}>
      <Node>
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
      </Node>
      {node.childNode.length > 0 && (
        <div style={{ marginLeft: "50px" }}>
          {node.childNode.map((child) => (
            <React.Fragment key={child.node}>
              <TreeNode
                node={child}
                addNode={addNode}
                deleteNode={deleteNode}
                updateNodePosition={updateNodePosition}
              />
              <Line from={node.position} to={child.position} />
            </React.Fragment>
          ))}
        </div>
      )}
    </NodeContainer>
  );
};

const Example = () => {
  const [tree, setTree] = useState({
    title: "level.0 -root",
    node: 0,
    position: { top: 0, left: 0 },
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  const updateNodePosition = useCallback((node, position) => {
    setTree((prevTree) => {
      const updateTree = (currentTree) => {
        if (currentTree.node === node) {
          return {
            ...currentTree,
            position: position,
          };
        } else {
          return {
            ...currentTree,
            childNode: currentTree.childNode.map((child) => updateTree(child)),
          };
        }
      };
      return updateTree(prevTree);
    });
  }, []);

  function addNode(targetNode) {
    const updateTree = (currentTree, level) => {
      if (currentTree.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
          node: nodeValue,
          position: {
            top: currentTree.position.top + 50, // 예시로 50 픽셀씩 떨어진 위치
            left: currentTree.position.left + 50,
          },
          childNode: [],
        };
        return {
          ...currentTree,
          childNode: [...currentTree.childNode, newNode],
        };
      }
      return {
        ...currentTree,
        childNode: currentTree.childNode.map((child) =>
          updateTree(child, level + 1)
        ),
      };
    };
    setTree((currentTree) => updateTree(currentTree, 1));
    setNodeValue((prevValue) => prevValue + 1);
  }

  function deleteNode(targetNode) {
    const updateTree = (currentTree) => {
      if (currentTree.node === targetNode) {
        return { ...currentTree, childNode: [] };
      }
      return {
        ...currentTree,
        childNode: currentTree.childNode.map((child) => updateTree(child)),
      };
    };
    setTree((currentTree) => updateTree(currentTree));
  }

  return (
    <TreeContainer>
      <TreeNode
        node={tree}
        addNode={addNode}
        deleteNode={deleteNode}
        updateNodePosition={updateNodePosition}
      />
    </TreeContainer>
  );
};

export default Example;
