"use client"
import React, { useState } from "react";
import html2canvas from "html2canvas"; // Import html2canvas
import jsPDF from "jspdf"; // Import jsPDF library

const App = () => {
  const [details, setDetails] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    logo: null,
    backgroundImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDetails({ ...details, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDetails({ ...details, backgroundImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Visiting Card Creator</h1>

      {/* Form */}
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Position</label>
          <input
            type="text"
            name="position"
            value={details.position}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Your Position"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Your Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={details.website}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Your Website"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={details.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Your Address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Company Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Background Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
      </form>

      {/* Visiting Card Preview */}
      <div
        id="card-preview" // Assign ID for html2canvas to capture
        className="mt-6 bg-gradient-to-r h-58 rounded-lg shadow-md w-[450px] max-w-lg"
        style={{
          backgroundImage: details.backgroundImage
            ? `url(${details.backgroundImage})`
            : "linear-gradient(to right, gray, yellow, red)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full p-6 w-full rounded-md text-white flex">
          {/* Left Section */}
          <div className="flex-shrink-0 flex flex-col h-40 items-center justify-center w-1/3">
          {details.logo && (
  <img
    src={details.logo}
    alt="Company Logo"
    className="h-20 w-20 object-cover rounded-full"
    style={{
      objectFit: "cover", // Ensures the logo maintains its aspect ratio
      borderRadius: "50%", // Ensures the logo is circular
    }}
  />
)}

            <div className="mt-2">
              <h2 className="text-xl font-bold text-slate-100 bg-zinc-900 p-1 rounded-sm">
                {details.name || "Your Name"}
              </h2>
            </div>
          </div>

        {/* Right Section */}
<div className="flex justify-end flex-grow">
  <div className="text-sm flex flex-col justify-end space-y-1">
    <p className="text-slate-100 bg-zinc-900 p-1 rounded-sm  ">
      🏠 {details.address || "Your Address"}
    </p>
    <p className="text-slate-100 bg-zinc-900 p-1 rounded-sm  ">
      📞 <a href={`tel:${details.phone}`} >{details.phone || "Phone Number"}</a>
    </p>
    <p className="text-slate-100 bg-zinc-900 p-1 rounded-sm  ">
      ✉️ <a href={`mailto:${details.email}`}>{details.email || "Email Address"}</a>
    </p>
    <p className="text-slate-100 bg-zinc-900 p-1 rounded-sm  ">
      🌐 <a href={details.website ? details.website : "#"} target="_blank" rel="noopener noreferrer">
        {details.website || "Website"}
      </a>
    </p>
  </div>
</div>

        </div>
      </div>

      {/* Button to Download as Image */}
      <button
  onClick={downloadAsPDF}
  className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
>
  Download as PDF
</button>

    </div>
  );
};

export default App;
// visiting card website link or email or phon number ko clickeble banao input types me changese karke ya fir website ki link me link ya a tag ka use karke apane hisab se karke only naya code do