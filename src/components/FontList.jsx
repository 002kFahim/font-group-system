import { useFontContext } from "../context/useFontContext";

const FontList = () => {
  const { fonts, deleteFont } = useFontContext();

  if (fonts.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Fonts</h2>
        <p className="text-gray-500">No fonts uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Our Fonts</h2>
      <p className="text-sm text-gray-500 mb-4">
        Browse a list of Zepto fonts to build your font group.
      </p>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Font Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fonts.map((font) => (
              <tr key={font.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {font.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <style>
                    {`
                      @font-face {
                        font-family: "${font.id}";
                        src: url(${font.url}) format("truetype");
                      }
                    `}
                  </style>
                  <div
                    className="text-sm text-gray-900"
                    style={{ fontFamily: font.id }}
                  >
                    Example Style
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deleteFont(font.id)}
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
    </div>
  );
};

export default FontList;
