"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 bg-gradient-to-b from-blue-50 to-blue-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 text-center mb-10"
        >
          Contact Us
        </motion.h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h3 className="text-3xl font-semibold mb-4 text-blue-600">Get in Touch</h3>
            <p className="text-gray-600 mb-6">Reach out for any inquiries or support.</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-blue-500 text-2xl animate-pulse" />
                <p className="text-gray-700 hover:text-blue-600 transition">+94 716 195 982</p>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-500 text-2xl animate-bounce" />
                <p className="text-gray-700 hover:text-blue-600 transition">
                  norwoodlankateasinternational@gmail.com
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-500 text-2xl animate-spin-slow" />
                <p className="text-gray-700 hover:text-blue-600 transition">Norwood, Sri Lanka</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-6">
              <motion.iframe
                whileHover={{ scale: 1.05 }}
                className="w-full h-60 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1177.6590551617885!2d79.98137068921194!3d6.87177051583398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2511ff4c2142b%3A0xc20797ac18fb760f!2sNorwood%20Lanka%20Tea&#39;s%20International!5e0!3m2!1sen!2slk!4v1739906790250!5m2!1sen!2slk"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></motion.iframe>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <h3 className="text-3xl font-semibold mb-4 text-blue-600">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition h-32"
              ></motion.textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactUs;
