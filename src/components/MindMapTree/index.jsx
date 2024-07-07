// import React, { useEffect, useRef, useState } from "react";
// import { TreeContainer } from "./styles";
// import NodeRender from "../NodeRender";

// const MindMapTree = () => {
//   const [tree, setTree] = useState({
//     value: "Root",
//     node: 0,

//     position: { x: 0, y: 0 },
//     parentNode: {
//       node: -1,
//       position: { x: 0, y: 0 },
//     },
//     childNode: [],
//   });

//   const [nodeValue, setNodeValue] = useState(1);
//   const treeRef = useRef(null);
//   const prevTreeRef = useRef(tree);

//   function addNode(targetNode) {
//     const updateTree = (curNode, level) => {
//       if (curNode.node === targetNode) {
//         const newNode = {
//           value: `level.${level} - node${nodeValue}`,
//           node: nodeValue,
//           position: { x: 0, y: 0 },
//           parentNode: {
//             node: curNode.node,
//             position: curNode.position,
//           },
//           childNode: [],
//         };
//         return {
//           ...curNode,
//           childNode: [...curNode.childNode, newNode],
//         };
//       }
//       return {
//         ...curNode,
//         childNode: curNode.childNode.map((child) =>
//           updateTree(child, level + 1)
//         ),
//       };
//     };
//     setTree((prevTree) => updateTree(prevTree, 1));
//     setNodeValue((prevValue) => prevValue + 1);
//   }

//   function deleteNode(targetNode) {
//     const updateTree = (tree) => {
//       if (tree.node === targetNode) {
//         return { ...tree, childNode: [] };
//       }
//       return {
//         ...tree,
//         childNode: tree.childNode.map((child) => updateTree(child)),
//       };
//     };
//     setTree((prevTree) => updateTree(prevTree));
//   }
//   // const updateNodePosition = (nodeId, position) => {
//   //   const updatePosition = (node) => {
//   //     if (node.node === nodeId) {
//   //       console.log(node.position, position);
//   //       return { ...tree, position };
//   //     }
//   //     return { ...node, childNode: node.childNode.map(updatePosition) };
//   //   };

//   //   setTree((prevTree) => updatePosition(prevTree));
//   // };

//   // useEffect(() => {
//   //   const treePositionRecursion = (node) => {
//   //     if (!Array.from(node.children).length) {
//   //       return;
//   //     }
//   //     if (node.id) {
//   //       const { width, height, x, y } = node.getBoundingClientRect();

//   //       const newPosition = {
//   //         x: x,
//   //         y: y,
//   //         r: width / 2,
//   //         t: height / 2,
//   //       };
//   //       console.log(newPosition);
//   //       // updateNodePosition(node.id, newPosition);
//   //     }

//   //     return Array.from(node.children).forEach((child) =>
//   //       treePositionRecursion(child)
//   //     );
//   //   };

//   //   if (treeRef.current) {
//   //     console.log("----------------");
//   //     treePositionRecursion(treeRef.current);
//   //   }
//   // }, [tree]);

//   const updateNodePosition = (node, nodeId, position) => {
//     if (node.node === parseInt(nodeId)) {
//       return { ...node, position };
//     }

//     if (node.childNode) {
//       return {
//         ...node,
//         childNode: node.childNode.map((child) =>
//           updateNodePosition(child, nodeId, position)
//         ),
//       };
//     }

//     return node;
//   };

//   const updateTreeWithNodePositions = (treeRef, setTree) => {
//     const treePositionRecursion = (node) => {
//       if (!node.children) {
//         return;
//       }

//       if (node.id) {
//         const { width, height, x, y } = node.getBoundingClientRect();
//         const newPosition = {
//           x: x,
//           y: y,
//           r: width / 2,
//           t: height / 2,
//         };
//         setTree((prevTree) =>
//           updateNodePosition(prevTree, node.id, newPosition)
//         );
//       }

//       Array.from(node.children).forEach((child) =>
//         treePositionRecursion(child)
//       );
//     };

//     if (treeRef.current) {
//       treePositionRecursion(treeRef.current);
//     }
//   };

//   useEffect(() => {
//     updateTreeWithNodePositions(treeRef, setTree);
//   }, [tree]);

//   // JSX or other code for the component

//   return (
//     <TreeContainer>
//       <NodeRender
//         node={tree}
//         addNode={addNode}
//         deleteNode={deleteNode}
//         ref={treeRef}
//       />
//     </TreeContainer>
//   );
// };

// export default MindMapTree;
import React, { useEffect, useRef, useState } from "react";
import { TreeContainer } from "./styles";
import NodeRender from "../NodeRender";

const MindMapTree = () => {
  const [tree, setTree] = useState({
    value: "Root",
    node: 0,
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
          value: `level.${level} - node${nodeValue}`,
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

  const updateNodePosition = (node, nodeId, position) => {
    if (node.node === parseInt(nodeId)) {
      return { ...node, position };
    }
    if (node.childNode) {
      return {
        ...node,
        childNode: node.childNode.map((child) =>
          updateNodePosition(child, nodeId, position)
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
        const { width, height, x, y } = node.getBoundingClientRect();
        const newPosition = {
          x: x,
          y: y,
          r: width / 2,
          t: height / 2,
        };
        setTree((prevTree) =>
          updateNodePosition(prevTree, node.id, newPosition)
        );
      }
      Array.from(node.children).forEach((child) =>
        treePositionRecursion(child)
      );
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
        deleteNode={deleteNode}
        ref={treeRef}
      />
    </TreeContainer>
  );
};

export default MindMapTree;
