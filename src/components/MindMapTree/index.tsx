import React, { useEffect, useRef, useState } from 'react';
import positionCalculate from '../../utils/positionCalculate';
import LeftNodeRender from '../LeftNodeRender';
import RootNodeRender from '../RootNodeRender';
import { RootNodeContainer } from '../../styles/NodeCommon';
import RightNodeRender from '../RightNodeRender';
import { useRecoilValue } from 'recoil';
import { fileDataState } from '../../recoil/atoms/fileDataState';
import {
  GeneralNode,
  RootNode,
  ChildNode,
  Position,
} from '../../types/fileType';

// 필요한 작업
// 1. 노드 비율이 100%가 아닐 경우에도 선 길이 유지 필요
// 2. 노드 연결 선 곡선으로 변경 필요 (지금처럼 삼각형이 아닌 원형을 계산해서 해야함, svg로 바꿔야할지도..?)
// 3. 기타 기능 구현
// 마지막.  노드 추가시 선 깜빡임 디버깅

const MindMapTree = () => {
  const fileData = useRecoilValue(fileDataState);
  const [tree, setTree] = useState<RootNode>(fileData[0].tree);

  const [nodeNumber, setNodeNumber] = useState(1);

  const treeRef = useRef(null);

  const treeChangedRef = useRef(true);

  // 왼쪽 자식 노드가 생성되거나 변경된 것을 감지
  useEffect(() => {
    if (tree.leftChildNode.length > 0 && treeChangedRef.current) {
      navigatePositionInNodeElement(treeRef, setTree, 'left');
      treeChangedRef.current = false;
    }
  }, [tree.leftChildNode]);

  // 오른쪽 자식 노드가 생성되거나 변경된 것을 감지
  useEffect(() => {
    if (tree.rightChildNode.length > 0 && treeChangedRef.current) {
      navigatePositionInNodeElement(treeRef, setTree, 'right');
      treeChangedRef.current = false;
    }
  }, [tree.rightChildNode]);
  //노드 추가
  const addNode = (targetNode: number, side: string) => {
    const updateTree = (curNode: RootNode | GeneralNode, level: number) => {
      // 목표 노드에 도달하면 새 노드를 추가
      if (curNode.node === targetNode) {
        treeChangedRef.current = true;
        const newNode = {
          value: '',
          level,
          side,
          node: nodeNumber,
          position: { x: 0, y: 0, r: 0, t: 0 },
          parentNode: {
            node: curNode.node,
            position: curNode.position,
          },
          childNode: [],
        };

        // 새 노드를 추가할 위치에 따라 추가
        if (targetNode === 0 && side === 'left') {
          return {
            ...curNode,
            leftChildNode: [...(curNode.leftChildNode || []), newNode],
          };
        } else if (targetNode === 0 && side === 'right') {
          return {
            ...curNode,
            rightChildNode: [...(curNode.rightChildNode || []), newNode],
          };
        }

        // 루트 노드를 제외하고 일반 노드에는 childNode에 새로운 노드 추가
        return {
          ...curNode,
          childNode: [...curNode.childNode, newNode],
        };
      }

      // 탐색할 방향을 결정하고 그 쪽으로만 재귀 호출
      if (side === 'left' && curNode.leftChildNode && level < 2) {
        return {
          ...curNode,
          leftChildNode: curNode.leftChildNode.map((leftChild: Node) =>
            updateTree(leftChild, level + 1)
          ),
        };
      } else if (side === 'right' && curNode.rightChildNode && level < 2) {
        return {
          ...curNode,
          rightChildNode: curNode.rightChildNode.map((rightChild: Node) =>
            updateTree(rightChild, level + 1)
          ),
        };
      }

      // 루트 노드를 제외하고는 childNode를 순회
      return {
        ...curNode,
        childNode: curNode.childNode.map((child: Node) =>
          updateTree(child, level + 1)
        ),
      };
    };

    // 트리 상태를 업데이트하고, 노드 번호 증가
    setTree((prevTree) => updateTree(prevTree, 1));
    setNodeNumber((prevNumber) => prevNumber + 1);
  };

  const deleteNode = (targetNode: number, side: string) => {
    // 루트 노드에서 삭제할 경우 방향에 따라 빈 배열로 먼저 리턴
    if (targetNode === 0 && side === 'left') {
      return setTree((prevTree) => ({ ...prevTree, leftChildNode: [] }));
    } else if (targetNode === 0 && side === 'right') {
      return setTree((prevTree) => ({ ...prevTree, rightChildNode: [] }));
    }

    const updateTree = (
      tree: RootNode | GeneralNode
    ): RootNode | GeneralNode | null => {
      if ('childNode' in tree && tree.node === targetNode) {
        treeChangedRef.current = true;
        if (tree.childNode.length > 0) {
          //자식 노드가 있다면 자식 노드들을 삭제
          return { ...tree, childNode: [] };
        }
        return null; // 자식 노드가 없으면 자기 자신을 삭제
      }

      // 탐색할 방향을 결정하고 그 쪽으로만 재귀 호출
      if ('leftChildNode' in tree && tree.level === 0 && side === 'left') {
        return {
          ...tree,
          leftChildNode: tree.leftChildNode
            .map((leftChild: GeneralNode) => updateTree(leftChild))
            .filter((leftChild) => leftChild !== null) as GeneralNode[], // 재귀가 끝나면 자기 자신을 삭제한 노드는 제거
        };
      } else if (
        'rightChildNode' in tree &&
        tree.level === 0 &&
        side === 'right'
      ) {
        return {
          ...tree,
          rightChildNode: tree.rightChildNode
            .map((rightChild: GeneralNode) => updateTree(rightChild))
            .filter((rightChild) => rightChild !== null) as GeneralNode[],
        };
      }
      // 루트 노드를 제외하고는 childNode를 순회
      if ('childNode' in tree && tree.childNode) {
        const updatedChildren = tree.childNode
          .map((child) => updateTree(child))
          .filter((child) => child !== null) as GeneralNode[];

        return { ...tree, childNode: updatedChildren };
      }

      return tree;
    };

    setTree((prevTree) => updateTree(prevTree) as RootNode);
  };

  //노드의 값 업데이트
  const updateNodeInputValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    targetNode: RootNode | GeneralNode,
    side: string
  ) => {
    const updateTree = (curNode: RootNode | GeneralNode) => {
      if (curNode.node === targetNode.node) {
        //  목표 노드에 도달하면 value 업데이트 및 해당 요소의 높이 변경
        const target = event.target;
        const { value } = target;

        const prevTargetHeight = target.offsetHeight;
        const updateTargetHeight = target.scrollHeight + 9;

        // textarea입력으로 높이 변경될 경우 트리 전체의 선 길이 및 곡선을 업데이트
        if (prevTargetHeight < updateTargetHeight) {
          target.style.height = 'auto';
          target.style.height = target.scrollHeight - 40 + 'px';

          treeChangedRef.current = true;
        }

        // value 업데이트
        return { ...curNode, value };
      }

      // 탐색할 방향을 결정하고 그 쪽으로만 재귀 호출
      if (curNode.level === 0 && side === 'left') {
        return {
          ...curNode,
          leftChildNode: curNode.leftChildNode.map((child) =>
            updateTree(child)
          ),
        };
      } else if (curNode.level === 0 && side === 'right') {
        return {
          ...curNode,
          rightChildNode: curNode.rightChildNode.map((child) =>
            updateTree(child)
          ),
        };
      }
      // 루트 노드를 제외하고는 childNode를 순회
      return {
        ...curNode,
        childNode: curNode.childNode.map((child) => updateTree(child)),
      };
    };

    setTree((prevTree) => updateTree(prevTree) as RootNode);
  };

  // 노드 포지션 업데이트
  const updateNodePosition = (
    node: RootNode | GeneralNode,
    nodeId: string,
    updatePosition: Position,
    parentPosition: Position,
    side: string | null
  ) => {
    if (node.node === parseInt(nodeId)) {
      const { position: curPosition } = node;
      if (
        curPosition.x !== updatePosition.x ||
        curPosition.y !== updatePosition.y
      ) {
        return {
          ...node,
          parentNode: {
            ...node.parentNode,
            position: parentPosition,
          },
          position: updatePosition,
        };
      }
    }
    const parentNodePosition = node.position;

    if (node.level === 0 && side === 'left') {
      return {
        ...node,
        leftChildNode: node.leftChildNode.map((leftChild) =>
          updateNodePosition(
            leftChild,
            nodeId,
            updatePosition,
            parentNodePosition,
            null
          )
        ),
      };
    } else if (node.level === 0 && side === 'right') {
      return {
        ...node,
        rightChildNode: node.rightChildNode.map((rightChild) =>
          updateNodePosition(
            rightChild,
            nodeId,
            updatePosition,
            parentNodePosition,
            null
          )
        ),
      };
    }
    if (node.childNode) {
      return {
        ...node,
        childNode: node.childNode.map((child) =>
          updateNodePosition(
            child,
            nodeId,
            updatePosition,
            parentNodePosition,
            null
          )
        ),
      };
    }
    return node;
  };

  //노드 요소 포지션 탐색
  const navigatePositionInNodeElement = (treeRef, setTree, side: string) => {
    const treePositionRecursion = (nodeRef) => {
      if (!nodeRef.children) {
        return;
      }

      const currentPosition = positionCalculate(nodeRef);
      const currentNodeID = nodeRef.id.toString();

      // 요소에 id가 있는 경우에만 각 방향에 따라 포지션 업데이트 함수 호출
      if (side === 'left' && currentNodeID.length > 0) {
        //왼쪽 노드 생성시에만 추가 작업
        //포지션 탐색시 왼쪽 노드들 먼저 탐색 이후 루트 노드를 탐색하기 때문에
        // 추가로 1단계 왼쪽 노드들의 부모 노드 포지션을 동시에 업데이트 해줘야 함
        if (currentNodeID === '0') {
          setTree((prevTree) => ({
            ...prevTree,
            leftChildNode: prevTree.leftChildNode.map((leftChild) => ({
              ...leftChild,
              parentNode: {
                ...leftChild.parentNode,
                position: currentPosition,
              },
            })),
          }));
        }

        //나머지는 현재 노드의 포지션만 업데이트
        setTree((prevTree) =>
          updateNodePosition(
            prevTree,
            currentNodeID,
            currentPosition,
            prevTree.position,
            'left'
          )
        );
      } else if (side === 'right' && currentNodeID.length > 0) {
        setTree((prevTree) =>
          updateNodePosition(
            prevTree,
            currentNodeID,
            currentPosition,
            prevTree.position,
            'right'
          )
        );
      }

      // 자식 노드들에 대해 재귀적으로 처리
      Array.from(nodeRef.children).forEach((child) => {
        treePositionRecursion(child);
      });
    };

    if (treeRef.current) {
      treePositionRecursion(treeRef.current);
    }
  };

  return (
    <RootNodeContainer ref={treeRef} $side={undefined} $isRoot={true}>
      <div>
        {tree.leftChildNode.length > 0 &&
          tree.leftChildNode.map((leftNode) => (
            <LeftNodeRender
              key={leftNode.node}
              node={leftNode}
              addNode={addNode}
              updateNodeInputValue={updateNodeInputValue}
              deleteNode={deleteNode}
            />
          ))}
      </div>

      <RootNodeRender
        tree={tree}
        addNode={addNode}
        deleteNode={deleteNode}
        updateNodeInputValue={updateNodeInputValue}
      />

      <div>
        {tree.rightChildNode.length > 0 &&
          tree.rightChildNode.map((rightNode) => (
            <RightNodeRender
              key={rightNode.node}
              node={rightNode}
              addNode={addNode}
              updateNodeInputValue={updateNodeInputValue}
              deleteNode={deleteNode}
            />
          ))}
      </div>
    </RootNodeContainer>
  );
};

export default MindMapTree;
