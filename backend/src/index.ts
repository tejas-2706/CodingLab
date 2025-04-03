import express, { Request, Response, Express } from 'express';
import jwt from "jsonwebtoken"
import cors from "cors"
const app: Express = express();
import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();
app.use(cors())
app.use(express.json())
app.get('/',(req,res) => {
    res.json({
        message :"hello"
    })
})


app.get('/generate-token', (req, res) => {
    const jwtToken = jwt.sign(
        {
            labId: "67b43955f8dd885350eaab89",
            userId: "123",
            playgroundOptions: {
                isCodeCopyPasteAllowed: true,
                shouldHideLogo: true,
                overrideDefaultFilesystemForLab: {
                    isEnabled: false
                }
            }
        },
        process.env.FERMION_API_KEY as string,
        { expiresIn: "1h" }
    );
    console.log("JWTTTTT \n" + jwtToken);
    res.json({jwtToken});
});



app.post('/live-session-token', (req,res)=>{
    const jwtToken = jwt.sign(
        {
          liveEventSessionId: "67b57a08db93277aec0e4a9a",
          userId: "<enter a user ID here unique to every user>"
        },
        process.env.FERMION_API_KEY as string,
        { expiresIn: "1h" }
    );
    res.json({jwtToken})
})

// Qutane

const questions = [
  { id: '1', labId: '67b5809921b8ad7af5c7c718', timeLimit: 10 }, // 5 minutes
  { id: '2', labId: '67b45bbcd5395263fe8ebe11', timeLimit: 20 }, // 10 minutes
  { id: '3', labId: '67b5809921b8ad7af5c7c718', timeLimit: 20 }, // 10 minutes
  { id: '4', labId: '67bd6053e81fd12957cf5225', timeLimit: 200 }, // 10 minutes
  { id: '5', labId: '67ece62678376a434e78fd98', timeLimit: 100 }, // 10 minutes
];

app.get('/questions', (req, res) => {
  res.json(questions);
});




// for one labid 
app.post('/coding-io-token', (req, res) => {
    try {
      const jwtToken = jwt.sign(
        {
          labId: '67b45bbcd5395263fe8ebe11',
          userId: '<enter a user ID here unique to every user>',
        },
        process.env.FERMION_API_KEY as string,
        { expiresIn: '1h' }
      );
      res.json({ jwtToken });
    } catch (error) {
      console.error("Error creating token:", error);
      res.status(500).json({ error: "Failed to create token" });
    }
  });


// for multiplelabid there jwt token io lab multiple
interface TokenRequestBody {
  labId: string;
  userId: string;
}

// Use any types as a last resort
app.post('/generate-embed-token', (req: any, res: any) => {
  const { labId, userId } = req.body as TokenRequestBody;
  if (!labId || !userId) {
    return res.status(400).json({ error: 'labId and userId are required' });
  }
  try {
    const jwtToken = jwt.sign(
      { labId, userId },
      process.env.FERMION_API_KEY as string,
      { expiresIn: '1h' }
    );
    res.json({ jwtToken });
  } catch (error) {
    console.error('Error creating token:', error);
    res.status(500).json({ error: 'Failed to create token' });
  }
});



app.post('/lab-results', async (req: any, res: any) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const results = await Promise.all(
      questions.map(async (question) => {
        const response = await axios.post(
          'https://backend.codedamn.com/api/public/get-user-io-lab-result',
          {
            data: [{ data: { userId, labId: question.labId } }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'FERMION-API-KEY': process.env.FERMION_API_KEY as string,
            },
          }
        );

        const output = response.data[0]?.output;
        if (!output || output.status !== 'ok') {
          console.error('Invalid API response for labId:', question.labId, response.data);
          throw new Error(`API returned invalid status: ${output?.status || 'unknown'}`);
        }

        const resultData = output.data?.result;
        if (!resultData) {
          console.error('No result data in API response for labId:', question.labId, output);
          throw new Error('No result data returned from API');
        }

        return {
          labId: question.labId,
          questionId: question.id, // Added to distinguish questions with same labId
          isLabAttempted: resultData.isLabAttempted ?? false,
          isRunComplete: resultData.isRunComplete ?? false,
          testCases: Array.isArray(resultData.resultArray)
            ? resultData.resultArray.map((testCase: any) => ({
                testCaseId: testCase.testCaseId ?? 'unknown',
                status: testCase.status ?? 'unknown',
              }))
            : [],
        };
      })
    );

    res.json({ results });
  } catch (error:any) {
    console.error('Error fetching lab results:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to fetch lab results', details: error.message });
  }
});

app.listen(3000, ()=>{
    console.log("http://localhost:3000");
})