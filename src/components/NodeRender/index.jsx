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
  const { node, addNode, deleteNode } = props;

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
      <Node id={node.node}>
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
        <NodeText>{node.value}</NodeText>
        {node.node > 0 && <NodeLine {...lineProps} />}
      </Node>

      {node.childNode.length > 0 && (
        <div style={{ marginLeft: "50px" }}>
          {node.childNode.map((child) => (
            <React.Fragment key={child.node}>
              <NodeRender
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
});

export default NodeRender;
