import { useState } from "react";
import { useFontContext } from "../context/useFontContext";

const FontGroupList = () => {
  const { fontGroups, deleteFontGroup, updateFontGroup, fonts } =
    useFontContext();
  const [editingGroup, setEditingGroup] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFonts, setEditFonts] = useState([]);
  const [editFontNames, setEditFontNames] = useState({});

  const handleEdit = (group) => {
    setEditingGroup(group);
    setEditName(group.name);
    setEditFonts(group.fonts);
    setEditFontNames(group.fontNames || {});
  };

  const handleSave = () => {
    if (editName.trim() && editFonts.length >= 2) {
      const updatedGroup = {
        name: editName,
        fonts: editFonts,
        fontNames: editFontNames,
        count: editFonts.length,
      };

      updateFontGroup(editingGroup.name, updatedGroup);
      setEditingGroup(null);
    }
  };

  const handleCancel = () => {
    setEditingGroup(null);
  };

  const handleFontToggle = (fontName) => {
    if (editFonts.includes(fontName)) {
      setEditFonts(editFonts.filter((f) => f !== fontName));
    } else {
      setEditFonts([...editFonts, fontName]);
    }
  };

  const getFontDisplayName = (fontId, group) => {
    if (group.fontNames && group.fontNames[fontId]) {
      return group.fontNames[fontId];
    }
    return fontId;
  };

  if (fontGroups.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Font Groups</h2>
        <p className="text-gray-500">No font groups created yet.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Our Font Groups</h2>
      <p className="text-sm text-gray-500 mb-4">
        List of all available font groups
      </p>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fonts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fontGroups.map((group) => (
              <tr key={group.name}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {group.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {group.fonts
                      .map((fontId) => getFontDisplayName(fontId, group))
                      .join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{group.count}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(group)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFontGroup(group.name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">Edit Font Group</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Fonts (at least 2)
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
                {fonts.map((font) => (
                  <div key={font.name} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`font-${font.name}`}
                      checked={editFonts.includes(font.name)}
                      onChange={() => handleFontToggle(font.name)}
                      className="mr-2"
                    />
                    <label htmlFor={`font-${font.name}`}>{font.name}</label>
                    {editFonts.includes(font.name) && (
                      <input
                        type="text"
                        placeholder="Custom name (optional)"
                        value={editFontNames[font.name] || ""}
                        onChange={(e) => {
                          const newNames = { ...editFontNames };
                          newNames[font.name] = e.target.value;
                          setEditFontNames(newNames);
                        }}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
              {editFonts.length < 2 && (
                <p className="text-red-500 text-sm mt-1">
                  Please select at least 2 fonts
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={editFonts.length < 2 || !editName.trim()}
                className={`px-4 py-2 rounded-md ${
                  editFonts.length < 2 || !editName.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontGroupList;
