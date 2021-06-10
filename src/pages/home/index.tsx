import React, { useEffect, useState } from 'react';
import { getTopStories } from '../../api';
import News from '../../components/news';

const Home = (): JSX.Element => {
  const [allPostIds, setAllPostIds] = useState<number[]>([]);

  useEffect((): void => {
    getTopStories()
      .then(res => {
        if (res.data) {
          const data = localStorage.getItem('viewed-post-ids');
          const viewedPostIds = data ? JSON.parse(data) : {};
          const filteredPostIds = res.data.filter(id => {
            return !viewedPostIds[id];
          });

          setAllPostIds(filteredPostIds);
        }
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <News allPostIds={allPostIds} />
    </div>
  );
};

export default Home;
