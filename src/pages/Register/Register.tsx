import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerFailure, registerSuccess } from "../../store/userSlice";


const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const validateForm = (): boolean => {
    if (!firstName || !lastName || !email || !password || !phone || !address) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid mobile number (10 digits).");

      return false;
    }

    setError("");

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
     languages: selectedLanguages,
      address,
    };

    try {
      await axios.post("http://localhost:5000/users", newUser);
      dispatch(registerSuccess());
      navigate("/login");
    } catch (error) {
      setError("An error occurred while registering. Please try again.");

      dispatch(registerFailure("An error occurred while registering."));

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 ">
              <h1 className="text-[#17314E] text-3xl ml-14 font-bold">Register</h1>

              {error && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {error}
                </p>
              )}
              
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs mt-4">
                <input
                  className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                {/* Gender Radio Buttons */}
                <div className="mt-5">

                  <label className="mr-4">
                    <input
                      className="mx-2"
                      type="radio"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                    Male
                  </label>
                  <label className="mr-4">
                    <input
                      className="mx-2"
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                  <label className="mr-4">
                    <input
                      className="mx-2"
                      type="radio"
                      value="other"
                      checked={gender === "other"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Other
                  </label>
                </div>

              
                <div className="mt-5">
                  <h2 className="text-lg font-semibold">Languages:</h2>
                    <div className="flex">
                    <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="English"
                      checked={selectedLanguages.includes("English")}
                      onChange={() => handleLanguageChange("English")}
                    />
                    <span className="ml-2">English</span>
                  </label>
                  <label className="flex items-center">
                    <input
                     className="ml-2"
                      type="checkbox"
                      value="Gujarati"
                      checked={selectedLanguages.includes("Spanish")}
                      onChange={() => handleLanguageChange("Spanish")}
                    />
                    <span className="ml-2">Gujarati</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      className="ml-2"
                      type="checkbox"
                      value="Hindi"
                      checked={selectedLanguages.includes("French")}
                      onChange={() => handleLanguageChange("French")}
                    />
                    <span className="ml-2">Hindi</span>
                  </label>
                    </div>
                </div>

                <textarea
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-[#4983c5] text-white hover:bg-[#5c789e] w-full py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span>Register</span>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-[#4983c5] text-white hover:bg-[#5c789e] w-full py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                    <span>Already have an account? Login</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#17314E] text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;

