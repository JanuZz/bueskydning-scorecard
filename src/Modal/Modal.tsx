import React from 'react';
import './modal.css';

export default function Modal(props: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className={'modal'}>
      <span
        onClick={() => props.setOpen(false)}
        className='backdrop'
        style={{
          pointerEvents: props.isOpen ? 'auto' : 'none',
          opacity: props.isOpen ? 1 : 0,
        }}
      />
      <div
        className='modal-content border'
        style={{
          opacity: props.isOpen ? 1 : 0,
          top: props.isOpen ? '50%' : '100%',
          transform: props.isOpen
            ? 'translate(-50%, -50%)'
            : 'translate(-50%, 0)',
        }}>
        <h2
          style={{
            fontSize: '1.2rem',
          }}>
          {props.title}
        </h2>

        {props.children}
      </div>
    </div>
  );
}
