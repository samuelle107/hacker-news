import React, { useState } from 'react';
import Comment from '../comment';

interface IProps {
  kids: number[] | null,
  indent: number
};

const CommentList = ({ kids, indent }: IProps): JSX.Element | null => {
  const [areCommentsVisible, setAreCommentsVisible] = useState(false);

  if (!kids) {
    return null;
  }

  const handleViewMoreClick = (): void => {
    setAreCommentsVisible(prevState => !prevState);
  }

  return (
    <div style={{ width: '100%', marginTop: 12, marginBottom: 36 }}>
      <div style={{ marginLeft: 12 }}>
        {
          !areCommentsVisible && (
            <button onClick={handleViewMoreClick}>
              View More Comments
            </button>
          )
        }
      </div>
      {areCommentsVisible && kids.map(kid => (
        <Comment
          key={kid}
          kid={kid}
          indent={indent}
        />
      ))}
    </div>
  );
};

export default CommentList;
