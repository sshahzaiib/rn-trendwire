export const config =  {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://trendwire.de.r.appspot.com/v1"
      : "localhost:3001/v1",
};
