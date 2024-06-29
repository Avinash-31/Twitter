import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import ProtectedRoute from "./pages/ProtectedRoutes";
import PageLoading from "./pages/PageLoading";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore/Explore";
import Feed from "./pages/Feed/Feed";
import Messages from "./pages/Messages/Messages";
import Bookmarks from "./pages/Bookmarks/BookMarks";
import Lists from "./pages/Lists/Lists";
import Profile from "./pages/Profile/Profile";
import More from "./pages/More/More";
import Notifications from "./pages/Notifications/Notifications";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n"
import Languages from "./components/Languages";
import ProtectedRoutesWithoutLoading from "./pages/ProtectedRoutesWithoutLoading";


function App() {
  const[access,setAcess] = useState(true);
  
  return (
    <I18nextProvider i18n={i18n}>
      <div className="app">
        <Router>
          {/* <ProtectedRoutesWithoutLoading>
          </ProtectedRoutesWithoutLoading> */}
          <Routes>
            <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} >
              <Route index element={<Feed />} />
            </Route>
            <Route path="/home" element={
              <ProtectedRoute>
                <Languages />
                <Home />
              </ProtectedRoute>
            }
            >
              <Route path="feed" element={<Feed />} />
              <Route path="explore" element={<Explore />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="messages" element={<Messages />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="lists" element={<Lists />} />
              <Route path="profile" element={<Profile />} />
              <Route path="more" element={<More />} />
            </Route>
            <Route path="/loading" element={<PageLoading />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </I18nextProvider>
  );
}

export default App;
