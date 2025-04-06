import { useState } from "react";
import { FontContext } from "./useFontContext";

export const FontProvider = ({ children }) => {
  const [fonts, setFonts] = useState([]);
  const [fontGroups, setFontGroups] = useState([]);

  const addFont = (font) => {
    setFonts((prevFonts) => [...prevFonts, font]);
  };

  const deleteFont = (fontId) => {
    // Find the font to get its URL
    const fontToDelete = fonts.find((font) => font.id === fontId);

    if (fontToDelete) {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(fontToDelete.url);

      // Remove the font from the list
      setFonts((prevFonts) => prevFonts.filter((font) => font.id !== fontId));

      // Also update any font groups that contain this font
      setFontGroups((prevGroups) =>
        prevGroups.map((group) => ({
          ...group,
          fonts: group.fonts.filter((fontName) => {
            // Find if this font name matches the deleted font
            const matchingFont = fonts.find((f) => f.id === fontId);
            return matchingFont ? fontName !== matchingFont.name : true;
          }),
        }))
      );
    }
  };

  const addFontGroup = (group) => {
    setFontGroups((prevGroups) => [...prevGroups, group]);
  };

  const deleteFontGroup = (groupName) => {
    setFontGroups((prevGroups) =>
      prevGroups.filter((group) => group.name !== groupName)
    );
  };

  const updateFontGroup = (oldName, newGroup) => {
    setFontGroups((prevGroups) =>
      prevGroups.map((group) => (group.name === oldName ? newGroup : group))
    );
  };

  return (
    <FontContext.Provider
      value={{
        fonts,
        fontGroups,
        addFont,
        deleteFont,
        addFontGroup,
        deleteFontGroup,
        updateFontGroup,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};
