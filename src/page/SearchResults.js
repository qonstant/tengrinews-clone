import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "../context";
import { useFetchSearchData } from "../hooks/useFetchSearchData";
import SearchedArticle from "../article/SearchedArticle";
import style from "./page.module.css";

const SearchResults = () => {
  const { formatSection } = useGlobalContext();
  const { query } = useParams();

  const { loaded, articles } = useFetchSearchData(query);

  const [sortType, setSortType] = useState("");
  const [sortedArray, setSortedArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);

  useEffect(() => {
    setSortedArray(articles);
  }, [articles]);

  useEffect(() => {
    const newestArray = [...articles].sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
    const oldestArray = [...articles].sort((a, b) => new Date(a.pub_date) - new Date(b.pub_date));

    if (sortType) {
      switch (sortType) {
        case "relevance":
          setSortedArray(articles);
          break;
        case "newest":
          setSortedArray(newestArray);
          break;
        case "oldest":
          setSortedArray(oldestArray);
          break;
        default:
          setSortedArray(articles);
      }
    }
  }, [sortType, articles]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArray.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loaded && articles.length < 1) {
    return (
      <div className="sectionContainer">
        <span className={style.preTitle}>Showing results for:</span>
        <h2 className={style.title}>{formatSection(query)}</h2>
        <hr />
        <div className="sectionContainer">No search results found</div>
      </div>
    );
  }

  return (
    <div className="sectionContainer">
      <div className={style.titleElement}>
        <div>
          <span className={style.preTitle}>Showing results for:</span>
          <h2 className={style.title}>{formatSection(query)}</h2>
        </div>
        <select
          className={style.sortOptions}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>
      <hr />
      {loaded ? (
        <>
          <div className="sectionContainer">
            {currentArticles.map((article, index) => (
              <SearchedArticle key={index} {...article} />
            ))}
          </div>
          <Pagination
            articlesPerPage={articlesPerPage}
            totalArticles={sortedArray.length} // Pass the length of sortedArray
            currentPage={currentPage} // Pass the current active page
            paginate={paginate}
          />
        </>
      ) : (
        <ClipLoader
          color={"#727272"}
          cssOverride={{ display: "block", margin: "80px auto" }}
          size={80}
          speedMultiplier={0.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
};

const Pagination = ({ articlesPerPage, totalArticles, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={style.pageItem}>
            <button
              onClick={() => paginate(number)}
              className={`${style.pageLink} ${currentPage === number ? style.activePage : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchResults;
