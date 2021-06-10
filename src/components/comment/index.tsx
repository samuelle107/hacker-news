import React, { useEffect, useState, memo } from 'react';
import { getComment } from '../../api';
import CommentList from '../comment-list';

interface IComment {
  by: string | null,
  id: number | null,
  kids: number[] | null,
  parent: number | null,
  text: string | null,
  time: number | null,
  type: string | null,
}

interface IProps {
  kid: number,
  indent: number
}

const Comment = ({ kid, indent }: IProps): JSX.Element | null => {
  const marginIncrement = 24;
  const [comment, setComment] = useState<IComment | null>(null);

  useEffect((): void => {
    getComment(kid)
      .then(res => {
        if (res.data) {
          setComment(res.data)
        }
      })
  }, [kid]);

  if (!comment || !comment.text) {
    return null;
  }

  return (
    <div
      style={{
        marginLeft: marginIncrement * (indent),
        marginTop: 12
      }}
    >
      <div
        style={{
          wordWrap: 'break-word',
          backgroundColor: '#F0F2F5',
          padding: '12px 12px',
          borderRadius: 12,
        }}
      >
        <b>{comment.by}</b>
        <p>{comment.text}</p>
      </div>
      <CommentList
        kids={comment.kids}
        indent={indent + 1}
      />
    </div>
  )
};

export default memo(Comment);
