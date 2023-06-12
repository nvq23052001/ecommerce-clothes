/*eslint-disable*/
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Title = ({ title, back }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(ref?.current?.scrollHeight > ref?.current?.clientHeight);
  }, [ref, title]);

  useEffect(() => {
    const resizeEvent = () => {
      setShowTooltip(ref?.current?.scrollHeight > ref?.current?.clientHeight);
    };
    window.addEventListener('resize', resizeEvent, true);

    return window.removeEventListener('resize', resizeEvent);
  }, []);

  return (
    <Box ml={back ? 0 : 4} mb={2.5} className="d-f ai-c">
      {back && (
        <div
          className="cursor-pointer a"
          style={{ padding: '5px 5px 2px', margin: '0 10px 0 6px', fontSize: 19 }}
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-chevron-left" />
        </div>
      )}
      <div ref={ref} className="AdminTitle" title={showTooltip ? title : undefined}>
        {title}
      </div>
    </Box>
  );
};

export default Title;
