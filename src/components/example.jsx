import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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

const TreeNode = ({ node, addNode, deleteNode }) => {
  const handleAddChild = () => {
    addNode(node.node);
  };

  const handleDeleteNode = () => {
    deleteNode(node.node);
  };

  return (
    <NodeContainer>
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
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  function addNode(targetNode) {
    const updateTree = (currentTree, level) => {
      if (currentTree.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
          node: nodeValue,
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
      <TreeNode node={tree} addNode={addNode} deleteNode={deleteNode} />
    </TreeContainer>
  );
};

export default Example;
