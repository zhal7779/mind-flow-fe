import React, { useEffect, useRef, useState } from "react";
import { TreeContainer } from "./styles";
import NodeRender from "../NodeRender";

// 필요한 작업
// 1. 일반 노드 길이 가변적으로 변경 처리
// 2. 최하단 자식 노드 삭제 처리
// 3. 노드 연결 선 수정 (스타일 변경)
// 4. 노드 추가시 선 깜빡임 디버깅
const MindMapTree = () => {
  const [tree, setTree] = useState({
    value: "메인 주제",
    node: 0,
    level: 0,
    position: { x: 0, y: 0 },
    parentNode: {
      node: -1,
      position: { x: 0, y: 0 },
    },
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);
  const treeRef = useRef(null);
  const treeChangedRef = useRef(true);

  const addNode = (targetNode) => {
    const updateTree = (curNode, level) => {
      if (curNode.node === targetNode) {
        treeChangedRef.current = true;
        const newNode = {
          value: level > 1 ? "내용" : "브랜치 주제",
          level,
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
  };
  const updateNodeInputValue = (event, targetNode) => {
    const updateTree = (curNode) => {
      if (curNode.node === targetNode.node) {
        const inputTarget = event.target;
        if (targetNode.level < 2) {
          inputTarget.style.width = "10rem";
          inputTarget.style.width = `${inputTarget.scrollWidth}px`;
        }
        const { value: inputValue } = inputTarget;

        return { ...curNode, value: inputValue };
      }
      return {
        ...curNode,
        childNode: curNode.childNode.map((child) => updateTree(child)),
      };
    };

    setTree((prevTree) => updateTree(prevTree));
  };

  const deleteNode = (targetNode) => {
    const updateTree = (tree) => {
      if (tree.node === targetNode) {
        treeChangedRef.current = true;
        return { ...tree, childNode: [] };
      }
      return {
        ...tree,
        childNode: tree.childNode.map((child) => updateTree(child)),
      };
    };
    setTree((prevTree) => updateTree(prevTree));
  };

  const updateNodePosition = (node, nodeId, curPosition, parentPositon) => {
    if (node.node === parseInt(nodeId)) {
      const { position: prevPosition } = node;
      if (
        prevPosition.x !== curPosition.x ||
        prevPosition.y !== curPosition.y
      ) {
        return {
          ...node,
          parentNode: {
            ...node.parentNode,
            position: parentPositon,
          },
          position: curPosition,
        };
      }
    }

    if (node.childNode) {
      const parentNodePosition = node.position;
      return {
        ...node,
        childNode: node.childNode.map((child) =>
          updateNodePosition(child, nodeId, curPosition, parentNodePosition)
        ),
      };
    }
    return node;
  };

  const updateTreeWithNodePositions = (treeRef, setTree) => {
    const positionCalculate = (node) => {
      const { width, height, x, y } = node.getBoundingClientRect();
      return {
        x: x,
        y: y,
        r: width / 2,
        t: height / 2,
      };
    };

    const treePositionRecursion = (node) => {
      if (!node.children) {
        return;
      }
      if (node.id) {
        const currentPosition = positionCalculate(node);
        setTree((prevTree) =>
          updateNodePosition(prevTree, node.id, currentPosition, tree.position)
        );
      }
      Array.from(node.children).forEach((child) => {
        treePositionRecursion(child);
      });
    };

    if (treeRef.current) {
      treePositionRecursion(treeRef.current);
    }
  };

  useEffect(() => {
    if (treeChangedRef.current) {
      updateTreeWithNodePositions(treeRef, setTree);
      treeChangedRef.current = false;
    }
  }, [tree]);

  return (
    <TreeContainer>
      <NodeRender
        node={tree}
        addNode={addNode}
        updateNodeInputValue={updateNodeInputValue}
        deleteNode={deleteNode}
        ref={treeRef}
      />
    </TreeContainer>
  );
};

export default MindMapTree;
