"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        message: "hello"
    });
});
app.get('/generate-token', (req, res) => {
    const jwtToken = jsonwebtoken_1.default.sign({
        // labId: "67b43955f8dd885350eaab89",
        labId: "67efaa30dea35ce7db97620c",
        userId: "123",
        playgroundOptions: {
            isCodeCopyPasteAllowed: true,
            shouldHideLogo: true,
            overrideDefaultFilesystemForLab: {
                isEnabled: false
            }
        }
    }, process.env.FERMION_API_KEY, { expiresIn: "1h" });
    // console.log("JWTTTTT \n" + jwtToken);
    res.json({ jwtToken });
});
app.post('/live-session-token', (req, res) => {
    const jwtToken = jsonwebtoken_1.default.sign({
        liveEventSessionId: "67b57a08db93277aec0e4a9a",
        userId: "<enter a user ID here unique to every user>"
    }, process.env.FERMION_API_KEY, { expiresIn: "1h" });
    res.json({ jwtToken });
});
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
        const jwtToken = jsonwebtoken_1.default.sign({
            labId: '67b45bbcd5395263fe8ebe11',
            userId: '<enter a user ID here unique to every user>',
        }, process.env.FERMION_API_KEY, { expiresIn: '1h' });
        res.json({ jwtToken });
    }
    catch (error) {
        console.error("Error creating token:", error);
        res.status(500).json({ error: "Failed to create token" });
    }
});
// Use any types as a last resort
app.post('/generate-embed-token', (req, res) => {
    const { labId, userId } = req.body;
    if (!labId || !userId) {
        return res.status(400).json({ error: 'labId and userId are required' });
    }
    try {
        const jwtToken = jsonwebtoken_1.default.sign({ labId, userId }, process.env.FERMION_API_KEY, { expiresIn: '1h' });
        res.json({ jwtToken });
    }
    catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ error: 'Failed to create token' });
    }
});
app.post('/lab-results', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }
    try {
        const results = yield Promise.all(questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const response = yield axios_1.default.post('https://backend.codedamn.com/api/public/get-user-io-lab-result', {
                data: [{ data: { userId, labId: question.labId } }],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'FERMION-API-KEY': process.env.FERMION_API_KEY,
                },
            });
            const output = (_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.output;
            if (!output || output.status !== 'ok') {
                console.error('Invalid API response for labId:', question.labId, response.data);
                throw new Error(`API returned invalid status: ${(output === null || output === void 0 ? void 0 : output.status) || 'unknown'}`);
            }
            const resultData = (_b = output.data) === null || _b === void 0 ? void 0 : _b.result;
            if (!resultData) {
                console.error('No result data in API response for labId:', question.labId, output);
                throw new Error('No result data returned from API');
            }
            return {
                labId: question.labId,
                questionId: question.id, // Added to distinguish questions with same labId
                isLabAttempted: (_c = resultData.isLabAttempted) !== null && _c !== void 0 ? _c : false,
                isRunComplete: (_d = resultData.isRunComplete) !== null && _d !== void 0 ? _d : false,
                testCases: Array.isArray(resultData.resultArray)
                    ? resultData.resultArray.map((testCase) => {
                        var _a, _b;
                        return ({
                            testCaseId: (_a = testCase.testCaseId) !== null && _a !== void 0 ? _a : 'unknown',
                            status: (_b = testCase.status) !== null && _b !== void 0 ? _b : 'unknown',
                        });
                    })
                    : [],
            };
        })));
        res.json({ results });
    }
    catch (error) {
        console.error('Error fetching lab results:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to fetch lab results', details: error.message });
    }
}));
app.listen(3000, () => {
    console.log("http://localhost:3000");
});
