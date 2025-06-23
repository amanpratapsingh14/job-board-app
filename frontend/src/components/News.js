import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const News = () => {
  const newsItems = [
    { id: 1, title: 'Tech industry sees major boom', source: 'TechCrunch' },
    { id: 2, title: 'The future of remote work', source: 'Forbes' },
    { id: 3, title: 'AI is transforming the job market', source: 'Wired' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          LinkedIn News
        </Typography>
        <List dense>
          {newsItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.title}
                  secondary={item.source}
                />
              </ListItem>
              {index < newsItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default News; 