import { useState, useRef } from "react";
import { useFontContext } from "../context/useFontContext";

const FontUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const { fonts, addFont } = useFontContext();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    processFiles(files);
  };

  const processFiles = (files) => {
    setError("");

    if (files.length === 0) return;

    const file = files[0];

    // Check if file is a TTF file
    if (!file.name.toLowerCase().endsWith(".ttf")) {
      setError("Only TTF files are allowed");
      return;
    }

    // Create a unique ID for this font
    const fontId = `font-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 11)}`;
    const fontUrl = URL.createObjectURL(file);

    // Use the unique ID for the font face
    const fontFace = new FontFace(fontId, `url(${fontUrl})`);

    fontFace
      .load()
      .then((loadedFace) => {
        // Extract font name from the loaded font or use file name if not available
        let fontName = loadedFace.family;

        // If the font name is generic or matches our temp ID pattern, use the file name instead
        if (
          fontName === "serif" ||
          fontName === "sans-serif" ||
          fontName.startsWith("font-")
        ) {
          fontName = file.name.replace(".ttf", "");
        }

        // Check if a font with the same name already exists
        const fontExists = fonts.some(
          (existingFont) =>
            existingFont.name.toLowerCase() === fontName.toLowerCase()
        );

        if (fontExists) {
          // Clean up resources
          URL.revokeObjectURL(fontUrl);
          setError(`A font named "${fontName}" already exists`);
          return;
        }

        // Add the font to the document so it can be used
        document.fonts.add(loadedFace);

        // Add font to context with the unique ID
        addFont({
          id: fontId,
          name: fontName,
          url: fontUrl,
          file: file,
        });

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      })
      .catch((err) => {
        // Clean up resources on error
        URL.revokeObjectURL(fontUrl);
        setError("Error loading font: " + err.message);
      });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload Font</h2>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">Only TTF File Allowed</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".ttf"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FontUploader;
