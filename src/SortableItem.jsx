import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
<div 
  ref={setNodeRef} 
  style={{ ...style, position: 'relative' }}
  {...attributes}
>
  <div 
    className="drag-handle" 
    {...listeners} 
    style={{ 
      cursor: 'grab',
      position: 'absolute',
      top: 0,
      right: '29px',
      left: '29px',
      height: '100%',
      width: 'auto',
      zIndex: 1,
    }}
  />
  {children}
</div>
  );
}