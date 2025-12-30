"use client";

import Button from "@/components/Button";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  

  const handleSubmit = () => {
    // e.preventDefault();
    alert("Form submitted! We will reach out soon.");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      <h1 className="text-center text-4xl font-bold text-gray-900 mb-4">
        Contact <span className="text-blue-600">MyShopkeeper</span>
      </h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        We’d love to hear from you! Whether you have a question or feedback,
        just fill in the form below.
      </p>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 rounded-xl text-white shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          <p className="text-blue-50 mb-6">
            Reach us via phone, email, or our social profiles.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">📩 Email</h3>
              <p>support@myshopkeeper.com</p>
            </div>
            <div>
              <h3 className="font-semibold">📞 Phone</h3>
              <p>+91 99999 88888</p>
            </div>
            <div>
              <h3 className="font-semibold">📍 Location</h3>
              <p>Indore, Madhya Pradesh, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {/* <form
          // onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6 border"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>

          
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </form> */}

      </div>

      {/* Map Section */}
      {/* <div className="mt-20 w-full h-72 overflow-hidden rounded-xl shadow-lg border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.85804692298!2d75.85772577539953!3d22.726543279381878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963029c80dea891%3A0x187b8bea4e4cc504!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="MyShopkeeper location"
        ></iframe>
      </div> */}

    </div>
  );
}
