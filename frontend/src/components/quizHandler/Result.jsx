import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import LoginNavbar from "../LoginNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 91vh;
  text-align: center;
`;

const Result = (CUId) => {
  // State untuk menyimpan skor
  const [score, setScore] = useState(0);

  // State untuk menyimpan nilai kelulusan
  const [passGrade, setPassGrade] = useState(0);

  // State untuk menandakan sedang dalam proses loading
  const [isLoading, setIsLoading] = useState(true);

  // State untuk menyimpan data leaderboard
  const [leaderboard, setLeaderboard] = useState([]);

  // State untuk menyimpan durasi pengerjaan
  const [duration, setDuration] = useState(0);

  // State untuk menyimpan total durasi
  const [totalDuration, setTotalDuration] = useState(0);

  // State untuk menyimpan total pertanyaan
  // const [totalQuestions, setTotalQuestions] = useState(0);

  const params = useParams();
  const id = params;

  // Menggunakan hook useLocation untuk mendapatkan objek location
  const location = useLocation();

  // Mengakses nilai totalQuestions dari objek location.state
  const totalQuestions = location.state.totalQuestions;

  // Fungsi untuk mengonversi detik menjadi format waktu (HH:MM:SS)
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((duration % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (duration % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    getPassGrade();
    getExamNames();
    getUserExams();
    const startTime = localStorage.getItem("startTime");
    if (startTime) {
      const endTime = new Date().getTime();
      const duration = Math.floor((endTime - startTime) / 1000); // Menghitung durasi dalam detik
      setDuration(duration);
      localStorage.removeItem("startTime"); // Menghapus item startTime dari local storage
    }
  }, []);

  // Fungsi untuk mendapatkan data user exams
  const getUserExams = async () => {
    setIsLoading(true); // Set loading state to true before fetching data

    try {
      const { data } = await axios.get(
        `http://localhost:5000/userexams?examId=${id.id}`
      );
      setLeaderboard(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user exams:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  // Fungsi untuk mendapatkan pass grade
  const getPassGrade = async () => {
    setIsLoading(true); // Set loading state to true before fetching data

    try {
      const response = await axios.get(
        `http://localhost:5000/exam/exam/${id.id}`
      );
      setPassGrade(response.data);
      setTotalDuration(response.data[0].time);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching pass grade:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  // Fungsi untuk mendapatkan nama-nama ujian
  const getExamNames = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/userexams/exam/${id.id}?userId=${CUId.CUId._id}`
      );
      const examId = data[0].examId;

      setScore(data);
    } catch (error) {
      console.error("Error fetching exam names:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  // Menghitung jumlah jawaban salah
  const totalIncorrect = Math.floor(totalQuestions - score[0]?.grade);
  console.log("totalquestions", totalQuestions);

  return (
    <>
      <LoginNavbar />
      {isLoading === true ? (
        <div>loading...</div>
      ) : (
        <Container>
          <span>Jawaban Benar : {score[0]?.grade}</span>
          <span>Jawaban Salah : {totalIncorrect}</span>
          <span>
            Durasi Pengerjaan: {formatDuration(duration)} dari 00:
            {totalDuration}:00
          </span>
          {passGrade[0]?.passGrade <= score[0]?.grade ? (
            <>
              <span>congratulations you passed the exam</span>

              <br />
            </>
          ) : (
            <>
              <span>sorry you failed the exam</span>
              <br />
            </>
          )}
          <br />
          <h1>Leaderboard {leaderboard[0]?.userInfo.examname}</h1>
          <br />
          <table
            style={{
              width: "80%",
              border: "2px solid #ddd",
              padding: "8px",
              textAlign: "center",
              borderCollapse: "collapse",
              //make center
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <tr
              style={{
                backgroundColor: "#ffba08",
                color: "white",
                padding: "8px",
              }}
            >
              <th>Ranking</th>
              <th>Username</th>
              <th>Grade</th>
            </tr>
            {leaderboard === []
              ? "loading..."
              : leaderboard.map((user, i) => (
                  //make it on table: no, username, grade
                  <tr
                    style={
                      i % 2 === 0
                        ? {
                            backgroundColor: "#f2f2f2",
                            padding: "8px",
                          }
                        : { padding: "8px" }
                    }
                    key={i++}
                  >
                    <td>{i++ + 1}</td>
                    <td>{user?.userInfo.username}</td>
                    <td>{user.grade}</td>
                  </tr>
                ))}
          </table>
          <Link to="/dashboard">
            <button
              variant="contained"
              color="secondary"
              size="large"
              style={{ alignSelf: "center", marginTop: 20, cursor: "pointer", backgroundColor: "red" }}
            >
              Go to dashboard
            </button>
          </Link>
        </Container>
        
      )}
      <Footer />
    </>
  );
};

export default Result;