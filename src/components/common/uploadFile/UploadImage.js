/*eslint-disable*/
import { Button, CircularProgress, FormHelperText } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from '../image/Image';
import './index.scss';

const initialValues = { url: '', loading: false };

const UploadImage = ({
  image: imageDefault = '',
  onSuccess,
  onRemove,
  className = '',
  disabled,
  error,
  errorEmpty,
  center
}) => {
  const touched = useRef(false);

  const [image, setImage] = useState({ url: imageDefault, loading: false });
  const inputRef = useRef();

  useEffect(() => {
    if (image.url !== imageDefault) setImage({ url: imageDefault, loading: false });
  }, [imageDefault]);

  // const handleSuccess = useCallback(
  //   (url, _, fileSize) => {
  //     setImage({ url, loading: false });
  //     onSuccess?.(url, fileSize);
  //   },
  //   [onSuccess]
  // );

  const handleRemove = (e) => {
    e.stopPropagation();
    setImage(initialValues);
    onRemove?.();
  };

  const handleUploadImage = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size < 52428800) {
      onSuccess?.(file, URL.createObjectURL(file));
      setImage({ url: URL.createObjectURL(file), loading: false });
    }

    e.target.value = null;
  }, []);

  useEffect(() => {
    if (errorEmpty) touched.current = true;
  }, [errorEmpty]);

  const { url, loading } = image;

  const errorText = !image.url && touched.current ? error : undefined;

  return (
    <div>
      <div className={`UploadImage ${className}`} style={{ margin: center ? '0 auto' : undefined }}>
        <Button
          onClick={() => inputRef.current?.click()}
          className={`UploadImage-btn${url ? ' has-image' : ''}`}
          variant="contained"
          color="primary"
          disabled={loading || disabled}
        >
          {url ? (
            <div className="upload-image-wrapper">
              <div className="overlay" style={{ display: disabled ? 'none' : undefined }}>
                {loading ? (
                  <CircularProgress thickness={5} size={32} color="inherit" />
                ) : (
                  !disabled && (
                    <div className="remove" onClick={handleRemove} onMouseDown={(e) => e.stopPropagation()}>
                      <i className="fas fa-times-circle" />
                    </div>
                  )
                )}
              </div>
              <Image className={disabled ? 'image-thumbnail-background' : ''} src={url} />
            </div>
          ) : (
            <i className="fas fa-image" />
          )}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/x-png,image/jpeg"
          style={{ display: 'none' }}
          onChange={handleUploadImage}
        />
      </div>
      {!!errorText && (
        <FormHelperText error style={{ margin: '-10px 0 10px', textAlign: center ? 'center' : undefined }}>
          {errorText}
        </FormHelperText>
      )}
    </div>
  );
};

export default UploadImage;
