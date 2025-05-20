
import NavBar from "@/components/NavBar";
import LoginForm from "@/components/auth/LoginForm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // This is a placeholder for the actual Supabase authentication
    // In a real app, this would use supabase.auth.signInWithPassword
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, let's just show a success toast and redirect
      // This would be replaced with actual authentication logic later
      toast({
        title: "Login successful!",
        description: "Welcome back to Daily Notes",
      });
      navigate("/notes");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;
