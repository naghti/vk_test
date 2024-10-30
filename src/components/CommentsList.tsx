import React, { useEffect, useRef, useState } from 'react'
import { List, Button, Typography } from 'antd'
import CommentService from '../API/CommentService';
import counter from "../store/counter"
import { commentsI } from '../interfaces/Comment';
import { observer } from 'mobx-react-lite';
import Comment from './Comment';
import { entries } from 'mobx';
import CommentBuisness from '../API/CommentBuisness';

const CommentsList = observer(() => {
  const commentsForRender = counter.getFilteredComments();
  const lastElement = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  let page = 2

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        CommentBuisness.getNew()
      }
    };
    
    observer.current = new IntersectionObserver(callback);
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }
  
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const loadNewComments = async () => {
    try {
      const res = await CommentService.getAll(100, page);
      const data: Array<commentsI> = res.data

      return data
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  return (
    <>
      <List
        bordered
        dataSource={commentsForRender}
        renderItem={(item) => (
          <Comment item={item} key={item.id}/>
        )}
      />
      <div ref={lastElement} style={{width: "100%", height: "30px"}}></div>
    </>
  )
})

export default CommentsList