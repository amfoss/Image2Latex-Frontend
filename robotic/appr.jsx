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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center text-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
        Image ➜ LaTeX Converter
      </h1>

      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center transition duration-300">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`rounded-2xl p-10 mb-6 border-2 border-dashed transition duration-300 ${
            isDragActive
              ? "border-blue-400 bg-white/10 scale-[1.02]"
              : "border-gray-600 hover:border-blue-400 hover:bg-white/5"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-gray-300 font-medium">{file.name}</p>
          ) : (
            <p className="text-gray-400">
              Drag & Drop or <span className="text-blue-400 font-semibold">Browse</span> an image
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={() => document.querySelector("input[type=file]").click()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition font-medium"
          >
            Browse Files
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-5 py-2.5 rounded-xl font-medium transition ${
              loading || !file
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-800/30"
            }`}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>

        {/* Output */}
        <div className="text-left mt-8">
          <h2 className="font-semibold text-gray-300 mb-2">LaTeX Output:</h2>
          <textarea
            readOnly
            value={latex || "Your LaTeX result will appear here..."}
            className="w-full h-40 bg-[#0f172a]/70 border border-gray-700 rounded-xl p-3 text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6"></p>
    </div>
  );
}
