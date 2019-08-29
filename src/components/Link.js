import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import { timeDifferenceForDate } from "../utils";
import { AUTH_TOKEN } from "../constants";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ link, index }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [{ fetching }, executeMutation] = useMutation(VOTE_MUTATION);

  const voteMutation = React.useCallback(() => {
    executeMutation({ linkId: link.id });
  }, [link, executeMutation]);
  console.log(link);
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={voteMutation} disabled={fetching}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{' '}
          {link.postedBy
            ? link.postedBy.name
            : 'Unknown'}{' '}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default Link;