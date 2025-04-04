"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import toast notifications

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("🎉 Message Sent Successfully!", { duration: 3000 }); // ✅ Success Toast
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("❌ Failed to send message, please try again."); // ✅ Error Toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ An error occurred. Please try again later."); // ✅ Error Toast
    }

    setLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 bg-gradient-to-b from-white to-green-200"
    >
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* ✅ Toast System */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 text-center mb-10"
        >
          Contact Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h3 className="text-3xl font-semibold mb-4 text-green-600">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-6">
              Reach out for any inquiries or support.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-green-500 text-2xl animate-pulse" />
                <p className="text-gray-700 hover:text-green-600 transition">
                  +94 716 195 982
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-green-500 text-2xl animate-pulse" />

                <p className="text-gray-700 hover:text-green-600 transition">
                  norwoodlankateasinternational@gmail.com
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-green-500 text-2xl animate-bounce" />
                <p className="text-gray-700 hover:text-green-600 transition">
                  Norwood, Sri Lanka
                </p>
              </div>
            </div>
            {/* Google Map Embed */}
            <div className="mt-6">
              <iframe
                title="Google Map"
                className="w-full h-64 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.159262690624!2d79.97885107568112!3d6.87151231901993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2511ff4c2142b%3A0xc20797ac18fb760f!2sNorwood%20Empire%20(PVT)%20Ltd!5e0!3m2!1sen!2slk!4v1740077158463!5m2!1sen!2slk"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h3 className="text-3xl font-semibold mb-4 text-green-600">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition h-32"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactUs;
