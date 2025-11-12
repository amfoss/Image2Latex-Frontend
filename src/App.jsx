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
<<<<<<< HEAD
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-white">Image to LaTeX</h1>

      <div className="bg-[#2D2D2D] rounded-2xl shadow-xl p-8 w-[90%] max-w-xl text-center">
=======
    <div className="relative min-h-screen bg-[#141414] flex flex-col items-center justify-center text-gray-100 overflow-hidden">
      {/* Geometric background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <h1 className="text-3xl font-bold mb-6 text-white z-10">Image to LaTeX</h1>

      <div className="bg-[#1F1F1F] rounded-2xl shadow-2xl p-8 w-[90%] max-w-xl text-center z-10 border border-[#2C2C2C] backdrop-blur-sm">
>>>>>>> 22cdbb1 (Commiting the updated frontend design)
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 mb-6 cursor-pointer transition ${
            isDragActive
<<<<<<< HEAD
              ? "border-blue-400 bg-[#222]"
              : "border-gray-500 hover:border-gray-400"
=======
              ? "border-gray-400 bg-[#222]"
              : "border-gray-600 hover:border-gray-500 bg-[#1B1B1B]"
>>>>>>> 22cdbb1 (Commiting the updated frontend design)
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
<<<<<<< HEAD
              <span className="text-blue-400 underline">Browse Files</span>
=======
              <span className="text-gray-300 underline">Browse Files</span>
>>>>>>> 22cdbb1 (Commiting the updated frontend design)
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => document.querySelector("input[type=file]").click()}
<<<<<<< HEAD
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
=======
            className="bg-[#2E2E2E] hover:bg-[#3A3A3A] px-5 py-2 rounded-lg border border-[#3C3C3C]"
>>>>>>> 22cdbb1 (Commiting the updated frontend design)
          >
            Browse files
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
<<<<<<< HEAD
            className={`px-4 py-2 rounded-lg ${
              loading || !file
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
=======
            className={`px-5 py-2 rounded-lg border ${
              loading || !file
                ? "bg-[#333] border-[#333] cursor-not-allowed"
                : "bg-[#4A4A4A] hover:bg-[#5A5A5A] border-[#444]"
>>>>>>> 22cdbb1 (Commiting the updated frontend design)
            }`}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>

        {/* Output */}
        <div className="text-left mt-8">
          <h2 className="font-semibold mb-2">LaTeX Output:</h2>
<<<<<<< HEAD
          <textarea
            readOnly
            value={latex || "Your LaTeX result will appear here..."}
            className="w-full h-32 bg-[#1E1E1E] border border-gray-600 rounded-lg p-2 text-gray-200"
          />
        </div>
      </div>
=======
          <div className="bg-[#161616] border border-gray-600 rounded-xl p-3">
            <textarea
              readOnly
              value={latex || "Your LaTeX result will appear here..."}
              className="w-full h-32 bg-transparent resize-none outline-none text-gray-200"
            />
          </div>
        </div>
      </div>

      <style>{`
        .grid-pattern::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(45deg, #1b1b1b 25%, transparent 25%),
            linear-gradient(-45deg, #1b1b1b 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #1b1b1b 75%),
            linear-gradient(-45deg, transparent 75%, #1b1b1b 75%);
          background-size: 100px 100px;
          background-position: 0 0, 0 50px, 50px -50px, -50px 0;
          z-index: 0;
        }
      `}</style>
>>>>>>> 22cdbb1 (Commiting the updated frontend design)
    </div>
  );
}
