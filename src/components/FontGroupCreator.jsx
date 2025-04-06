import { useState } from "react";
import { useFontContext } from "../context/useFontContext";

const FontGroupCreator = () => {
  const { fonts, addFontGroup } = useFontContext();
  const [groupName, setGroupName] = useState("");
  const [rows, setRows] = useState([{ fontName: "", selectedFont: "" }]);
  const [error, setError] = useState("");

  const handleAddRow = () => {
    setRows([...rows, { fontName: "", selectedFont: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate group name
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }

    // Filter out rows with empty selected fonts
    const validRows = rows.filter((row) => row.selectedFont);

    // Validate at least 2 fonts are selected
    if (validRows.length < 2) {
      setError("You have to select at least two fonts");
      return;
    }

    // Create the font group with font mappings
    const fontGroup = {
      name: groupName,
      fonts: validRows.map((row) => row.selectedFont),
      fontNames: validRows.reduce((acc, row) => {
        // Use the user-provided fontName if available, otherwise use the selectedFont
        acc[row.selectedFont] = row.fontName.trim() || row.selectedFont;
        return acc;
      }, {}),
      count: validRows.length,
    };

    addFontGroup(fontGroup);

    // Reset form
    setGroupName("");
    setRows([{ fontName: "", selectedFont: "" }]);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Create Font Group</h2>
      <p className="text-sm text-gray-500 mb-4">
        You have to select at least two fonts
      </p>

      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Group Title
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter group name"
          />
        </div>

        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Name
              </label>
              <input
                type="text"
                value={row.fontName}
                onChange={(e) =>
                  handleRowChange(index, "fontName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Font name"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select a Font
              </label>
              <select
                value={row.selectedFont}
                onChange={(e) =>
                  handleRowChange(index, "selectedFont", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a Font</option>
                {fonts.map((font) => (
                  <option key={font.name} value={font.name}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className="text-red-600 hover:text-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddRow}
            className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50"
          >
            + Add Row
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FontGroupCreator;
