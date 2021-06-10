import moment from 'moment';
import React, { useEffect, useState, useMemo, memo } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { getStory } from '../../api';
import CommentList from '../comment-list';

interface IStory {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
}

interface IProps {
  id: number,
}

const NewsItem = ({ id }: IProps): JSX.Element | null => {
  const [story, setStory] = useState<IStory | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const data = localStorage.getItem('bookmarked-post-ids');
    let bookmarkedPostIds = data ? JSON.parse(data) : {};

    setIsBookmarked(bookmarkedPostIds[id] || false)

    getStory(id)
      .then(res => {
        if (res.data) {
          setStory(res.data);
        }
      });
  }, [id]);

  const getTimeAgo = useMemo((): string => {
    if (story) {
      return moment.unix(story.time).fromNow();
    }

    return '';
  }, [story]);

  if (!story) {
    return null;
  }

  const handleOnVisibility = (isVisible: boolean): void => {
    if (isVisible) {
      const data = localStorage.getItem('viewed-post-ids')
      const viewedPostsIds = data ? JSON.parse(data) : {};

      viewedPostsIds[id] = true
      localStorage.setItem('viewed-post-ids', JSON.stringify(viewedPostsIds));
    }
  }

  const handleFavoriteClick = (): void => {
    const data = localStorage.getItem('bookmarked-post-ids');
    let bookmarkedPostIds = data ? JSON.parse(data) : {};

    bookmarkedPostIds[id] = bookmarkedPostIds[id] ? !bookmarkedPostIds[id] : true;
    setIsBookmarked(bookmarkedPostIds[id]);
    localStorage.setItem('bookmarked-post-ids', JSON.stringify(bookmarkedPostIds));
  };

  return (
    <VisibilitySensor
      onChange={handleOnVisibility}
    >
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '24px 44px',
        margin: '12px 0',
        borderRadius: 12,
        width: 800
      }}>
        <div>
          <a href={story.url} target='_blank' rel="noreferrer">
            <h1>{story.title}</h1>
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <p style={{ margin: '0 4px' }}>{`${story.score} points`}</p>
            <p style={{ margin: '0 4px' }}>{`by ${story.by}`}</p>
            <p style={{ margin: '0 4px' }}>{getTimeAgo}</p>
          </div>
          <div>
            <button
              onClick={handleFavoriteClick}
              style={{
                color: isBookmarked ? '#FF9529' : ''
              }}
            >
              {isBookmarked ? 'Un-Bookmark' : 'Bookmark'}
            </button>
          </div>
        </div>
        <div style={{
          width: '100%',
          height: 1,
          backgroundColor: 'black',
          margin: '24px 0'
        }} />
        <CommentList kids={story.kids} indent={0} />
      </div>
    </VisibilitySensor>
  );
};

export default memo(NewsItem);
