import React, { useEffect, useState } from 'react';
import NewsItem from '../news-item';
import InfiniteScroll from 'react-infinite-scroll-component';

const ITEM_INCREMENT = 10;

interface IProps {
  allPostIds: number[]
}

const News = ({ allPostIds }: IProps): JSX.Element => {
  const [visiblePostIds, setVisiblePostIds] = useState<number[]>([]);
  const [postRangeEnd, setPostRangeEnd] = useState<number>(0);

  useEffect((): void => {
    if (allPostIds.length) {
      setPostRangeEnd(9);
    }
  }, [allPostIds]);

  useEffect((): void => {
    setVisiblePostIds(allPostIds.slice(0, postRangeEnd));
  }, [postRangeEnd, allPostIds]);

  const loadMorePosts = (): void => {
    setPostRangeEnd(prevState => prevState + ITEM_INCREMENT);
  };

  return (
    <div>
      <InfiniteScroll
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
        dataLength={visiblePostIds.length}
        next={loadMorePosts}
        hasMore={visiblePostIds.length < allPostIds.length}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>No more posts...</h4>}
        scrollThreshold={1}
      >
        {visiblePostIds.map(id => (
          <NewsItem
            key={id}
            id={id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default News;
