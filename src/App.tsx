import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/home";
import AuthLayout from "./layouts/auth";
import LoginPage from "./pages/auth/login";
import LoadingPage from "./components/loadingPage";
import { useEffect, useState } from "react";
import { setBasicConfig } from "./services/config";
import DashboardPage from "./pages";
import UsersPage from "./pages/users";
import LeadsPage from "./pages/leads";

function App() {
  const [busy, setbusy] = useState(true);

  useEffect(() => {
    setBasicConfig().then(() => {
      setbusy(false);
    });
  }, []);

  if (busy) return <LoadingPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
