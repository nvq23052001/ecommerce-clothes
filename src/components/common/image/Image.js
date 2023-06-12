import React, { useEffect, useState, memo } from 'react';
import noImage from 'assets/images/no_image.jpg';
import './index.scss';

const Image = (props) => {
  const { src, className = '', ...rest } = props;

  const [img, setImg] = useState(src);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImg(src);
  }, [src]);

  return (
    <div className={`${className} Image d-f jc-c ai-c`}>
      <img
        {...rest}
        className={loading ? 'loading' : ''}
        src={img || noImage}
        alt="fit-img"
        onError={() => setImg(noImage)}
        onLoad={() => setLoading(false)}
      />
      {loading && <i className="fa-spin icon-loader" />}
    </div>
  );
};

export default memo(Image);
