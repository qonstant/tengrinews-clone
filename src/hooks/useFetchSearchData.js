import React from "react";
import axios from "axios";

export const useFetchSearchData = (query) => {
  const [loaded, setLoaded] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [page, setPage] = React.useState(0); // Track the current page number

  React.useEffect(() => {
    setLoaded(false);
    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_API_KEY}&page=${page + 1}`
      )
      .then((response) => {
        setArticles((prevArticles) => [...prevArticles, ...response.data.response.docs]);
        setLoaded(true);
      })
      .catch((error) => {
        setLoaded(true);
        console.log(error);
      });
  }, [query, page]);

  return { loaded, articles, setPage };
};
