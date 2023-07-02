import Home from "./pages/Home";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import Configure from "./pages/Configure";
import {useSelector} from "react-redux";
import QuizController from "./pages/QuizController";
import Result from "./components/quizHandler/Result";
import Anlyze from "./pages/Anlyze";
import Reports from "./pages/Reports";
import ExamReview from "./pages/ExamReview";
import About from "./pages/About";


function App() {
    var currentUserUid; // Variabel untuk menyimpan ID pengguna saat ini

    const userId = useSelector((state) => state.user.currentUser); // Mendapatkan ID pengguna dari state Redux menggunakan useSelector
    if (userId == null) {
        console.log("no auth"); // Mencetak pesan jika tidak ada pengguna yang terautentikasi
    } else {
        currentUserUid = userId.user; // Mengisi currentUserUid dengan ID pengguna jika ada
    }

    // Komponen RequireAuth untuk memerlukan otentikasi pengguna
    const RequireAuth = ({children}) => {
        return currentUserUid._id ? (children) : <Navigate to="/login"/>;
    };


    return (
        <div>
            <Routes>
                {/* Definisi rute-rute aplikasi */}
                <Route path="/" element={<App/>}></Route>
                <Route index element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register role={2} />}/>
                <Route path="/register/admin" element={<Register role={1}/>}/>
                <Route path="/about" element={<About/>}/>

                {/* Rute yang memerlukan otentikasi pengguna */}
                <Route
                    path="/dashboard"
                    element={<RequireAuth><Dashboard CUId={currentUserUid}/></RequireAuth>}
                />
                <Route
                    path="/examreview/:id"
                    element={<RequireAuth><ExamReview/></RequireAuth>}
                />
                <Route
                    path="/create/:id"
                    element={<RequireAuth><CreateQuiz/></RequireAuth>}
                />
                <Route
                    path="/configure/:id"
                    element={<RequireAuth><Configure/></RequireAuth>}
                />
                <Route
                    path="/reports"
                    element={<RequireAuth><Reports CUId={currentUserUid}/></RequireAuth>}
                />
                <Route
                    path="/anlyze/:id"
                    element={<RequireAuth><Anlyze CUId={currentUserUid}/></RequireAuth>}
                />
                <Route
                    path="/quiz/:id"
                    element={<RequireAuth><QuizController CUId={currentUserUid}/></RequireAuth>}
                />
                <Route
                    path="/result/:id"
                    element={<RequireAuth><Result CUId={currentUserUid}/></RequireAuth>}
                />


            </Routes>
        </div>
    );
}


export default App;
