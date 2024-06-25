import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Line from "../Line";

const Node = ({ tree, addNode, deleteNode }) => {
  const nodeRef = useRef();

  const [nodePosition, setNodePosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (nodeRef.current) {
      const { top, left, width, height } =
        nodeRef.current.getBoundingClientRect();
      setNodePosition({
        top: top + height / 2,
        left: left + width / 2,
      });
    }
  }, [tree.node]);

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
        margin: "10px",
        padding: "10px",
        alignItems: "center",
      }}
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
        <div style={{ marginLeft: "100px" }}>
          {tree.childNode.map((child) => (
            <React.Fragment key={child.node}>
              <Node tree={child} addNode={addNode} deleteNode={deleteNode} />
              <Line from={nodePosition} to={nodePosition} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Node;
