import { useNavigate } from "react-router-dom";
import InstructionPanel from "./InstructionPanel"

export const PreExam = () => {
  const navigate = useNavigate();
    return <div className="grid grid-cols-2">
        <div>
            Instructions
        </div>
        <div>
        <InstructionPanel onNext={()=>{navigate("/coding-exam")}}/>
        </div>
    </div>
}


