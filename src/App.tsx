import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { TopBar } from "./components/TopBar";
import { BottomNav } from "./components/BottomNav";
import { Home } from "./pages/Home";
import { Log } from "./pages/Log";
import { Pins } from "./pages/Pins";
import { Profile } from "./pages/Profile";
import { PublicProfile } from "./pages/PublicProfile";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pins" element={<Pins />} />
          <Route path="/log" element={<Log />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/u/:username" element={<PublicProfile />} />
        </Routes>
        <BottomNav />
      </div>
    </AuthProvider>
  );
}

export default App;
