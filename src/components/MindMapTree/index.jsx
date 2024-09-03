import React, { useEffect, useRef, useState } from 'react';
import NodeRender from '../NodeRender';
import positionCalculate from '../../utils/positionCalculate';

// 필요한 작업
// 1. 노드 연결 선 곡선으로 변경 필요 (지금처럼 삼각형이 아닌 원형을 계산해서 해야함)
// 2. 곡선 작업 때문에 svg로 변경 필요
// 3. 노드 비율이 100%가 아닐 경우에도 선 길이 유지 필요
// 4. 루트 노드 양쪽으로 자식 노드 가질 수 있도록 데이터 구조 변경
// 5. 기타 기능 구현
// 마지막.  노드 추가시 선 깜빡임 디버깅

const MindMapTree = () => {
  const [tree, setTree] = useState({
    value: '',
    node: 0,
    level: 0,
    position: { x: 0, y: 0, r: 0, t: 0 },
    parentNode: {
      node: -1,
      position: { x: 0, y: 0, r: 0, t: 0 },
    },
    leftChildNode: [],
    rightChildNode: [],
  });

  const [nodeNumber, setNodeNumber] = useState(1);
  const treeRef = useRef(null);
  const treeChangedRef = useRef(true);

  const addNode = (targetNode) => {
    const updateTree = (curNode, level) => {
      if (curNode.node === targetNode) {
        treeChangedRef.current = true;

        const newNode = {
          value: '',
          level,
          node: nodeNumber,
          position: { x: 0, y: 0, r: 0, t: 0 },
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
    setNodeNumber((prevNumber) => prevNumber + 1);
  };
  const updateNodeInputValue = (event, targetNode) => {
    const updateTree = (curNode) => {
      if (curNode.node === targetNode.node) {
        const target = event.target;
        const { value } = target;

        const prevTargetHeight = target.offsetHeight;
        const updateTargetHeight = target.scrollHeight + 9;

        if (prevTargetHeight < updateTargetHeight) {
          target.style.height = 'auto';
          target.style.height = target.scrollHeight - 40 + 'px';

          // textarea입력으로 높이 변경될 경우 트리 전체의 선 길이 및 곡선을 업데이트
          treeChangedRef.current = true;
        }

        return { ...curNode, value };
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

        if (tree.childNode.length > 0 || tree.node === 0) {
          //자식 노드가 있거나 루트 노드라면 자식 노드들을 삭제
          return { ...tree, childNode: [] };
        }
        return null; // 자식 노드가 없으면 자기 자신을 삭제
      }

      const updatedChildren = tree.childNode
        .map((child) => updateTree(child))
        .filter((child) => child !== null);

      return { ...tree, childNode: updatedChildren };
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
    <NodeRender
      node={tree}
      addNode={addNode}
      updateNodeInputValue={updateNodeInputValue}
      deleteNode={deleteNode}
      ref={treeRef}
    />
  );
};

export default MindMapTree;
