import React, { FC } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

const ActorQuestions: FC<any> = (props) => {
  const { questions, setQuestions } = props
  return (
    <div>
      <Typography variant="h6">Questions for Actor</Typography>
      {questions.map((question: string, i: number) => {
        const handleChange = (e: any) => {
          const newQ = [...questions]
          newQ[i] = e.target.value
          setQuestions(newQ)
        }
        return (
          <TextField
            className="mb-16"
            label={`Question ${i + 1}`}
            autoFocus
            value={question}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        )
      })}
      <Button variant="contained" color="primary" onClick={() => setQuestions([...questions, ''])}>Add Question</Button>

    </div>
  );
};

export default ActorQuestions;
