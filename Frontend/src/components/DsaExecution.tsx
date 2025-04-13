import { Editor } from "@monaco-editor/react";
import React from "react";
import QuestionArea from "./QuestionArea";

// type Language = 'C' | 'Python' | 'Java';

function DsaExecution() {
  // const [code, setCode] = React.useState(
  //   '#include <stdio.h>\nvoid main(){\nprintf("h");\n}'
  // );
  const [taskId, setTaskId] = React.useState("");
  const [output, setOutput] = React.useState("");
  const apiKey = import.meta.env.VITE_FERMION_API_KEY;

  React.useEffect(() => console.log(taskId), [taskId]);

  const availableLanguages:string[] = ['C', 'Python', 'Java'];
  const codeTemplates:Record<string, string> = {
    'C': '#include <stdio.h>\nint main(){\n\tprintf("Hello, World!");\n\treturn 0;\n}',
    'Python': 'print("Hello, World!")',
    'Java': 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}',
  };
  const monacoLanguages: Record<string,string>= {
    'C': 'c',
    'Python': 'python',
    'Java': 'java',
  };
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('C');
  const [code, setCode] = React.useState(codeTemplates['C']);
  React.useEffect(() => {
    setCode(codeTemplates[selectedLanguage]);
  }, [selectedLanguage]);
  const handleCodeRun = () => {
    fetch(
      "https://backend.codedamn.com/api/public/request-dsa-code-execution",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "FERMION-API-KEY": apiKey,
        },
        body: JSON.stringify({
          data: [
            {
              data: {
                language: selectedLanguage,
                runConfig: {
                  customMatcherToUseForExpectedOutput: "ExactMatch",
                  expectedOutputAsBase64UrlEncoded: btoa("h")
                    .replace(/\+/g, "-")
                    .replace(/\//g, "_")
                    .replace(/=+$/, ""),
                  stdinStringAsBase64UrlEncoded: "",
                  // callbackUrlOnExecutionCompletion: "",
                  shouldEnablePerProcessAndThreadCpuTimeLimit: false,
                  shouldEnablePerProcessAndThreadMemoryLimit: false,
                  shouldAllowInternetAccess: false,
                  compilerFlagString: "",
                  maxFileSizeInKilobytesFilesCreatedOrModified: 1024,
                  stackSizeLimitInKilobytes: 65536,
                  cpuTimeLimitInMilliseconds: 2000,
                  wallTimeLimitInMilliseconds: 5000,
                  memoryLimitInKilobyte: 131072,
                  maxProcessesAndOrThreads: 60,
                },
                sourceCodeAsBase64UrlEncoded: btoa(code)
                  .replace(/\+/g, "-")
                  .replace(/\//g, "_")
                  .replace(/=+$/, ""),
              },
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((body) => setTaskId(body[0].output.data.taskId));
  };

  const handleViewStatus = () => {
    fetch(
      "https://backend.codedamn.com/api/public/get-dsa-code-execution-result",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "FERMION-API-KEY": apiKey,
        },
        body: JSON.stringify({
          data: [
            {
              data: {
                taskUniqueId: taskId,
              },
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((body) => {
        let data = body[0].output.data.runResult;
        console.log(data);
        let err = data.programRunData.stderrBase64UrlEncoded
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        console.log(atob(err));
        let output = data.programRunData.stdoutBase64UrlEncoded
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        console.log("o/p - ", atob(output));
        setOutput(atob(output))
      });
  };

  return (
    <div className="bg-[#18181b]">
      <div className="flex justify-center gap-6 p-2">
        <button className="bg-green-400 px-4 rounded-xl" onClick={handleCodeRun}>Run</button>
        <button className="bg-white px-4 text-black rounded-xl" onClick={handleViewStatus}>View Status</button>
        <div className="">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-700 text-white rounded"
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div>
          <QuestionArea />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gap: "1rem",
            }}
          >
          </div>
          {/* <textarea
        className="bg-gray-300"
        style={{ width: "100%", height: "360px" }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea> */}
          <Editor
            height="360px"
            width="100%"
            language={monacoLanguages[selectedLanguage] || 'plaintext'}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
          <div className="p-4 bg-[#27272a] mt-4 rounded-xl text-white">
            <h1>Output - </h1>
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DsaExecution;