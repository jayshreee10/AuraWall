import Menubar from "./Components/Menubar";
import Photos from "./Sections/Photos";
import Videos from "./Sections/Videos";
function App() {
  return (
    <div className="flex bg-slate-100">
      <Menubar />
      {/* <Photos /> */}
      <Videos />
    </div>
  );
}

export default App;
