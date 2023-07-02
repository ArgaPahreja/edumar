// Import beberapa dependencies dan komponen yang dibutuhkan

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoginNavbar from "../LoginNavbar";
import Footer from "../Footer";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SingleQuestion = styled.div`
  width: 60%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 5px solid #ffba08;
  padding: 20px;
  
`;
const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  10px;
  text-color: black;
`;
const SingleOption = styled.button`
  width: 46%;
  height: 50px;
  padding: 15px 20px;
  10px;
  box-shadow: 0 0 10px gray;
  color: black;
`;
const Control = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const Select = styled.div`
  background-color: rgb(7, 207, 0);
  color: black;
  box-shadow: 0 0 1px black;
`;
const Wrong = styled.div`
  background-color: rgb(233, 0, 0);
  color: black;
  box-shadow: 0 0 1px black;
`;

// Komponen Question yang digunakan untuk menampilkan pertanyaan dan mengelola logika kuis
const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  userId,
  exam_id,
  userExam_id,
}) => {
  // deklarasi beberapa state yang dibutuhkan
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalGrade, settotalGrade] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Hook useNavigate untuk mengatur navigasi halaman
  const navigate = useNavigate();

  // Hook useParams untuk mendapatkan parameter dari URL
  const params = useParams();
  const id = params;

  // Hook useEffect untuk melakukan pengambilan data dan inisialisasi
  useEffect(() => {
    handleCreatorUser();
  }, []);

  // Fungsi untuk memeriksa pembuat ujian dan mengatur kata sandi jika bukan pembuat
  const handleCreatorUser = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/exam/exam/" + id.id
    );
    if (data[0].creatorUserId !== userId) {
      localStorage.setItem("startTime", new Date().getTime());
    }
    setPass(data[0].creatorUserId == userId);
    setIsLoading(false);
  };

  // Fungsi untuk menentukan tampilan pilihan jawaban berdasarkan status
  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  // Fungsi untuk memeriksa jawaban yang dipilih oleh pengguna
  const handleCheck = (i) => {
    setTotalQuestions(totalQuestions + 1);
    console.log("totalnya : " + totalQuestions);
    setSelected(i);
    // console.log(i === correct);
    if (i === correct) {
      setScore(score + 1);
    }
    setError(false);
  };

  // Fungsi untuk menangani aksi tombol "Next Question"
  const handleNext = () => {
    if (currQues >= questions.length - 1) {
      navigate(`/result/${id.id}`, { state: { totalQuestions } });
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  // Fungsi untuk mengirimkan hasil ujian ke server
  const handleSubmit = (hasil) => {
    console.log("handel submit nye : " + hasil);
    if (pass === userId) {
      console.log("datas did not saved");
    } else {
      console.log("userId,quest", userId);
      console.log("id.id,quest", id.id);
      console.log("exam_id,quest", exam_id);
      console.log("score,quest", score);
      const userExam = {
        userId: userId,
        examId: exam_id,
        grade: hasil,
      };
      axios
        .patch(`http://localhost:5000/userexams/${userExam_id}`, userExam)
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
        });
    }
  };

  // Fungsi untuk meninjau jawaban pengguna pada pertanyaan yang sudah dijawab
  const handleReview = (i) => {
    if (pass === userId) {
      console.log("datas did not saved");
    } else {
      const userOptions = {
        examReview: {
          qAnswers: i,
          qCorrect: correct,
          qTitle: questions[currQues].questionTitle,
        },
      };
      if (i === correct) {
        settotalGrade(totalGrade + 1);
        console.log("totalnya ya : " + totalGrade);
      }

      console.log("useropt,ques", userOptions);
      console.log("exam_id,ques", exam_id);
      axios
        .put(`http://localhost:5000/userexams/${userExam_id}`, userOptions)
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
        });
    }
  };
  useEffect(() => {
    console.log("hasil total grade" + totalGrade);
    handleSubmit(totalGrade);
  }, [totalGrade]);

  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <div
          style={{
            verticalAlign: "middle",
            display: "flex",
            border: "16px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "16px solid #3498db",
            width: "120px",
            height: "120px",
            WebkitAnimation: "spin 2s linear infinite",
          }}
        ></div>
      </>
    );
  }
  // Tampilan saat data sudah ter-load
  return (
    <Container>
      <h1>Question No {currQues + 1}.</h1>
      <SingleQuestion>
        <h2>{questions[currQues].questionTitle}</h2>
        <Options>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((option) => (
              <SingleOption
                className={`singleOption  ${
                  selected && handleSelect(option.option)
                }`}
                key={option._id}
                creator
                onClick={() => {
                  handleCheck(option.option);
                  handleReview(option.option);
                }}
                disabled={selected}
              >
                {option.option}
              </SingleOption>
            ))}
        </Options>
        <Control>
          <button
            style={{
            verticalAlign: "middle",
            backgroundColor:"#3db2d2",
            textColor:"red",
            variant:"contained",
            color:"primary",
            size:"large",
            width:"200"
            }}
            onClick={handleNext}
          > 
            {currQues >= questions.length - 1 ? (
              <span
                onClick={() => {
                  handleSubmit(totalGrade);
                }}
              >
                Submit
              </span>
            ) : (
              <span>Next Question</span>
            )}
          </button>
        </Control>
      </SingleQuestion>
    </Container>
  );
};

export default Question;