const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(express.json());
app.use(cors());

const HARD_CODED_JSON = {
  results: [
    {
      name: {
        title: "Miss",
        first: "Jennie",
        last: "Nichols",
      },
      email: "jennie.nichols@example.com",
      dob: {
        age: 30,
      },
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Welcome to the Users API!");
});

app.get("/users", async (req, res) => {
  try {
    // Make a request to the Random User API
    const response = await axios.get('https://randomuser.me/api/');
    const randomUser = response.data.results[0];
    res.json(randomUser);
  } catch (error) {
    console.error('Error fetching user from Random User API:', error.message);
    // Fallback to hardcoded data if API fails
    let fallbackUser = HARD_CODED_JSON.results[0];
    res.json(fallbackUser);
  }
});

app.get("/health/:status", (req, res) => {
  const status = req.params.status.toLowerCase();
  
  if (status.includes('ok')) {
    res.json({
      message: "Awesome! You're feeling great!",
      status: "healthy"
    });
  } else {
    res.json({
      message: "Oh no! Hope you feel better soon!",
      status: "unhealthy"
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
