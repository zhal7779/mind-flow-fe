import React, { forwardRef } from 'react';
import {
  NodeContainer,
  Node,
  NodeLine,
  RootTopicInput,
  MainTopicInput,
  ContentInput,
  Button,
} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const NodeRender = forwardRef((props, ref) => {
  const { node, addNode, updateNodeInputValue, deleteNode } = props;

  const handleAddChild = () => {
    addNode(node.node);
  };

  const handleDeleteNode = () => {
    deleteNode(node.node);
  };

  const { x: x1, y: y1 } = node.parentNode.position;

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
      <Node id={node.node} $level={node.level}>
        <Button
          onClick={handleAddChild}
          style={{ right: '1rem' }}
          $size={2.6}
          $color={'var(--color-blue)'}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          onClick={handleDeleteNode}
          style={{ right: '-2.5rem' }}
          $size={2}
          $color={'var(--color-red)'}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>

        {node.level === 0 ? (
          <RootTopicInput
            rows={1}
            onChange={(e) => updateNodeInputValue(e, node)}
            value={node.value}
            placeholder="메인 주제를 입력해주세요"
          ></RootTopicInput>
        ) : node.level === 1 ? (
          <MainTopicInput
            rows={1}
            onChange={(e) => updateNodeInputValue(e, node)}
            value={node.value}
            placeholder="브랜치 주제를 입력해주세요"
          ></MainTopicInput>
        ) : (
          <ContentInput
            rows={1}
            onChange={(e) => updateNodeInputValue(e, node)}
            value={node.value}
            placeholder="내용을 입력해주세요"
          ></ContentInput>
        )}
        {node.node > 0 && <NodeLine {...lineProps} />}
      </Node>

      {node.childNode.length > 0 && (
        <div style={{ marginLeft: '40px' }}>
          {node.childNode.map((child) => (
            <React.Fragment key={child.node}>
              <NodeRender
                node={child}
                addNode={addNode}
                updateNodeInputValue={updateNodeInputValue}
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
