import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Coverage from "@/pages/Coverage";
import About from "@/pages/About";
import News from "@/pages/News";
import Support from "@/pages/Support";
import Quote from "@/pages/Quote";
import Careers from "@/pages/Careers";
import Faq from "@/pages/Faq";
import Admin from "@/pages/Admin";
import AuthCallback from "@/pages/AuthCallback";

function AppRouter() {
  const location = useLocation();
  // OAuth return: process session_id FIRST, before any route/auth checks (hash is reactive via useLocation).
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/coverage" element={<Coverage />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/support" element={<Support />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
