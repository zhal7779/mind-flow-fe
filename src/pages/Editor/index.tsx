import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import MindMapTree from '../../components/tree/MindMapTree/index.js';
import { TreeContainer } from './styles.js';
import { useRecoilValue } from 'recoil';
import centerScroll from '../../utils/centerScroll.js';
import SaveControlMenu from '../../components/menu/SaveControlMenu/index.js';
import { scaleState } from '../../recoil/atoms/scaleState.js';
import ScaleControlMenu from '../../components/menu/ScaleControlMenu/index.js';
import { useLocation } from 'react-router-dom';
import { useReadTreeQuery } from '../../hooks/useTreeQuery.js';
import { authState } from '../../recoil/atoms/auth.js';
import LoadingSpinner from '../../components/etc/LoadingSpinner/index.js';
import { ITree } from '../../types/treeType.js';

const Editor = () => {
  const auth = useRecoilValue(authState);
  const { pathname } = useLocation();
  const fileId = pathname.split('/')[2];
  const [treeData, setTreeData] = useState<ITree | null>(null);

  const scale = useRecoilValue(scaleState);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const { data, isLoading, isError } = useReadTreeQuery(fileId);

  useEffect(() => {
    if (auth && data !== undefined && !isLoading && !isError) {
      setTreeData(data);
    }
  }, [data, isLoading, isError]);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const targetElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current !== null) {
      centerScroll(containerRef.current);
    }

    if (contentRef.current && targetElementRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const targetRect = targetElementRef.current.getBoundingClientRect();

      setOrigin({
        x: targetRect.left - contentRect.left,
        y: targetRect.top - contentRect.top,
      });
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <></>;
  }

  return (
    <>
      {treeData && <SaveControlMenu data={treeData} />}
      <ScaleControlMenu />
      <div
        id="container"
        ref={containerRef}
        style={{
          width: '10000px',
          height: '3000px',
          backgroundColor: 'var(--color-editor-bg)',
          transformOrigin: '0 0',
          transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div
          id="content"
          ref={contentRef}
          style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            ref={targetElementRef}
            style={{ position: 'relative', width: '100%' }}
          >
            <TreeContainer>
              {treeData && <MindMapTree data={treeData} />}
            </TreeContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
