import { FontProvider } from "./context/FontContext";
import FontUploader from "./components/FontUploader";
import FontList from "./components/FontList";
import FontGroupCreator from "./components/FontGroupCreator";
import FontGroupList from "./components/FontGroupList";

function App() {
  return (
    <FontProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Font Group System
          </h1>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <FontUploader />
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <FontList />
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <FontGroupCreator />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <FontGroupList />
          </div>
        </div>
      </div>
    </FontProvider>
  );
}

export default App;
