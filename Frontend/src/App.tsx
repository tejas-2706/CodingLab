import {Route, Routes } from "react-router-dom"
import { QuizComponent } from "./components/CodingLabComponents/QuizComponent"
import { HomePage } from "./components/HomePageComponents/HomePage"
import { PreExam } from "./components/InstructionPanelComponents/PreExam";
import { UserIpAdd } from "./components/UserIpAdd";
// import DsaExecution from "./components/DsaExecution";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/instruction-panel" element={<PreExam/>}></Route>
        <Route path="/coding-exam" element={<QuizComponent/>}></Route>
        <Route path="/ip" element={<UserIpAdd/>}></Route>
        {/* <Route path="/dsa" element={<DsaExecution/>}></Route> */}
      </Routes>
    </div>
  )
}

export default App