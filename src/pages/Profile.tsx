import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { signOut } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample user data - would come from Supabase in a real app
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  // Form states
  const [name, setName] = useState(user.name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => ({ ...prev, name }));
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Password change failed",
        description: "There was an error updating your password",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <NavBar isLoggedIn={true} username={user.name} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="space-y-8">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email}
                        disabled
                        readOnly
                      />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isUpdating || name === user.name}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                    >
                      {isChangingPassword ? "Changing..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Log out from all devices</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      This will log you out from all devices where you're currently logged in.
                    </p>
                    <Button variant="outline" className="border-destructive text-destructive">
                      Log out everywhere
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium">Delete account</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Permanently delete your account and all of your notes. This action cannot be undone.
                    </p>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
