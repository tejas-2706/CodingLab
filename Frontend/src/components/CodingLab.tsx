// import axios from "axios"
// import { useEffect, useState } from "react"

// export const CodingLab = () => {
//     const [labtoken,setLabtoken] = useState("");
//     const labcreate = async() => {
//         const response = await axios.get("http://localhost:3000/generate-token")
//         setLabtoken(response.data.jwtToken);
//         console.log("JWTTTtttttt"+response.data);
//         // const options = {
//         //     method: 'POST',
//         //     url: 'https://backend.codedamn.com/api/public/create-interactive-coding-lab',
//         //     headers: { 'Content-Type': 'application/json' , 'FERMION-API-KEY': '7aqzj3mievef6o0islunum4ia3psrqvcyygqzmevdb1og2r3o5868e8lisopvb2x0jhkjj5w6z6aau52wxgctxpkzw8udrgb734idm3z0928l1x1lcdjkii7uj5e1jpl'}
//         // };
    
//         // try {
//         //     const { data } = await axios.request(options);
//         //     console.log(data);
//         // } catch (error) {
//         //     console.error(error);
//         // }
//     }
//     useEffect(() => {
//         labcreate()
//     }, [])

//     return <div className="container mx-auto pl-2">
//         <div className="font-bold text-xl ">Your Own Coding Lab</div>
//         <iframe 
//             width="1100"
//             height="600"
//             src={`https://edudiagno.fermion.app/embed/lab?token=${labtoken}`}
//             title="Coding Lab"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
// 	picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen>
//         </iframe>
//     </div>
// }



import axios from "axios";
import { useEffect, useState } from "react";

export const CodingLab = () => {
    const [labtoken, setLabtoken] = useState("");

    const labcreate = async () => {
        try {
            const response = await axios.get("http://localhost:3000/generate-token");
            setLabtoken(response.data.jwtToken);
            // console.log("Token retrieved:", response.data);
        } catch (error:any) {
            console.error("Failed to fetch token:", error.message);
        }
    };

    useEffect(() => {
        labcreate();
    }, []);

    return (
        <div className="container mx-auto pl-2">
            <div className="font-bold text-xl">Your Own Coding Lab</div>
            <iframe 
                width="1250"
                height="700"
                src={`https://edudiagno.fermion.app/embed/lab?token=${labtoken}`}
                title="Coding Lab"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe>
        </div>
    );
};