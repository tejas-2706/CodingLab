import { useEffect } from 'react';
import axios from 'axios';
const CodeExecution = () => {
  const apiKey = "7aqzj3mievef6o0islunum4ia3psrqvcyygqzmevdb1og2r3o5868e8lisopvb2x0jhkjj5w6z6aau52wxgctxpkzw8udrgb734idm3z0928l1x1lcdjkii7uj5e1jpl"; // Replace with your actual API key
  const url = 'https://backend.codedamn.com/api/public/create-interactive-coding-lab';

  useEffect(() => {
    const executeCode = async () => {
      const data = {
        data: [
          {
            data: {
              language: 'Nodejs',
              runConfig: {},
              sourceCodeAsBase64UrlEncoded: 'ZnVuY3Rpb24gc29sdmUoc3RkaW4pIHsKCS8vIHdyaXRlIHlvdXIgY29kZSBoZXJlCn0KCgovLy8gY2FsbCB0byB0aGUgY29kZSBoZXJlCgogICAgcHJvY2Vzcy5zdGRpbm5vdy5yZXN1bWUoKQogICAgcHJvY2Vzcy5zdGRpbm5vdy5zZXRFbmNvZGluZygndXRmLTgnKQoKICAgIGxldCBpbnB1dCA9ICcnCiAgICBwcm9jZXNzLnN0ZGluLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7CiAgICBpbnB1dCArPSBjaHVuawogICAgfSkKCiAgICBwcm9jZXNzLnN0ZGluLm9uKCdlbmQnLCAoKSA9PiB7CiAgICAgIHNvbHZlKGlucHV0KQogICAgfSkKfSkpKAo='
            }
          }
        ]
      };

      try {
        const response = await axios.post(url, data, {
          headers: {
            'content-type': 'application/json',
            'fermion-api-key': apiKey
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    executeCode();
  }, []);

  return (
    <div>
      <h1>Code Execution</h1>
      <p>Executing code...</p>
    </div>
  );
};

export default CodeExecution;
