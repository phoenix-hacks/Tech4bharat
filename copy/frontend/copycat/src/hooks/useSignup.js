import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx"; // Import the custom hook for AuthContext

const useSignup = () => {
  const [loading, setLoading] = useState(false); // State to track loading state
  const { setAuthUser } = useAuthContext(); // Destructure to get setAuthUser from context

  // Signup function
  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true); // Set loading to true during the signup process
    try {
      // API call to backend
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error); // Handle errors from the API
      }

      // Store user data in localStorage
      localStorage.setItem("prc-user", JSON.stringify(data));
      // Update context with the logged-in user
      setAuthUser(data);
      toast.success("Signed up successfully!");
    } catch (error) {
      toast.error(error.message); // Show error message if there's an issue
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };

  return { loading, signup }; // Return the loading state and signup function
};

// Helper function to handle input errors
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignup;
