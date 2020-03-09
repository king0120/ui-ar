import React, { useState } from 'react';
import GoBackButton from '../../components/shared/GoBackButton';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { Typography } from '@material-ui/core';

const GET_MY_INSTANCE = gql`
  query getInstance($instanceId: String!) {
    getInstance(instanceId: $instanceId) {
      id
      decision
      audition {
        id
        name
        auditionType
        requirementSummary
        address
        startDate
        description
      }
      timeSlot {
        id
        startTime
        endTime
      }
      questions {
        id
        text
        answer {
          id
          text
        }
      }
    }
  }
`;

const UPDATE_ANSWER = gql`
  mutation updateAnswer($answerId: String!, $text: String!) {
    updateAnswer(answerId: $answerId, text: $text)
  }
`;

const AnswerInput = ({ question }: any) => {
  const { instanceId } = useParams();
  const [updateAnswer] = useMutation(UPDATE_ANSWER, {
    refetchQueries: [{ query: GET_MY_INSTANCE, variables: { instanceId } }]
  });
  const [answer, setAnswer] = useState(question.answer.text);
  const saveAnswer = () => {
    updateAnswer({
      variables: {
        answerId: question.answer.id,
        text: answer
      }
    });
  };
  return (
    <div>
      <p>{question.text}</p>
      <input value={answer} onChange={e => setAnswer(e.target.value)} />
      <button onClick={saveAnswer}>Save Answer</button>
    </div>
  );
};
const MyAuditionInstance = () => {
  const { instanceId } = useParams();
  const { data, loading } = useQuery(GET_MY_INSTANCE, {
    variables: { instanceId }
  });

  if (loading) {
    return <h1>loading</h1>;
  }
  const instance = data.getInstance;
  return (
    <div>
      <GoBackButton />
      <Typography variant={'h3'}>{instance.audition.name}</Typography>
      <div>
        {instance.questions.map((question: any) => (
          <AnswerInput question={question} />
        ))}
      </div>
    </div>
  );
};

export default MyAuditionInstance;
