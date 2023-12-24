"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.courseName),
    datasets: [
      {
        label: 'Pass',
        data: data.map(item => item.pass),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Fail',
        data: data.map(item => item.fail),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

const courseData = [
  { courseName: 'Course 1', pass: 30, fail: 10 },
  { courseName: 'Course 2', pass: 20, fail: 5 },
  // ... more courses
];

function App() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h1" className='gap-4' gutterBottom style={{ fontWeight: 'bold' }}>
       Pass VS Fail 
      </Typography>
      <p>Lorem ipsum dolor sit amet consectetur gaecenas id.</p>
      <BarChart data={courseData} />
    </Container>
  );
}

export default App;
