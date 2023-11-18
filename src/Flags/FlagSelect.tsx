import React from 'react';
import { search as fastSearch, sortKind } from 'fast-fuzzy';
import { Flag, FLAGS } from './Flags';
import './flags.css';
import { uppercase } from '../utils';
import Modal from '../Modal/Modal';

const searchIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1rem'
    height='1rem'
    viewBox='0 0 512 512'>
    <path
      stroke='red'
      d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
    />
  </svg>
);

export default function FlagSelect(props: {
  selected: Flag;
  onChange: (flag: Flag) => void;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  return (
    <>
      <Modal title='Select flag' isOpen={modalOpen} setOpen={setModalOpen}>
        <span className='search'>
          <span className='icon'>{searchIcon}</span>
          <input
            placeholder='Search...'
            onChange={(e) => {
              setSearch(e.target.value.trim().toLowerCase());
            }}
          />
        </span>

        <div className='flag-list emoji'>
          {[0].map(() => {
            const flagNames = Object.values(FLAGS).flat();
            const results = fastSearch(search, flagNames, {
              threshold: 0.8,
              sortBy: sortKind.bestMatch,
            });

            // Check for each flag if its name is in the search results
            let flags = Object.entries(FLAGS).filter(([flag, names]) =>
              names.some((name) => results.includes(name)),
            );

            if (search === '')
              flags = Object.entries(FLAGS).sort((a, b) =>
                b[0].localeCompare(a[0]),
              );

            return flags.reverse().map(([flag, names]) => (
              <span
                className='flag'
                key={flag}
                onClick={() => {
                  props.onChange(flag as Flag);
                  setModalOpen(false);
                }}
                style={{
                  cursor: 'pointer',
                }}>
                {flag}
                <span className='name'>{uppercase(names[0])}</span>
              </span>
            ));
          })}
        </div>
      </Modal>

      <span
        onClick={() => setModalOpen(true)}
        className='emoji'
        style={{
          fontSize: '4rem',
          cursor: 'pointer',
        }}>
        {props.selected}
      </span>
    </>
  );
}
