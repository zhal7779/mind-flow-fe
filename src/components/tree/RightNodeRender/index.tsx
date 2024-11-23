import React, { useState } from 'react';

import {
  DirectionNodeContainer,
  Node,
  MainTopicInput,
  ContentInput,
  ButtonWrapper,
  Button,
  NodeLine,
} from '../../../styles/NodeCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import nodeLineProps from '../../../utils/nodeLineProps';
import { GeneralNode, RootNode } from '../../../types/fileType';
import { useRecoilValue } from 'recoil';
import { nodeColor } from '../../../recoil/atoms/nodeColor';

type NodeRenderProps = {
  node: GeneralNode;
  updateNodeInputValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    targetNode: RootNode | GeneralNode,
    side: string
  ) => void;
  addNode: (targetNode: number, side: string) => void;
  deleteNode: (targetNode: number, side: string) => void;
};

const RightNodeRender = ({
  node,
  updateNodeInputValue,
  addNode,
  deleteNode,
}: NodeRenderProps) => {
  const color = useRecoilValue(nodeColor);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddChild = () => {
    addNode(node.node, 'right');
  };

  const handleDeleteChild = () => {
    deleteNode(node.node, 'right');
  };

  const lineProps = nodeLineProps(node);

  const rightChildNodeRender = node.childNode.map((child) => {
    return (
      <RightNodeRender
        key={child.node}
        node={child as GeneralNode}
        addNode={addNode}
        updateNodeInputValue={updateNodeInputValue}
        deleteNode={deleteNode}
      />
    );
  });

  return (
    <DirectionNodeContainer $side={'right'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '50px',
        }}
      >
        <Node
          id={node.node.toString()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && (
            <ButtonWrapper>
              <Button
                onClick={handleDeleteChild}
                style={{ right: '-1rem' }}
                $size={2}
                $color={'var(--color-red)'}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button
                onClick={handleAddChild}
                style={{ right: '-4rem' }}
                $size={2.6}
                $color={'var(--color-blue)'}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </ButtonWrapper>
          )}
          {node.level === 1 ? (
            <MainTopicInput
              $color={color}
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node, 'right')}
              value={node.value}
              placeholder="브랜치 주제를 입력해주세요"
            />
          ) : (
            <ContentInput
              $color={color}
              rows={1}
              onChange={(e) => updateNodeInputValue(e, node, 'right')}
              value={node.value}
              placeholder="내용을 입력해주세요"
            />
          )}
          {node.node > 0 && (
            <NodeLine $color={color} {...lineProps} $direction={'right'} />
          )}
        </Node>
      </div>

      {node.childNode.length > 0 && <div>{rightChildNodeRender}</div>}
    </DirectionNodeContainer>
  );
};

export default RightNodeRender;
