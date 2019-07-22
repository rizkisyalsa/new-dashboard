import React, { Component } from 'react';

// Externals
import { useDrag } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const DragComponent = props => {
  const { name, type, isDropped } = props;

  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });

  return (
        <div>
          {!isDropped && (
            <div ref={drag} style={{ ...style, opacity }}>
              {isDropped ? <s>{name}</s> : name}
            </div>
          )}
        </div>
  );
};

export default DragComponent
