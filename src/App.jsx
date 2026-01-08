import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import logo from "./Assets/logo_white.svg";

export default function App() {
  const [file, setFile] = useState(null);
  const [latex, setLatex] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image")) {
          const pastedFile = item.getAsFile();
          setFile(pastedFile);
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
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
    formData.append("image", file);
    try {
      const res = await axios.post(
        "https://latex-api.amfoss.in/api/convert",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLatex(res.data.latex || "No LaTeX output received.");
    } catch (err) {
      console.error(err);
      setLatex("Error converting image. Check console or backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#141414] flex flex-col items-center text-gray-100 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <header>
        <a href="https://amfoss.in/">
          <img
            src={logo}
            alt="amFOSS logo"
            className="fixed top-6 left-6 z-20"
            width={170}
          />
        </a>
      </header>

      <h1 className="text-3xl font-bold mb-6 text-white z-10 mt-20">Image to LaTeX</h1>

      <div className="flex flex-1 items-center justify-center w-full">
        <div className="bg-[#1F1F1F] rounded-2xl shadow-2xl p-8 w-[90%] max-w-xl text-center z-10 border border-[#2C2C2C] backdrop-blur-sm">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 mb-6 cursor-pointer transition ${
              isDragActive
                ? "border-gray-400 bg-[#222]"
                : "border-gray-600 hover:border-gray-500 bg-[#1B1B1B]"
            }`}
          >
            <input {...getInputProps()} ref={inputRef} />
            {file ? (
              <p className="text-gray-300">{file.name}</p>
            ) : (
              <p className="text-gray-400">
                Drag & Drop, Paste (Ctrl+V) Image Here
                <br />
                or
                <br />
                <span className="text-gray-300 underline">Browse Files</span>
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-[#2E2E2E] hover:bg-[#3A3A3A] px-5 py-2 rounded-lg border border-[#3C3C3C]"
            >
              Browse files
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`px-5 py-2 rounded-lg border ${
                loading || !file
                  ? "bg-[#333] border-[#333] cursor-not-allowed"
                  : "bg-[#4A4A4A] hover:bg-[#5A5A5A] border-[#444]"
              }`}
            >
              {loading ? "Converting..." : "Convert"}
            </button>
          </div>

          <div className="text-left mt-8">
            <h2 className="font-semibold mb-2">LaTeX Output:</h2>
            <div className="bg-[#161616] border border-gray-600 rounded-xl p-3">
              <textarea
                readOnly
                value={latex || "Your LaTeX result will appear here..."}
                className="w-full h-32 bg-transparent resize-none outline-none text-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto mb-4 flex items-center gap-3 text-sm text-gray-400 z-10">
        <span>
          Made with <span className="text-red-500">♥</span> by{" "}
          <a
            href="https://amfoss.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-200"
          >
            amFOSS
          </a>
        </span>
        <span className="text-gray-600">•</span>
        <a
          href="https://github.com/amfoss/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-200"
        >
          GitHub
        </a>
      </footer>

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
    </div>
  );
}
