import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [latex, setLatex] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setLatex("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/convert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLatex(res.data.latex || "No LaTeX output received.");
    } catch (err) {
      console.error(err);
      setLatex("Error converting image. Check console or backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-white">Image to LaTeX</h1>

      <div className="bg-[#2D2D2D] rounded-2xl shadow-xl p-8 w-[90%] max-w-xl text-center">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 mb-6 cursor-pointer transition ${
            isDragActive
              ? "border-blue-400 bg-[#222]"
              : "border-gray-500 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-gray-300">{file.name}</p>
          ) : (
            <p className="text-gray-400">
              Drag & Drop, Paste (Ctrl+V) Image Here
              <br />
              or
              <br />
              <span className="text-blue-400 underline">Browse Files</span>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => document.querySelector("input[type=file]").click()}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            Browse files
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-4 py-2 rounded-lg ${
              loading || !file
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>

        {/* Output */}
        <div className="text-left mt-8">
          <h2 className="font-semibold mb-2">LaTeX Output:</h2>
          <textarea
            readOnly
            value={latex || "Your LaTeX result will appear here..."}
            className="w-full h-32 bg-[#1E1E1E] border border-gray-600 rounded-lg p-2 text-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
