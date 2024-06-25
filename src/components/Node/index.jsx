import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Line from "../Line";

const Node = ({ tree, addNode, deleteNode, updateNodePosition }) => {
  const nodeRef = useRef();

  useEffect(() => {
    if (nodeRef.current) {
      const { top, left, width, height } =
        nodeRef.current.getBoundingClientRect();
      updateNodePosition(tree.node, {
        top: top + height / 2,
        left: left + width / 2,
      });
    }
  }, [nodeRef.current, updateNodePosition]);

  const handleAddChild = () => {
    addNode(tree.node); // 해당 노드에 새로운 자식 노드 추가
  };

  const handleDeleteNode = () => {
    deleteNode(tree.node); // 해당 노드 삭제
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginBottom: "2rem",
        marginLeft: "5rem",
      }}
      ref={nodeRef}
    >
      <S.Node>
        <S.Button
          onClick={handleAddChild}
          style={{ right: "-4rem" }}
          $size={2.6}
          $color={"var(--color-blue)"}
        >
          <FontAwesomeIcon icon={faPlus} />
        </S.Button>
        <S.Button
          onClick={handleDeleteNode}
          style={{ right: "-1.5rem" }}
          $size={2}
          $color={"var(--color-red)"}
        >
          <FontAwesomeIcon icon={faMinus} />
        </S.Button>
        <S.NodeText>{tree.title}</S.NodeText>
      </S.Node>
      {tree.childNode.length > 0 && (
        <div>
          {tree.childNode.map((child) => (
            <React.Fragment key={child.node}>
              <Node
                tree={child}
                addNode={addNode}
                deleteNode={deleteNode}
                updateNodePosition={updateNodePosition}
              />
              {child.position &&
                child.position.left !== 0 &&
                child.position.top !== 0 && (
                  <Line from={tree.position} to={child.position} />
                )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
