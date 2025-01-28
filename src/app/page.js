"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { IoCloudUploadSharp } from "react-icons/io5";

const App = () => {
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    logo: null,
    backgroundImage: null,
    selectTextColor: "#000000", // Default text color (black)
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

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [400, 200], // Custom size for visiting card
    });

    // Add background image if provided
    if (details.backgroundImage) {
      pdf.addImage(details.backgroundImage, "JPEG", 0, 0, 450, 200);
    } else {
      // Add a gradient background as fallback
      pdf.setFillColor(200, 200, 200);
      pdf.rect(0, 0, 450, 200, "F");
    }

    // Add logo if provided
    if (details.logo) {
      pdf.addImage(details.logo, "PNG", 20, 20, 60, 60); // Logo dimensions and position
    }

    // Convert the selected text color from hex to RGB
    const hexColor = details.selectTextColor || "#000000";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Add text content with dynamic text color
    pdf.setTextColor(r, g, b); // Set dynamic text color
    pdf.setFontSize(16);
    pdf.text(details.name || "Company Name", 20, 100);
    pdf.setFontSize(12);
    pdf.text(details.phone ? `${details.phone}` : "Company Phone", 270, 120);
    pdf.text(details.email ? `${details.email}` : "Company Email", 270, 140);
    pdf.text(details.website ? `${details.website}` : "Company Website", 270, 160);
    pdf.text(details.address ? `${details.address}` : "Company Address", 270, 180);

    // Save the PDF
    pdf.save("visiting-card.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Visiting Card Creator</h1>

      {/* Form */}
      <form
        className={`text-black flex flex-col p-6 rounded-lg shadow-md w-full max-w-2xl items-end relative`}
        style={{
          backgroundImage: details.backgroundImage
            ? `url(${details.backgroundImage})`
            : "none",
          backgroundColor: details.backgroundImage ? "transparent" : "#94a3b8",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-2  h-[250px] justify-end">
          <div>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-2 py-1"
              placeholder="Company Name"
              
            />
          </div>

          <div>
            <input
              type="text"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-2 py-1"
              placeholder="Company Phone Number"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-2 py-1"
              placeholder="Company Email"
            />
          </div>

          <div>
            <input
              type="text"
              name="website"
              value={details.website}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-2 py-1"
              placeholder="Company Website"
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={details.address}
              onChange={handleChange}
              className="w-50 border border-gray-300 rounded px-2 py-1"
              placeholder="Company Address"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="absolute top-10 w-20 h-20 left-10 rounded-sm flex justify-center items-center cursor-pointer"
            style={{
              backgroundImage: details.logo ? `url(${details.logo})` : "none",
              backgroundColor: details.logo ? "transparent" : "#cbd5e1",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!details.logo && <IoCloudUploadSharp className="text-5xl text-blue-700" />}
          </label>
          <p className="mt-2 absolute top-[33%] left-[4%] text-gray-200">Company Logo</p>
        </div>

        {/* Background Image Upload */}
        <div>
          <input
            id="BgFileInput"
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="hidden"
          />
          <label
            htmlFor="BgFileInput"
            className="absolute top-[44%] left-[40%] w-28 h-20 rounded-sm flex justify-center items-center cursor-pointer"
            style={{
              backgroundColor: "#cbd5e1",
            }}
          >
            <IoCloudUploadSharp className="text-5xl text-blue-700" />
          </label>
          <p className="mt-2 absolute top-[65%] left-[38%] text-gray-200">Background Image</p>
        </div>

        {/* Text Color Selector */}
        <div className="mt-4">
          <label htmlFor="textColor" className="text-gray-200 mr-2">
            Text Color:
          </label>
          <input
            type="color"
            id="textColor"
            name="selectTextColor"
            value={details.selectTextColor}
            onChange={handleChange}
          />
        </div>
      </form>

      <button
        onClick={generatePDF}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download PDF
      </button>
    </div>
  );
};

export default App;
