import React from 'react';
import './index.scss';

const renderRequired = (
  <span>
    (<span style={{ color: 'red' }}>*</span>)
  </span>
);

export const RenderField = ({
  label,
  children,
  required,
  labelWidth = 180,
  viewLabelWidth,
  labelStyle = {},
  style = {},
  view,
  vertical,
  fontSize = 'medium'
}) => {
  if (view) {
    if (viewLabelWidth) labelWidth = viewLabelWidth;
    else if (labelWidth !== 'auto') labelWidth -= 32;
  }
  if (vertical) labelWidth = undefined;

  return (
    <div className="RenderField-field d-f" style={{ ...style, flexDirection: vertical ? 'column' : undefined }}>
      <div
        className={`RenderField-label ${fontSize} b-w`}
        style={{
          ...labelStyle,
          width: labelWidth,
          minWidth: labelWidth,
          fontWeight: view ? 700 : undefined,
          marginTop: vertical ? 4 : labelStyle.marginTop
        }}
      >
        {label}
        {required && !view && renderRequired}
      </div>
      {vertical ? <div style={{ margin: `${view ? 4 : 12}px 16px 0` }}>{children}</div> : children}
    </div>
  );
};

export const createRenderField = ({ labelWidth, viewLabelWidth, style }) => {
  const NewRenderField = ({
    children,
    style: newStyle,
    labelWidth: newLabelWidth,
    viewLabelWidth: newViewLabelWidth,
    ...rest
  }) => (
    <RenderField
      {...rest}
      labelWidth={newLabelWidth || labelWidth}
      viewLabelWidth={newViewLabelWidth || viewLabelWidth}
      style={newStyle || style}
    >
      {children}
    </RenderField>
  );

  return NewRenderField;
};
