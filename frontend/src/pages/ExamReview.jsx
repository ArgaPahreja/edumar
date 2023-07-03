import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import LoginNavbar from "../components/LoginNavbar";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Container = styled.table`
  width: 100%;
  height: 300px;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: #eeeeee;
`;
const Wrapper = styled.div`
  width: 86%;
  margin: 7%;
  max-width: 1300px;
`;
const Check = styled.input`
  transform: scale(1.5);
  margin: 20px;
  color: ;
`;
const Label = styled.label`
  color: ;
  maxwidth: 1400px;
`;


const ExamReview = () => {
  // State untuk menyimpan pertanyaan ujian dan loading status
  const [examQuestions, setExamQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil parameter dari URL
  const params = useParams();
  const id = params;

  useEffect(() => {
    // Mengambil informasi ujian saat komponen dipasang
    getExamInfos();
    console.log("check");
  }, []);

  // Fungsi untuk mengambil informasi ujian dari server
  const getExamInfos = async () => {
    const { data } = await axios.get(
      `http://edumar-api.vercel.app/userexams/exam/${id.id}`
    );
    console.log(data);
    console.log(data[0].examReview[0].qAnswers);
    setExamQuestions(data);
    setIsLoading(false);
  };

  // Jika masih loading, tampilkan animasi loading
  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <div
          style={{
            verticalAlign: "middle",
            display: "flex",
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            WebkitAnimation: "spin 2s linear infinite",
          }}
        ></div>

      </>
    );
  }

  // Jika sudah selesai loading, tampilkan hasil ujian
  return (
    <>
      <LoginNavbar />
      <Container>
        <Wrapper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableHead>
                <TableRow style={{ border: 'none' }}>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                </TableHead>
              {examQuestions?.map((exam, index) => (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={exam._id}
                  >
                    <TableCell
                      component="th"
                      scope="exam"
                      style={{
                        color: "#222831",
                        fontSize: "16px",
                        fontWeight: "600",
                        padding: "25px",
                      }}
                    >
                      {exam.examReview.map((examR, indexi) => (
                        <>
                          {/* Menampilkan informasi detail pertanyaan */}
                          <Label>
                            <span style={{ color: "#4285F4" }}>
                              {"Question Title )  "}
                            </span>
                            {examR.qTitle}
                          </Label>
                          <br />
                          {/* <Check type="radio" name={`${indexi + 1}`} /> */}
                          <Label>
                            <span style={{ color: "#FF8800" }}>
                              {"User Answer ) "}
                            </span>{" "}
                            {examR.qAnswers}
                          </Label>
                          <br />
                          {/* <Check type="radio" name={`${indexi + 1}`} /> */}
                          <Label>
                            <span style={{ color: "#007E33" }}>
                              {"Correct Answer ) "}
                            </span>
                            {examR.qCorrect}
                          </Label>
                          <br />
                          <br />
                        </>
                      ))}
                    </TableCell>
                    <br />
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
            <Link to="/dashboard"><button style={{ backgroundColor: "red", marginLeft: "900px", padding: "10px", }} className="btn text-white">Back to dashboard</button></Link>
            <div>&nbsp;</div>
          </TableContainer>
          
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default ExamReview;
