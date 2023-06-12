import React from 'react'

const TopLabel = ({ label, required, disabled }) => {
  if (!label) return null

  return (
    <div className={`top-label${disabled ? ' disabled' : ''}`}>
      {label}{' '}
      {required && (
        <>
          (<span style={{ color: 'red' }}>*</span>)
        </>
      )}
    </div>
  );
}

export default TopLabel
