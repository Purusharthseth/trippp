import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDialog,
  useUser,
} from "@/index.jsx";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { CiUser } from "react-icons/ci";
import { toast } from "sonner";

function Header() {
  const { dialog, openDialog, closeDialog } = useDialog();
  const {user, storeUser, deleteUser}= useUser();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
    flow: "implicit",
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      storeUser();
      closeDialog();
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <img src="/Logo.svg" alt="Logo" />
      </Link>
      <div>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <div
                variant="outline"
                className="flex items-center gap-2 px-3 py-2  text-gray-700 
             hover:bg-blue-100 transition-all duration-200 cursor-pointer rounded-2xl  border border-gray-300"
              >
                <span>
                  <CiUser />
                </span>
                <span>{user?.name}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="mt-2 w-56 p-4 rounded-2xl shadow-xl bg-white border border-gray-200">
              <div className="space-y-3">
              <Link
                  to="/initialise-trip"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="ml-2">Create Trip</span>
                </Link>
                <Link
                  to="/my-trips"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="ml-2">My Trips</span>
                </Link>
                <div
                  onClick={() => {
                    googleLogout();
                    deleteUser();
                    toast.success("Logged out successfully");
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                >
                  <span className="ml-2">Logout</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            className="cursor-pointer"
            onClick={() => {
              openDialog();
            }}
          >
            Sign in
          </Button>
        )}
      </div>
      <Dialog open={dialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In with Google</DialogTitle>
            <DialogDescription>
              <Button onClick={login} className="w-full mt-5 cursor-pointer">
                <FaGoogle /> SIGN IN
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
