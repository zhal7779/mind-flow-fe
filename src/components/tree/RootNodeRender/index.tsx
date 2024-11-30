import React, { useState } from 'react';
import {
  Node,
  RootTopicInput,
  ButtonWrapper,
  Button,
} from '../../../styles/NodeCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { GeneralNode, RootNode } from '../../../types/treeType';
import { useRecoilValue } from 'recoil';
import { nodeColor } from '../../../recoil/atoms/nodeColor';

type NodeRenderProps = {
  tree: RootNode;
  updateNodeInputValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    targetNode: RootNode | GeneralNode,
    side: string
  ) => void;
  addNode: (targetNode: number, side: string) => void;
  deleteNode: (targetNode: number, side: string) => void;
};

const RootNodeRender = ({
  tree,
  addNode,
  deleteNode,
  updateNodeInputValue,
}: NodeRenderProps) => {
  const color = useRecoilValue(nodeColor);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Node
      id={'0'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <ButtonWrapper>
          <span>
            <Button
              onClick={() => addNode(0, 'left')}
              $size={2.6}
              $color={'var(--color-blue)'}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button
              onClick={() => deleteNode(0, 'left')}
              $size={2}
              $color={'var(--color-red)'}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </span>
          <span>
            <Button
              onClick={() => deleteNode(0, 'right')}
              $size={2}
              $color={'var(--color-red)'}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <Button
              onClick={() => addNode(0, 'right')}
              $size={2.6}
              $color={'var(--color-blue)'}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </span>
        </ButtonWrapper>
      )}
      <RootTopicInput
        $color={color}
        rows={1}
        onChange={(e) => updateNodeInputValue(e, tree, 'both')}
        value={tree.value}
        placeholder="메인 주제를 입력해주세요"
      />
    </Node>
  );
};

export default RootNodeRender;
