import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const TreeNode = ({ node, addNode, updateNodePosition, deleteNode }) => {
  const nodeRef = useRef(null);
  const childNodeRef = useRef(null);

  useEffect(() => {
    const updatePosition = (current) => {
      if (current) {
        const { width, height, x, y } = current.getBoundingClientRect();

        const newPosition = {
          x: x,
          y: y,
          r: width / 2,
          t: height / 2,
        };

        if (
          !node.position ||
          node.position.x !== newPosition.x ||
          node.position.y !== newPosition.y
        ) {
          // if (node.childNode.length) {
          //   const childNodes = nodeRef.current.children;
          //   [...childNodes].forEach((child) => updatePosition(child));
          // }

          return updateNodePosition(node.node, newPosition);
        }
      }
    };

    updatePosition(nodeRef.current);
  }, [node, node.position]);

  const { x: x1, y: y1 } = node.parentNode.position;
  const { x: x2, y: y2, r: r2, t: t2 } = node.position;

  const lineProps = {
    $top: t2,
    $right: r2,
    $width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
    $angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
  };

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
        {node.node > 0 && <NodeLine {...lineProps} />}
      </Node>

      {node.childNode.length > 0 && (
        <div style={{ marginLeft: "50px" }} ref={childNodeRef}>
          {node.childNode.map((child) => (
            <React.Fragment key={child.node}>
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
    parentNode: {
      node: -1,
      position: { x: 0, y: 0 },
    },
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  function addNode(targetNode) {
    const updateTree = (curNode, level) => {
      if (curNode.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
          node: nodeValue,
          position: { x: 0, y: 0 },
          parentNode: {
            node: curNode.node,
            position: curNode.position,
          },
          childNode: [],
        };
        return {
          ...curNode,
          childNode: [...curNode.childNode, newNode],
        };
      }
      return {
        ...curNode,
        childNode: curNode.childNode.map((child) =>
          updateTree(child, level + 1)
        ),
      };
    };
    setTree((prevTree) => updateTree(prevTree, 1));
    setNodeValue((prevValue) => prevValue + 1);
  }

  const updateNodePosition = (node, position) => {
    console.log(node, position);
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
  margin: 10px;
  position: relative;
`;

const Node = styled.div`
  position: relative;
  min-width: 10rem;
  height: 4rem;
  border: 5px solid var(--color-primary);
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--color-butter);
`;
const NodeLine = styled.span`
  position: absolute;
  display: block;
  right: ${(props) => props.$right}px;
  width: ${(props) => props.$width}px;
  transform: rotate(${(props) => props.$angle}deg);
  transform-origin: 100% 0;
  background-color: black;
  height: 0.2rem;
  z-index: -1;
`;

const NodeText = styled.p`
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
