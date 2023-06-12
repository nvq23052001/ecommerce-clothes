import React, { useEffect, useRef, useState } from 'react';
import { InputAdornment } from '@mui/material';
import Input from './Input';

const InputSearch = (props) => {
  const { onSearch = () => {}, ...rest } = props;

  const searchEmpty = true;
  const minLengthSearch = 0;
  const timeoutSearch = 1000;
  const timeout = useRef(0);

  const firstTime = useRef(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (firstTime.current) {
      if (timeout.current) clearTimeout(timeout.current);
      const trimmedKeyword = keyword?.trim();
      if (trimmedKeyword?.length >= minLengthSearch || searchEmpty) {
        timeout.current = setTimeout(() => {
          onSearch?.(trimmedKeyword);
        }, timeoutSearch);
      }
    } else firstTime.current = true;
  }, [keyword, onSearch, searchEmpty]);

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (timeout.current) clearTimeout(timeout.current);
      const trimmedKeyword = keyword?.trim();
      if (trimmedKeyword?.length >= minLengthSearch || searchEmpty) {
        onSearch?.(trimmedKeyword);
      }
    }
  };

  return (
    <Input
      {...rest}
      className="InputSearch"
      value={keyword}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={50}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <span className="icon-search" />
          </InputAdornment>
        )
      }}
    />
  );
};

export default InputSearch;
