import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/Api';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postsResponse = await getPosts();
      
      const sortedPosts = postsResponse.data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);
    }

    fetchData();

   
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      {posts.map(post => (
        <Grid item xs={12} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography>{post.body}</Typography>
              <img src={`https://source.unsplash.com/random/200x100?sig=${post.id}`} alt="post" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
