import React from 'react';
import { FaStar } from 'react-icons/fa';
import clsx from 'clsx';

export default function RatingStars({ value=0, onChange, readOnly=false }) {
  const stars = [1,2,3,4,5];
  return (
    <div className="flex gap-1">
      {stars.map(s => {
        const filled = s <= value;
        return (
          <button
            type="button"
            key={s}
            onClick={() => !readOnly && onChange?.(s)}
            className={clsx('p-1 rounded', readOnly ? '' : 'hover:bg-gray-100')}
            aria-label={`Rate ${s}`}
          >
            <FaStar className={filled ? 'text-yellow-400' : 'text-gray-300'} />
          </button>
        );
      })}
    </div>
  );
}
