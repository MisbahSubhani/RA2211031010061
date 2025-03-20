const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;

const windowSize = 10; 
let numberWindow = []; 


const idMap = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};

app.get('/numbers/:id', async (req, res) => {
  const { id } = req.params;

  
  if (!idMap[id]) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const prevState = [...numberWindow]; 

  try {
   
    const response = await axios.get(`http://20.244.56.144/test/${idMap[id]}`, {
      timeout: 500 
    });

    const fetchedNumbers = response.data.numbers || [];

    fetchedNumbers.forEach(num => {
      if (!numberWindow.includes(num)) {
        numberWindow.push(num);
        if (numberWindow.length > windowSize) {
          numberWindow.shift(); 
        }
      }
    });

   
    const avg = numberWindow.length
      ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2)
      : 0;

    res.json({
      windowPrevState: prevState,
      windowCurrState: numberWindow,
      numbers: fetchedNumbers,
      avg: parseFloat(avg)
    });

  } catch (err) {
   
    const avg = numberWindow.length
      ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2)
      : 0;

    res.json({
      windowPrevState: prevState,
      windowCurrState: numberWindow,
      numbers: [],
      avg: parseFloat(avg)
    });
  }
});


app.listen(PORT, () => {
  console.log(`Average Calculator running on port ${PORT}`);
});
