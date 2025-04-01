import axios from "axios"
import { useEffect, useState } from "react"

export const LiveSession = () => {
    const [livetoken, setLivetoken] = useState("")
    const session = async () => {
        const response = await axios.post("http://localhost:3000/live-session-token")
        console.log(response.data);
        setLivetoken(response.data.jwtToken);
    }
    useEffect(() => {
        session()
    }, [])
    return <div className="flex ">
        <iframe
            width="1280"
            height="720"
            src={`https://edudiagno.fermion.app/embed/live-session?token=${livetoken}`}
            title="Live event session"
            frameBorder="0"
            allow="allow-same-origin; camera *;microphone *;display-capture *;encrypted-media;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        >
        </iframe>

        <iframe className="w-1/3"
            width="1280"
            height="720"
            src={`https://edudiagno.fermion.app/embed/live-session-chat?token=${livetoken}`}
            title="Live event session chat"
            frameBorder="0"
            allow="allow-same-origin; camera *;microphone *;display-capture *;encrypted-media;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
        </iframe>
    </div>
}