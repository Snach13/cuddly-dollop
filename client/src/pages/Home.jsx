import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const RecordingForm = () => {
  const [level, setLevel] = useState("");
  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [cookies, _] = useCookies(["access_token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/record",
        { level, response1, response2 },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err?.response?.data ?? err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center h-full"
    >
      <label className="my-2">
        Listening Level:
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select Level</option>
          <option value="Level 1">Internal</option>
          <option value="Level 2">Focused</option>
          <option value="Level 3">Global</option>
        </select>
      </label>
      <label className="my-2">
        Question 1: How would you describe your current state of mind?
        <input
          type="text"
          value={response1}
          onChange={(e) => setResponse1(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
      </label>
      <label className="my-2">
        Question 2: What are you currently working on or thinking about?
        <input
          type="text"
          value={response2}
          onChange={(e) => setResponse2(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
      </label>
      <button
        type="submit"
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Record Listening Level
      </button>
    </form>
  );
};

export default RecordingForm;
