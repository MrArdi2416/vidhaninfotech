import axios from "axios";
import React, { useEffect, useState } from "react";

interface CreateNewModalProps {
  closeModal: () => void;
  userData?: any;
  isEdit: boolean; 
}

const Modal: React.FC<CreateNewModalProps> = ({
  closeModal,
  userData,
  isEdit,
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
  }>({});

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setPassword(userData.password);
      setPhone(userData.phone);
      setGender(userData.gender);
      setSelectedLanguages(userData.languages);
      setAddress(userData.address);
    }
  }, [userData]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const validate = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      phone?: string;
      address?: string;
    } = {};

    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        "Phone number must be 10 digits and contain only numbers";
    }
    if (!address) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setGender("male");
    setSelectedLanguages([]);
    setAddress("");
  };

  const handleSave = async () => {
    if (!validate()) return; 

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
      if (isEdit && userData) {
        await axios.put(`http://localhost:5000/users/${userData.id}`, newUser);
        alert("User updated successfully");
      } else {
        await axios.post("http://localhost:5000/users", newUser);
        alert("User added successfully");
      }
    } catch (error) {
      console.error("Error while saving user:", error);
      alert("An error occurred while saving the user.");
    }

    closeModal();
  };

  const handleCancel = () => {
    if (isEdit && userData) {
      setFirstName(userData?.firstName || "");
      setLastName(userData?.lastName || "");
      setEmail(userData?.email || "");
      setPassword(userData?.password || "");
      setPhone(userData?.phone || "");
      setGender(userData?.gender || "male");
      setSelectedLanguages(userData?.languages || []);
      setAddress(userData?.address || "");
    } else {
      clearForm(); 
    }
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal(); 
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-96 ">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6">
          {" "}
          {isEdit ? "Update Data" : "Create new"}
        </h2>
        <form className="space-y-2 	overflow-auto">
          <div>
            <label htmlFor="organizationName" className="block mb-1">
              FIRST NAME*
            </label>
            <input
              type="text"
              id="organizationName"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="employees" className="block mb-1">
              LAST NAME*
            </label>
            <input
              type="text"
              id="employees"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label htmlFor="industry" className="block mb-1">
              EMAIL*
            </label>
            <input
              type="email"
              id="employees"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {!isEdit && (
            <div>
              <label htmlFor="password" className="block mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="dataDomain" className="block mb-1">
              PHONE
            </label>
            <input
              type="text"
              id="dataDomain"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div>
            <label htmlFor="businessFunction" className="block mb-1">
              GENDER
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="mr-4">
              <input
                className="ml-2"
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />

              <span className="ml-2">Female</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />

              <span className="ml-2">Other</span>
            </label>
          </div>
          <div>
            <label htmlFor="region" className="block mb-1">
              LAGUAGES*
            </label>
            <div className="flex ">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="English"
                  checked={selectedLanguages.includes("English")}
                  onChange={() => handleLanguageChange("English")}
                />
                <span className="ml-2">English</span>
              </label>
              <label className="flex items-center ml-2">
                <input
                  className="ml-2"
                  type="checkbox"
                  value="Gujarati"
                  checked={selectedLanguages.includes("Spanish")}
                  onChange={() => handleLanguageChange("Spanish")}
                />
                <span className="ml-2">Gujarati</span>
              </label>
              <label className="flex items-center ml-2">
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
          <div>
            <label htmlFor="businessFunction" className="block mb-1">
              ADDRESS
            </label>
            <textarea
              id="businessFunction"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleSave}
          >
            {isEdit ? "Update" : "Save"}{" "}
          </button>
          <button
            type="button"
            className="bg-white hover:bg-grey-500 border-2 font-bold py-2 px-4 rounded-lg ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
