import Menubar from "./Components/Menubar";
import Search from "./Sections/Search";
function App() {
  return (
    <div className="flex bg-slate-100">
      <Menubar />
      <Search />
    </div>
  );
}

export default App;
