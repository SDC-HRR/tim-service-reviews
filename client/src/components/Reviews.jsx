/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewSummaryBar from './ReviewSummaryBar.jsx';
import ReviewFilter from './ReviewFilter.jsx';

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [viewActive, setView] = useState(false);
  const [filteredReviews, setFilter] = useState([]);
  const id = window.location.search.substring(2);

  const getAllReviews = () => {
    axios.get(`/api/reviews/${id}`)
      .then(({ data }) => {
        setAllReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const updateVotes = (e, val, reviewId) => {
    let field = 'helpful';
    if (e === 'voteUp') {
      val += 1;
    } else if (e === 'voteDown') {
      val -= 1;
    } else {
      val += 1;
      field = 'funny';
    }

    axios.patch(`/api/reviews/${id}`, {
      field,
      value: val,
      reviewId,
    })
      .then((results) => {
        getAllReviews();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeView = (view) => {
    let oldReviews;
    let filtered;

    if (view === 'positive') {
      oldReviews = allReviews;
      filtered = allReviews.filter((review) => review.user.recommended);
      setView(true);
    } else if (view === 'negative') {
      oldReviews = allReviews;
      filtered = allReviews.filter((review) => !review.user.recommended);
      setView(true);
    } else {
      filtered = allReviews;
      setView(false);
    }

    setFilter(filtered);
  };

  return (
    <div className="user_reviews">
      <h2>Customer Reviews</h2>
      <ReviewSummaryBar allReviews={allReviews} />
      <ReviewFilter
        review={allReviews[0] ? allReviews[0] : null}
        changeView={changeView}
      />
      <div className="left-col">
        <div className="user_reviews_sub_header">
          {'Most Helpful Reviews '}
          <span className="user_reviews_most_helpful_days">
            In the past 30 days
          </span>
        </div>
        <ReviewList
          allReviews={viewActive ? filteredReviews : allReviews}
          key={id}
          handleVote={updateVotes}
        />
      </div>
    </div>
  );
};

export default Reviews;
