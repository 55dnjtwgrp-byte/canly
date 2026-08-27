import { Route, Routes } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { BottomNav } from "./components/BottomNav";
import { Home } from "./pages/Home";
import { Log } from "./pages/Log";
import { Pins } from "./pages/Pins";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <div className="app">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pins" element={<Pins />} />
        <Route path="/log" element={<Log />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
