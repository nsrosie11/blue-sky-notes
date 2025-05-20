
import NavBar from "@/components/NavBar";
import SignupForm from "@/components/auth/SignupForm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { signUp } from "@/services/authService";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      
      toast({
        title: "Account created!",
        description: "Welcome to Daily Notes",
      });
      navigate("/notes");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message || "There was an error creating your account",
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
