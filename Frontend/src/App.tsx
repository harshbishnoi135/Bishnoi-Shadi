import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Provider } from "react-redux";
import store from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ProtectedRoute from "@/components/ProtectedRoute";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProfileRegistration from "@/pages/ProfileRegistration";
import Profile from "@/pages/Profile";
import Discover from "@/pages/Discover";
import Favourites from "@/pages/Favourites";
import ProfileDescription from "@/pages/ProfileDescription";
import Pricing from "@/pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<About />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/pricing" element={<Pricing />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/profile-registration" 
                    element={
                      <ProtectedRoute>
                        <ProfileRegistration />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/discover" 
                    element={
                      <ProtectedRoute>
                        <Discover />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/favourites" 
                    element={
                      <ProtectedRoute>
                        <Favourites />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile-description/:id" 
                    element={
                      <ProtectedRoute>
                        <ProfileDescription />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ChatWidget />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
