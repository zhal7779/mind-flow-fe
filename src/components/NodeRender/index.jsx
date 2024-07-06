// import React, { useEffect, useRef } from "react";
// import { NodeContainer, Node, NodeLine, NodeText, Button } from "./styles";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

// const NodeRender = ({
//   tree,
//   node,
//   addNode,
//   updateNodePosition,
//   deleteNode,
// }) => {
//   const nodeRef = useRef(null);
//   const childNodeRef = useRef(null);

//   // useEffect(() => {
//   //   console.log(tree);
//   // }, [tree]);

//   useEffect(() => {
//     const updatePosition = (current) => {
//       if (current) {
//         const { width, height, x, y } = current.getBoundingClientRect();

//         const newPosition = {
//           x: x,
//           y: y,
//           r: width / 2,
//           t: height / 2,
//         };

//         if (
//           !node.position ||
//           node.position.x !== newPosition.x ||
//           node.position.y !== newPosition.y
//         ) {
//           // if (node.childNode.length) {
//           //   const childNodes = nodeRef.current.children;
//           //   [...childNodes].forEach((child) => updatePosition(child));
//           // }

//           return updateNodePosition(node.node, newPosition);
//         }
//       }
//     };

//     updatePosition(nodeRef.current);
//   }, [node, node.position]);

//   const { x: x1, y: y1 } = node.parentNode.position;
//   const { x: x2, y: y2, r: r2, t: t2 } = node.position;

//   const lineProps = {
//     $top: t2,
//     $right: r2,
//     $width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
//     $angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
//   };

//   const handleAddChild = () => {
//     addNode(node.node);
//   };

//   const handleDeleteNode = () => {
//     deleteNode(node.node);
//   };

//   return (
//     <NodeContainer>
//       <Node ref={nodeRef}>
//         <Button
//           onClick={handleAddChild}
//           style={{ right: "-4rem" }}
//           $size={2.6}
//           $color={"var(--color-blue)"}
//         >
//           <FontAwesomeIcon icon={faPlus} />
//         </Button>
//         <Button
//           onClick={handleDeleteNode}
//           style={{ right: "-1.5rem" }}
//           $size={2}
//           $color={"var(--color-red)"}
//         >
//           <FontAwesomeIcon icon={faMinus} />
//         </Button>
//         <NodeText>{node.title}</NodeText>
//         {node.node > 0 && <NodeLine {...lineProps} />}
//       </Node>

//       {node.childNode.length > 0 && (
//         <div style={{ marginLeft: "50px" }} ref={childNodeRef}>
//           {node.childNode.map((child) => (
//             <React.Fragment key={child.node}>
//               <NodeRender
//                 tree={tree}
//                 node={child}
//                 addNode={addNode}
//                 updateNodePosition={updateNodePosition}
//                 deleteNode={deleteNode}
//               />
//             </React.Fragment>
//           ))}
//         </div>
//       )}
//     </NodeContainer>
//   );
// };

// export default NodeRender;

import React, { forwardRef } from "react";
import { NodeContainer, Node, NodeLine, NodeText, Button } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const NodeRender = forwardRef((props, ref) => {
  // useEffect(() => {
  //   const updateAllNodePositions = (currentNode) => {
  //     if (currentNode) {
  //       const { width, height, x, y } = nodeRef.current.getBoundingClientRect();

  //       const newPosition = {
  //         x: x,
  //         y: y,
  //         r: width / 2,
  //         t: height / 2,
  //       };

  //       if (
  //         !currentNode.position ||
  //         currentNode.position.x !== newPosition.x ||
  //         currentNode.position.y !== newPosition.y
  //       ) {
  //         console.log(currentNode.node, newPosition);
  //         updateNodePosition(currentNode.node, newPosition);
  //       }

  //       currentNode.childNode.forEach((childNode) => {
  //         updateAllNodePositions(childNode);
  //       });
  //     }
  //   };

  //   updateAllNodePositions(tree);
  // }, []);

  // const traverseNodes = (node) => {
  //   if (!node) return;

  //   // 노드가 요소 노드인지 확인
  //   if (node.nodeType === 1) {
  //     // 현재 노드의 좌표를 가져오기
  //     const rect = node.getBoundingClientRect();
  //     console.log("Node:", node, "X:", rect.left, "Y:", rect.top);
  //   }

  //   // 자식 노드를 재귀적으로 탐색
  //   node.childNodes.forEach((child) => {
  //     traverseNodes(child);
  //   });
  // };

  // useEffect(() => {
  //   if (nodeRef.current) {
  //     traverseNodes(nodeRef.current);
  //   }
  // }, []);
  const { node, addNode, updateNodePosition, deleteNode } = props;

  const handleAddChild = () => {
    addNode(node.node);
  };

  const handleDeleteNode = () => {
    deleteNode(node.node);
  };

  const { x: x1, y: y1 } = node.parentNode.position || { x: 0, y: 0 };
  const {
    x: x2,
    y: y2,
    r: r2,
    t: t2,
  } = node.position || { x: 0, y: 0, r: 0, t: 0 };

  const lineProps = {
    $top: t2,
    $right: r2,
    $width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
    $angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
  };

  return (
    <NodeContainer ref={ref}>
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
        {node.node > 0 && <NodeLine {...lineProps} />}
      </Node>

      {node.childNode.length > 0 && (
        <div style={{ marginLeft: "50px" }}>
          {node.childNode.map((child) => (
            <React.Fragment key={child.node}>
              <NodeRender
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
});

export default NodeRender;
