import React, { useEffect, useRef, useState } from 'react';
import positionCalculate from '../../../utils/positionCalculate';
import LeftNodeRender from '../LeftNodeRender';
import RootNodeRender from '../RootNodeRender';
import RightNodeRender from '../RightNodeRender';
import { RootNodeContainer } from '../../../styles/NodeCommon';
import { useRecoilValue } from 'recoil';
import { GeneralNode, RootNode, Position } from '../../../types/fileType';

// 필요한 작업
// 1. 노드 비율이 100%가 아닐 경우에도 선 길이 유지 필요
// 2. 노드 연결 선 곡선으로 변경 필요 (지금처럼 삼각형이 아닌 원형을 계산해서 해야함, svg로 바꿔야할지도..?)
// 3. 기타 기능 구현
// 마지막.  노드 추가시 선 깜빡임 디버깅

const MindMapTree = () => {
  const fileData = useRecoilValue([]);
  const [tree, setTree] = useState<RootNode>(fileData[0].tree);

  const [nodeNumber, setNodeNumber] = useState(1);

  const treeRef = useRef<HTMLDivElement>(null);

  const treeChangedRef = useRef(true);

  // 왼쪽 자식 노드가 생성되거나 변경된 것을 감지
  useEffect(() => {
    if (
      tree.leftChildNode.length > 0 &&
      treeChangedRef.current &&
      treeRef.current
    ) {
      navigatePositionInNodeElement(treeRef.current, 'left');
      treeChangedRef.current = false;
    }
  }, [tree.leftChildNode]);

  // 오른쪽 자식 노드가 생성되거나 변경된 것을 감지
  useEffect(() => {
    if (
      tree.rightChildNode.length > 0 &&
      treeChangedRef.current &&
      treeRef.current
    ) {
      navigatePositionInNodeElement(treeRef.current, 'right');
      treeChangedRef.current = false;
    }
  }, [tree.rightChildNode]);
  //노드 추가
  const addNode = (targetNode: number, side: string) => {
    const addNodeRecursion = (
      curNode: RootNode | GeneralNode,
      level: number
    ): RootNode | GeneralNode | undefined => {
      // 목표 노드에 도달하면 새 노드를 추가
      if (curNode.node === targetNode) {
        treeChangedRef.current = true;
        const newNode: GeneralNode = {
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

        // *재귀 탈출
        // 추가할 위치에 따라 새로운 노드 추가 후 리턴
        if ('leftChildNode' in curNode && targetNode === 0 && side === 'left') {
          return {
            ...curNode,
            leftChildNode: [...(curNode.leftChildNode || []), newNode],
          };
        } else if (
          'rightChildNode' in curNode &&
          targetNode === 0 &&
          side === 'right'
        ) {
          return {
            ...curNode,
            rightChildNode: [...(curNode.rightChildNode || []), newNode],
          };
        }
        // 루트 노드를 제외하고 일반 노드에는 childNode에 새로운 노드 추가
        if ('childNode' in curNode) {
          return {
            ...curNode,
            childNode: [...curNode.childNode, newNode],
          };
        }
      }

      // *재귀 호출
      // 탐색할 방향을 결정하고 그 쪽으로만 재귀 호출
      if (
        'leftChildNode' in curNode &&
        side === 'left' &&
        curNode.leftChildNode &&
        level < 2
      ) {
        return {
          ...curNode,
          leftChildNode: curNode.leftChildNode.map((leftChild) =>
            addNodeRecursion(leftChild, level + 1)
          ) as GeneralNode[],
        };
      } else if (
        'rightChildNode' in curNode &&
        side === 'right' &&
        curNode.rightChildNode &&
        level < 2
      ) {
        return {
          ...curNode,
          rightChildNode: curNode.rightChildNode.map(
            (rightChild: GeneralNode) => addNodeRecursion(rightChild, level + 1)
          ) as GeneralNode[],
        };
      }

      // 루트 노드를 제외하고는 childNode를 순회
      if ('childNode' in curNode && curNode.childNode) {
        return {
          ...curNode,
          childNode: curNode.childNode.map((child) =>
            addNodeRecursion(child, level + 1)
          ) as GeneralNode[],
        };
      }
    };

    // 트리 상태를 업데이트하고, 노드 번호 증가
    setTree((prevTree) => addNodeRecursion(prevTree, 1) as RootNode);
    setNodeNumber((prevNumber) => prevNumber + 1);
  };

  const deleteNode = (targetNode: number, side: string) => {
    // 루트 노드에서 삭제할 경우 방향에 따라 빈 배열로 먼저 리턴
    if (targetNode === 0 && side === 'left') {
      return setTree((prevTree) => ({ ...prevTree, leftChildNode: [] }));
    } else if (targetNode === 0 && side === 'right') {
      return setTree((prevTree) => ({ ...prevTree, rightChildNode: [] }));
    }

    const deleteNodeRecursion = (
      curNode: RootNode | GeneralNode
    ): RootNode | GeneralNode | null => {
      if ('childNode' in curNode && curNode.node === targetNode) {
        treeChangedRef.current = true;
        if (curNode.childNode.length > 0) {
          //자식 노드가 있다면 자식 노드들을 삭제
          return { ...curNode, childNode: [] };
        }
        return null; // 자식 노드가 없으면 자기 자신을 삭제
      }

      // 탐색할 방향을 결정하고 그 쪽으로만 재귀 호출
      if (
        'leftChildNode' in curNode &&
        curNode.level === 0 &&
        side === 'left'
      ) {
        return {
          ...curNode,
          leftChildNode: curNode.leftChildNode
            .map((leftChild: GeneralNode) => deleteNodeRecursion(leftChild))
            .filter((leftChild) => leftChild !== null) as GeneralNode[], // 재귀가 끝나면 자기 자신을 삭제한 노드는 제거
        };
      } else if (
        'rightChildNode' in curNode &&
        curNode.level === 0 &&
        side === 'right'
      ) {
        return {
          ...curNode,
          rightChildNode: curNode.rightChildNode
            .map((rightChild: GeneralNode) => deleteNodeRecursion(rightChild))
            .filter((rightChild) => rightChild !== null) as GeneralNode[],
        };
      }
      // 루트 노드를 제외하고는 childNode를 순회
      if ('childNode' in curNode && curNode.childNode) {
        const updatedChildren = curNode.childNode
          .map((child) => deleteNodeRecursion(child))
          .filter((child) => child !== null) as GeneralNode[];

        return { ...curNode, childNode: updatedChildren };
      }

      return curNode;
    };

    setTree((prevTree) => deleteNodeRecursion(prevTree) as RootNode);
  };

  //노드의 값 업데이트
  const updateNodeInputValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    targetNode: RootNode | GeneralNode,
    side: string
  ) => {
    const updateNodeRecursion = (
      curNode: RootNode | GeneralNode
    ): RootNode | GeneralNode | undefined => {
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

        //재귀 탈출 value 업데이트
        return { ...curNode, value };
      }

      // 탐색할 방향을 결정하고 그 쪽으로만 재귀 호출
      if (
        'leftChildNode' in curNode &&
        curNode.level === 0 &&
        side === 'left'
      ) {
        return {
          ...curNode,
          leftChildNode: curNode.leftChildNode.map((leftChild) =>
            updateNodeRecursion(leftChild)
          ) as GeneralNode[],
        };
      } else if (
        'rightChildNode' in curNode &&
        curNode.level === 0 &&
        side === 'right'
      ) {
        return {
          ...curNode,
          rightChildNode: curNode.rightChildNode.map((rightChild) =>
            updateNodeRecursion(rightChild)
          ) as GeneralNode[],
        };
      }

      if ('childNode' in curNode && curNode.childNode) {
        // 루트 노드를 제외하고는 childNode를 순회
        return {
          ...curNode,
          childNode: curNode.childNode.map((child) =>
            updateNodeRecursion(child)
          ) as GeneralNode[],
        };
      }
    };

    setTree((prevTree) => updateNodeRecursion(prevTree) as RootNode);
  };

  // 노드 포지션 업데이트
  const updateNodePosition = (
    curNode: RootNode | GeneralNode,
    nodeId: string,
    updatePosition: Position,
    parentPosition: Position,
    side: string | null
  ): RootNode | GeneralNode => {
    if (curNode.node === parseInt(nodeId)) {
      const { position: curPosition } = curNode;
      if (
        curPosition.x !== updatePosition.x ||
        curPosition.y !== updatePosition.y
      ) {
        return {
          ...curNode,
          parentNode: {
            ...curNode.parentNode,
            position: parentPosition,
          },
          position: updatePosition,
        };
      }
    }
    const parentNodePosition = curNode.position;

    if ('leftChildNode' in curNode && curNode.level === 0 && side === 'left') {
      return {
        ...curNode,
        leftChildNode: curNode.leftChildNode.map((leftChild) =>
          updateNodePosition(
            leftChild,
            nodeId,
            updatePosition,
            parentNodePosition,
            null
          )
        ) as GeneralNode[],
      };
    } else if (
      'rightChildNode' in curNode &&
      curNode.level === 0 &&
      side === 'right'
    ) {
      return {
        ...curNode,
        rightChildNode: curNode.rightChildNode.map((rightChild) =>
          updateNodePosition(
            rightChild,
            nodeId,
            updatePosition,
            parentNodePosition,
            null
          )
        ) as GeneralNode[],
      };
    }
    if ('childNode' in curNode && curNode.childNode) {
      return {
        ...curNode,
        childNode: curNode.childNode.map((child) =>
          updateNodePosition(
            child,
            nodeId,
            updatePosition,
            parentNodePosition,
            null
          )
        ) as GeneralNode[],
      };
    }
    return curNode;
  };

  //노드 요소 포지션 탐색
  const navigatePositionInNodeElement = (
    treeElement: HTMLDivElement,
    side: string
  ) => {
    const nodePositionRecursion = (nodeRef: HTMLElement) => {
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

        setTree(
          (prevTree) =>
            updateNodePosition(
              prevTree,
              currentNodeID,
              currentPosition,
              prevTree.position,
              'left'
            ) as RootNode
        );
      } else if (side === 'right' && currentNodeID.length > 0) {
        setTree(
          (prevTree) =>
            updateNodePosition(
              prevTree,
              currentNodeID,
              currentPosition,
              prevTree.position,
              'right'
            ) as RootNode
        );
      }

      // 자식 노드들에 대해 재귀적으로 처리
      Array.from(nodeRef.children).forEach((child) => {
        nodePositionRecursion(child as HTMLDivElement);
      });
    };

    nodePositionRecursion(treeElement);
  };

  return (
    <RootNodeContainer ref={treeRef} $side={'both'} $isRoot={true}>
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
