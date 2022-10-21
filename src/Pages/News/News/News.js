import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const News = () => {
  const news = useLoaderData();
  const { title, details, image_url } = news;
  return (
    <Card>
      <Card.Img variant="top" src={image_url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {details}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default News;