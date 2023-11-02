import React, { useState } from "react";
import Navbar from "./Navbar";
import Questions from "./quiz-data.json";

function QuestionUi() {
  const [scores, setScores] = useState(new Array(Questions.length).fill(0));
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [answers, setAnswers] = useState(new Array(Questions.length).fill("")); // Store user's answers

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index < Questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSubmit = () => {
    // Calculate the score based on answers
    let newScores = [...scores];
    for (let i = 0; i < Questions.length; i++) {
      if (answers[i] === Questions[i].answer) {
        newScores[i] = 1;
      } else {
        newScores[i] = 0;
      }
    }
    setScores(newScores);

    setSubmit(true);
  };

  const handleOptionSelect = (selectedAnswer) => {
    let newAnswers = [...answers];
    newAnswers[index] = selectedAnswer;
    setAnswers(newAnswers);
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {!submit ? (
              <div className="card mt-5">
                <div className="card-header">
                  <h4>{
                    <>
                    <span>{index+1 }) </span>
                    {Questions[index].question}
                    </>
                    }</h4>
                </div>
                <div className="card-body">
                  <div className="form-check">
                    {Questions[index].options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id={`option-${optionIndex}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleOptionSelect(option)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option-${optionIndex}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-primary"
                    onClick={handlePrevious}
                    disabled={index === 0}
                  >
                    Previous
                  </button>
                  {index === Questions.length - 1 ? (
                    <button
                      className="btn btn-primary mx-3 float-right"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mx-3"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="card mt-5">
                <div className="card-header">
                  <h4>Result</h4>
                </div>
                <div className="card-body">
                  <h4>
                    Score: {scores.reduce((acc, curr) => acc + curr, 0)} /{" "}
                    {Questions.length}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionUi;
