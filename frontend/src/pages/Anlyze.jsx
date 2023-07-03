import Footer from "../components/Footer"; // Mengimpor komponen Footer
import LoginNavbar from "../components/LoginNavbar"; // Mengimpor komponen LoginNavbar
import styled from "styled-components"; // Mengimpor modul styled-components
import { Link, useParams } from "react-router-dom"; // Mengimpor modul Link dan useParams dari react-router-dom
import axios from "axios"; // Mengimpor modul axios untuk melakukan permintaan HTTP
import { useEffect, useState } from "react"; // Mengimpor modul useEffect dan useState dari React
import "./Anlyze.css"

const Container = styled.div`
  height: 100vh;
  margin: 4% 7%;
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12 8px;
  text-align: center;
  background-color: #ffba08;
  color: #eeeeee;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Header = styled.h1`
  text-align: center;
  padding-bottom: 10px;
  colot: #222831;
  margin-left: 270px
`;

const Button = styled.button`
  background-color: green;
  color: #eeeeee;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
`;

const Anlyze = (CUId) => {
  const [examInfo, setExamInfo] = useState([]); // Membuat state examInfo dengan nilai awal array kosong
  const [start, setStart] = useState(true); // Membuat state start dengan nilai awal true

  const params = useParams(); // Mendapatkan parameter dari URL menggunakan useParams
  const id = params;

  useEffect(() => {
    getExamInfos();
  }, []); // Menggunakan useEffect untuk memanggil getExamInfos saat komponen dimuat

  const getExamInfos = async () => {
    const { data } = await axios.get(
      `https://edumar-api.vercel.app/userexams/exam/${id.id}`
    ); // Melakukan permintaan GET ke endpoint API
    setExamInfo(data); // Mengupdate state examInfo dengan data hasil permintaan
    setStart(false); // Mengupdate state start menjadi false
  };

  if (start) {
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
      </>
    );
  }

  return (
    <>
      <LoginNavbar />
      <Container>
        <Header>Exam analysis</Header>
        <Table>
          <Tr>
            <Th>User Name</Th>
            <Th>Exam</Th>
            <Th>Score</Th>
            <Th>Review</Th>
          </Tr>
          {examInfo.map((exam) => (
            <Tr key={exam._id}>
              <Td>{exam.userInfo.username}</Td>
              <Td>{exam.userInfo.examname}</Td>
              <Td>{exam.grade}</Td>
              <Td>
                <Link to={`/examreview/${id.id}`}>
                  <Button>Click me</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Table>
        <Link to="/dashboard"><button style={{ backgroundColor: "red", marginLeft: "500px" }} className="btn text-white">Go to dashboard</button></Link>
      </Container>
      <Footer />
    </>
  );
};

export default Anlyze;
