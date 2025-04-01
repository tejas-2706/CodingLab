import axios from "axios";
import { useEffect, useState } from "react"

export const CodingIo = () => {
    const [iotoken, setIotoken] = useState("");
    const session = async () => {
        const response = await axios.post("http://localhost:3000/coding-io-token")
        console.log(response.data.jwtToken);
        setIotoken(response.data.jwtToken);
    }
    useEffect(() => {
        session()
    }, [])
    return <div>
        <iframe
            width="1280"
            height="720"
            src={`https://edudiagno.fermion.app/embed/io-coding-lab?token=${iotoken}`}
            title="Coding Lab"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
	picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
        </iframe>
    </div>
}






