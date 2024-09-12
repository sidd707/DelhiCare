import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useVerifyOtpAndRegisterMutation,
} from "@/redux/apis/userApi";
import { userExists, userNotExists } from "@/redux/reducers/userReducer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [verifyOtpAndRegister, { isLoading, isError }] = useVerifyOtpAndRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await verifyOtpAndRegister(userData).unwrap();
      console.log(response);
      dispatch(userExists(response.user));
      toast.success("Registered Successfully");
      navigate("/"); // Redirect to homepage or dashboard
    } catch (err) {
      dispatch(userNotExists());
      console.log(err);
      toast.error("Failed to register"); // Display error message using toast
    }
  };

  return (
    <div className="w-full bg-stone-200 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create a new account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactNumber">Mobile Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="9876543210"
                value={userData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={userData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            {isError && <p className="text-red-500 mt-2">Error: {"Failed to register"}</p>}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://i.imgur.com/ETkShrX.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}




