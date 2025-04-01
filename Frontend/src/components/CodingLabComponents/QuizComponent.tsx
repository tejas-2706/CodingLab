import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QuestionComponent } from './QuestionComponent';

interface Question {
  id: string;
  labId: string;
  timeLimit: number; // in seconds
}

export const QuizComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Move to the next question
  const handleNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Loading state
  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  // Quiz completed state
  if (currentIndex >= questions.length) {
    return <div>Quiz completed!</div>;
  }

  // Render current question
  return (
    <QuestionComponent
      labId={questions[currentIndex].labId}
      timeLimit={questions[currentIndex].timeLimit}
      onTimeUp={handleNextQuestion}
      onCorrectSolution={handleNextQuestion}
      isLastLab={currentIndex === questions.length - 1}
    />
  );
};