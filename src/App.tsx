import { Routes, Route } from "react-router";
import { SmoothScrollProvider } from '@/hooks/useLenis';
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import LoginPage from "@/pages/Login";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SmoothScrollProvider><Layout /></SmoothScrollProvider>}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
