
import NavBar from "@/components/NavBar";
import SignupForm from "@/components/auth/SignupForm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // This is a placeholder for the actual Supabase authentication
    // In a real app, this would use supabase.auth.signUp
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, show success and redirect
      toast({
        title: "Account created!",
        description: "Welcome to Daily Notes",
      });
      navigate("/notes");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "There was an error creating your account",
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
          <SignupForm onSignup={handleSignup} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
