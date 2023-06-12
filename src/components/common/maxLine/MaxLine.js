import React, { useEffect, useRef, useState } from 'react';
import './index.scss';

const MaxLine = (props) => {
  const { title, numberOfLines = 2, text } = props;

  const ref = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(ref?.current?.scrollHeight > ref?.current?.clientHeight);
  }, [ref, text]);

  return (
    <div title={showTooltip ? title || text : undefined}>
      <div style={{ WebkitLineClamp: numberOfLines, textAlign: 'center' }} ref={ref} className="MaxLine">
        {text || '-'}
      </div>
    </div>
  );
};

export default MaxLine;
