import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "../components/quizHandler/Quiz";
import { useParams, useNavigate } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";
import Footer from "../components/Footer";
import Countdown from "react-countdown";
import CountDownTimer from "../components/CountDownTimer";

const QuizController = (CUId) => {
  // Mengambil ID pengguna yang sedang login
  const userId = CUId.CUId._id;

  // State untuk menyimpan daftar pertanyaan quiz
  const [questions, setQuestions] = useState([]);

  // State untuk menyimpan skor pengguna
  const [score, setScore] = useState(0);

  // State untuk menentukan status loading
  const [isLoading, setIsLoading] = useState(true);

  // State untuk menyimpan ID ujian dan ID pengguna yang sedang login
  const [exam_id, setExam_id] = useState("");
  const [userExam_id, setUserExam_id] = useState("");

  // State untuk menyimpan data timer
  const [timerData, setTimerData] = useState(0);

  // Hook untuk navigasi halaman
  const navigate = useNavigate();

  // Mengambil parameter dari URL
  const params = useParams();
  const id = params;

  useEffect(() => {
    getExamId();
    getExams();
  }, []);

  // Fungsi untuk mendapatkan ID ujian
  const getExamId = async () => {
    const { data } = await axios.get(
      "edumar-api.vercel.app/exam/exam/" + id.id
    );
    setExam_id(data[0]._id);
  };

  // Fungsi untuk mendapatkan daftar pertanyaan quiz
  const getExams = async () => {
    const { data } = await axios.get(
      "https://edumar-api.vercel.app/examquestions/" + id.id
    );
    setQuestions(data);
    userCheck();
  };

  // Fungsi untuk mendapatkan data keamanan ujian
  const securityData = async () => {
    axios
      .all([
        await axios.get("https://edumar-api.vercel.app/users/" + CUId.CUId._id),
        await axios.get("https://edumar-api.vercel.app/exam/exam/" + id.id),
      ])
      .then(
        axios.spread((data, data2) => {
          console.log(data2);
          if (data2.data[0].creatorUserId === CUId.CUId._id) {
            setTimerData(data2.data[0].time);
            console.log(data2.data[0].time);
          } else {
            console.log(CUId.CUId._id);
            console.log(id.id);
            console.log(data.data[0].firstname + " " + data.data[0].lastname);
            console.log(data2.data[0].examname);

            const dummyData = {
              userId: CUId.CUId._id,
              examId: id.id,
              userInfo: {
                username: data.data[0].firstname + " " + data.data[0].lastname,
                examname: data2.data[0].examname,
                score: 0,
              },
            };
            axios
              .post("https://edumar-api.vercel.app/userexams/", dummyData)
              .then((response) => {
                console.log(response.status);
                console.log("userexamsdata", response.data);
                setUserExam_id(response.data._id);
              });
            setTimerData(data2.data[0].time);
          }
          setTimeout(() => {
            navigate("/result/" + id.id);
          }, data2.data[0].time * 60 + "000");
        })
      );
  };

  // Fungsi untuk memeriksa apakah pengguna sudah pernah mengambil ujian ini sebelumnya
  const userCheck = async () => {
    try {
      const { data } = await axios.get(
        "https://edumar-api.vercel.app/userexams/" + CUId.CUId._id
      );
      const myData = await Promise.all(data.map((d) => d.examId));
      for (let i = 0; i <= myData.length; i++) {
        if (myData[i] === id.id) {
          navigate(`/dashboard`);
          alert("you have already took this exam");
          return;
        }
      }
      securityData();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("you have already took this exam");
    }
  };

  // Objek untuk menyimpan data timer dalam format jam, menit, detik
  const hoursMinSecs = { hours: 0, minutes: timerData, seconds: 0 };

  // Tampilan saat loading masih berlangsung
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

  // Tampilan saat loading selesai
  return (
    <div>
      <LoginNavbar />
      <CountDownTimer hoursMinSecs={hoursMinSecs} />
      <Quiz
        questions={questions}
        score={score}
        setScore={setScore}
        setQuestions={setQuestions}
        userId={userId}
        exam_id={exam_id}
        userExam_id={userExam_id}
      />
    </div>
  );
};

export default QuizController;
