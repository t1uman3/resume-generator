"use client";

import { useState } from "react";
import axios from "axios";
import "./globals.css"; // Стили с тёмной темой

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-resume/",
        form,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${form.name}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
    setIsLoading(false);
  };

  return (
    <main className="container">
      <h1 className="title">Resume Generator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="form"
      >
        <label className="label">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Skills
          <textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="textarea"
            required
          ></textarea>
        </label>
        <label className="label">
          Experience
          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="textarea"
            required
          ></textarea>
        </label>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Resume"}
        </button>
      </form>
    </main>
  );
}
