import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import LoginNavbar from "../components/LoginNavbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 91vh;
  border-collapse: collapse;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: #eeeeee;
`;
const Wrapper = styled.div`
  width: 70%;
  height:100%;
  margin-left: 220px;
  justify-content: center;
  background-color: white;
`;
const Form = styled.form`
  height: 92%;
  margin: 0% 10%;
  display: flex;
  flex-wrap: wrap;
  background-color: #eeeeee;
`;
const Input = styled.input`
  min-width: 500px;
  margin: 20px 10px 0px 30px;
  padding: 5px;
  border: none;
  border-radius: 3px;
`;
const Label = styled.label`
  font-size: 20px;
  padding: 10px;
`;
const Section = styled.div`
  margin: 10px 20px;
`;
const Button = styled.button`
  font-size: 16px;
  font-weight: 400;
  border: none;
  border-radius: 3px;
  background-color: #0275d8;
  color: white;
  margin: 10px 20px;
  padding: 10px 30px;
  cursor: pointer;
  position: relative;
`;

const Configure = () => {
  const [myStartDatas, setMyStartDatas] = useState([]); // Membuat state myStartDatas dengan nilai awal array kosong
  const [examName, setExamName] = useState(""); // Membuat state examName dengan nilai awal string kosong
  const [examGrade, setExamGrade] = useState(0); // Membuat state examGrade dengan nilai awal 0
  const [examTime, setExamTime] = useState(0); // Membuat state examTime dengan nilai awal 0
  const [isLoading, setIsLoading] = useState(true); // Membuat state isLoading dengan nilai awal true

  const navigate = useNavigate();

  const params = useParams();
  const id = params;

  useEffect(() => {
    getConfigureData();
  }, []);

  // Mengambil data konfigurasi ujian
  const getConfigureData = async () => {
    await axios
      .get(`http://edumar-api.vercel.app/exam/exam/` + id.id)
      .then((response) => {
        console.log(response.status);
        setMyStartDatas(response.data);
        setIsLoading(false);
      });
  };

  // Menghandle konfigurasi ujian yang diubah
  const handleConfigure = (e) => {
    e.preventDefault();
    const exam = {
      examname: examName,
      time: examTime,
      passGrade: examGrade,
    };
    axios
      .patch(`http://edumar-api.vercel.app/exam/${id.id}`, exam)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        navigate("/dashboard");
      });
  };

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
        ></div>{" "}
        // Menampilkan tampilan loading saat isLoading bernilai true
        <Footer />
      </>
    );
  }

  return (
    <>
      <LoginNavbar />
      <Container>
        <Wrapper>
        <div>&nbsp;</div>
          <Form onSubmit={handleConfigure}>
            <Section>
              <Label htmlFor="quizName">Quiz Name</Label>
              <Input
                type="text"
                name="quizName"
                placeholder={`${myStartDatas[0].examname}`}
                onChange={(e) => setExamName(e.target.value)}
              />
            </Section>
            <Section>
              <Label htmlFor="time">Time Limit</Label>
              <Input
                type="number"
                name="time"
                placeholder={`${myStartDatas[0].time}`}
                onChange={(e) => setExamTime(e.target.value)}
              />
            </Section>
            <Section>
              <Label htmlFor="grade">Pass Grade</Label>
              <Input
                type="text"
                name="grade"
                placeholder={`${myStartDatas[0].passGrade}`}
                onChange={(e) => setExamGrade(e.target.value)}
              />
            </Section>
            <Section>
              <Button
                type="submit"
                
                style={{ margin: "0px 0px 20px 260px" }}
              >
                Save
              </Button>
              {/* <Button
                type="submit"
                
                style={{ margin: "0px 4500px 20px 20px" }}
              >
                Save
              </Button> */}
              
            </Section>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Configure;
