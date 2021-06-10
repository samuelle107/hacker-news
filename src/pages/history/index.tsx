import React, { useEffect, useState } from 'react';
import News from '../../components/news';

const History = (): JSX.Element => {
  const [allPostIds, setAllPostIds] = useState<number[]>([]);

  useEffect((): void => {
    const data = localStorage.getItem('viewed-post-ids');
    const viewedPostIds = data ? JSON.parse(data) : {};

    setAllPostIds(Object.keys(viewedPostIds).map(key => parseInt(key, 10)));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <News allPostIds={allPostIds} />
    </div>
  );
};

export default History;
