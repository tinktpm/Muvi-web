import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import { useContext, useState } from "react";
import Home from "./pages/home";
import Introduction from "./pages/introduction";
import Layout from "./components/layout/layout";
import LoginButton from "./components/test";
import Watching from "./pages/watching";
import AllFilm from "./pages/allFilms";
import Dashboard from "./pages/admin/admin";
import WatchList from "./pages/watchList";
import Profile from "./pages/profile";
import { AuthContext } from "./context/AuthContext";
import History from "./pages/history";

function App() {
  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const { user } = useContext(AuthContext);
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <Layout
              mode={mode}
              toggleColorMode={toggleColorMode}
              showCustomTheme={showCustomTheme}
            >
              <Home />
            </Layout>
          }
        />

        {
          user?.isAdmin && <Route path="/admin" element={<Dashboard />} />
        }
        

        <Route
          path="/all"
          element={
            <Layout
              mode={mode}
              toggleColorMode={toggleColorMode}
              showCustomTheme={showCustomTheme}
            >
              <AllFilm />
            </Layout>
          }
        />

        {
          true && 
          <Route
            path="/history"
            element={
              <Layout
                mode={mode}
                toggleColorMode={toggleColorMode}
                showCustomTheme={showCustomTheme}
              >
                <History />
              </Layout>
            }
          />
        }

       

        {user && (
          <Route
            path="/watchlist"
            element={
              <Layout
                mode={mode}
                toggleColorMode={toggleColorMode}
                showCustomTheme={showCustomTheme}
              >
                <WatchList />
              </Layout>
            }
          />
        )}

        <Route
          path="/:type"
          element={
            <Layout
              mode={mode}
              toggleColorMode={toggleColorMode}
              showCustomTheme={showCustomTheme}
            >
              <AllFilm />
            </Layout>
          }
        />

        <Route
          path="/:type/:id"
          element={
            <Layout
              mode={mode}
              toggleColorMode={toggleColorMode}
              showCustomTheme={showCustomTheme}
            >
              <Watching />
            </Layout>
          }
        />

        <Route
          path="/"
          element={
            <Layout
              mode={mode}
              toggleColorMode={toggleColorMode}
              showCustomTheme={showCustomTheme}
            >
              <Introduction />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
