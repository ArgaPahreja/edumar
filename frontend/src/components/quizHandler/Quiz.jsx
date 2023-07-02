import { useEffect, useState } from "react";
import Question from "./Question";
import LoginNavbar from "../LoginNavbar";

const Quiz = ({
  questions,
  score,
  setScore,
  setQuestions,
  userId,
  exam_id,
  userExam_id,
}) => {
  // State untuk menyimpan opsi jawaban
  const [options, setOptions] = useState();

  // State untuk menyimpan indeks pertanyaan saat ini
  const [currQues, setCurrQues] = useState(0);

  // State untuk menyimpan jawaban yang benar
  const [correct, setCorrect] = useState();

  // Hook useEffect untuk menjalankan fungsi startFunction saat currQues atau questions berubah
  useEffect(() => {
    startFunction();
  }, [currQues, questions]);

  // Fungsi untuk mengatur opsi jawaban dan jawaban yang benar pada setiap pertanyaan
  const startFunction = () => {
    var data;
    var dataOptions;

    // Mengambil opsi jawaban dari pertanyaan yang sedang aktif
    data = questions[currQues].options;
    console.log(data);
    setOptions(data);

    // Mencari jawaban yang benar dari opsi jawaban yang tersedia
    for (let k = 0; k < data.length; k++) {
      dataOptions = data[k].isCorrect;
      if (dataOptions === true) {
        setCorrect(data[k].option);
        console.log(data[k].option);
      }
    }
  };

  console.log(exam_id);

  return (

    
    <div className="quiz">
      {questions ? (
        <>
          <div className="quizInfo">
            <span>Score : {score}</span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={correct}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            userId={userId}
            exam_id={exam_id}
            userExam_id={userExam_id}
          />
        </>
      ) : (
        <div>Sorry we couldn't find any question</div>
      )}
    </div>

  );
};

export default Quiz;
