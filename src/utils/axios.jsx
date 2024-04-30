import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTRhOGVhMmY5YTJkNTU4ZDdkNjg1NTBjNTIzY2I5ZSIsInN1YiI6IjY2MmRjYmZmYTgwNjczMDEyOGU4YjRmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cm1YC3G7Ie5unRnXKm8E0CXblLf5hG6LiFQ-YVN6lSM"
  }
});

export default instance;
