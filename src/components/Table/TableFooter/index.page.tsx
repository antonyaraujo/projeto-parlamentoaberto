import React, { useEffect } from 'react';

import styles from './TableFooter.module.css';

export default function TableFooter({ range, setPage, page, slice }: any) {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.tableFooter}>
      {range.map((el: any, index: any) => (
        <button
          key={el?.id}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
          type="button"
        >
          {el}
        </button>
      ))}
    </div>
  );
}
