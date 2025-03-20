import React, { useEffect, useState } from 'react';
import { getUsers, getPosts } from '../services/Api';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './TopUsers.css';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await getUsers();
      const postsResponse = await getPosts();

      setAllPosts(postsResponse.data.posts); 

      const userPostCounts = {};

      postsResponse.data.posts.forEach(post => {
        userPostCounts[post.userId] = (userPostCounts[post.userId] || 0) + 1;
      });

      const usersWithCounts = usersResponse.data.users.map(user => ({
        ...user,
        postCount: userPostCounts[user.id] || 0
      }));

      const sortedUsers = usersWithCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
      setTopUsers(sortedUsers);
    };

    fetchData();
  }, []);

 
  const handleUserClick = (userId) => {
    const posts = allPosts.filter(post => post.userId === userId);
    setSelectedUserPosts(posts);
  };

  return (
    <div className="top-users-container">
      <Grid container spacing={2}>
        {topUsers.map(user => (
          <Grid item xs={12} md={4} key={user.id}>
            <Card className="user-card" onClick={() => handleUserClick(user.id)}>
              <CardContent>
                <Typography variant="h6" className="user-name">{user.name}</Typography>
                <Typography variant="body2" className="user-post-count">Posts: {user.postCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    
      {selectedUserPosts.length > 0 && (
        <div className="user-posts">
          <h3>Posts by Selected User:</h3>
          {selectedUserPosts.map(post => (
            <div key={post.id} className="post-item">
              <p><strong>{post.title}</strong></p>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;
