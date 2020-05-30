/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useState } from 'react';
import ReviewProfile from './ReviewProfile.jsx';

import {
  Review,
  ReviewContent,
  TooltipText,
  VoteHeader,
  Thumb,
  ReviewSource,
  VoteHeaderTitle,
  HoursPlayed,
  DatePosted,
  Content,
  Gradient,
  ViewMore,
  Posted,
  Line,
  ControlBlock,
  Button,
  VoteUp,
  VoteDown,
  VoteFunny,
  VoteInfo,
  Break,
} from './styles/ReviewEntry.jsx';

const ReviewEntry = (props) => {
  const [view, setView] = useState('partial');
  const [helpful, setHelpful] = useState(false);
  const [funny, setFunny] = useState(false);
  const { review, updateVote } = props;

  const date = new Date(review.date_posted);
  const options = { month: 'long', day: 'numeric' };
  const postedDate = date.toLocaleString('en-US', options);

  const handleView = () => {
    setView('expanded');
  };

  const handleVote = (e) => {
    let value = review.helpful;
    if (e.target.id === 'voteFunny' && funny === false) {
      value = review.funny;
      setFunny(true);
      updateVote(e.target.id, value, review.user.id);
    }

    if (e.target.id === 'voteUp' && helpful === false) {
      setHelpful(true);
      updateVote(e.target.id, value, review.user.id);
    }

    if (e.target.id === 'voteDown' && helpful === true) {
      setHelpful(false);
      updateVote(e.target.id, value, review.user.id);
    }

  };

  return (
    <Review>
      <ReviewProfile user={review.user} key={review.user.id} />
      <ReviewContent>
        <VoteHeader>
          <TooltipText>See Full Review</TooltipText>
          {review.user.recommended ? (
            <Thumb>
              <img
                src="https://d1i5z9gkmthkca.cloudfront.net/photos/sdc/thumbsup.png"
                width="40"
                height="40"
                alt="thumbup"
              />
            </Thumb>
          )
            : (
              <Thumb>
                <img
                  src="https://d1i5z9gkmthkca.cloudfront.net/photos/sdc/thumbsdown.png"
                  width="40"
                  height="40"
                  alt="thumbdown"
                />
              </Thumb>
            )}
          <ReviewSource
            src="https://d1i5z9gkmthkca.cloudfront.net/photos/sdc/steamicon.png"
            alt="steamy"
          />
          <VoteHeaderTitle>
            {review.user.recommended ? 'Recommended' : 'Not Recommended'}
          </VoteHeaderTitle>
          <HoursPlayed>
            {`${review.hours} gametime hours on record`}
          </HoursPlayed>
        </VoteHeader>
        <DatePosted>
          {`Posted: ${postedDate}`}
        </DatePosted>
        {(view === 'partial') ? (
          <>
            <Content partial>
              {review.description}
              <Gradient partial />
            </Content>
            <Posted partial>
              <ViewMore partial onClick={handleView}>
                Read More
              </ViewMore>
              <Line />
            </Posted>
          </>
        )
          : (
            <>
              <Content expanded>
                {review.description}
                <Gradient expanded />
              </Content>
              <Posted expanded>
                <ViewMore expanded onClick={handleView}>
                  Read More
                </ViewMore>
                <Line />
              </Posted>
            </>
          )}
        <ControlBlock>
          Was this review helpful?
          <br />
          <Button onClick={handleVote}>
            <VoteUp id="voteUp">Yes</VoteUp>
          </Button>
          <Button onClick={handleVote}>
            <VoteDown id="voteDown">No</VoteDown>
          </Button>
          <Button onClick={handleVote}>
            <VoteFunny id="voteFunny">Funny</VoteFunny>
          </Button>
        </ControlBlock>
        <VoteInfo>
          <TooltipText>See Full Review</TooltipText>
          {`${review.helpful} people found this review helpful`}
          <br />
          {`${review.funny} people found this review funny`}
          <br />
          {`${review.thread_length} additional comments`}
          <br />
        </VoteInfo>
      </ReviewContent>
    </Review>
  );
};

export default ReviewEntry;
