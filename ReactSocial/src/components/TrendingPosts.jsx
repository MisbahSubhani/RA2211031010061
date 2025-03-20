import React, { useEffect, useState } from 'react';
import { getPosts, getComments } from '../services/Api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postsResponse = await getPosts();
      const commentsResponse = await getComments();

    
      const commentCount = {};
      commentsResponse.data.forEach(comment => {
        commentCount[comment.postId] = (commentCount[comment.postId] || 0) + 1;
      });

    
      const postsWithCommentCount = postsResponse.data.map(post => ({
        ...post,
        comments: commentCount[post.id] || 0
      }));

      
      const maxComments = Math.max(...postsWithCommentCount.map(post => post.comments));

      
      const trending = postsWithCommentCount.filter(post => post.comments === maxComments);

      setTrendingPosts(trending);
    }

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      {trendingPosts.map(post => (
        <Grid item xs={12} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>Comments: {post.comments}</Typography>
              <img src={`https://source.unsplash.com/random/200x100?sig=${post.id}`} alt="post" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
