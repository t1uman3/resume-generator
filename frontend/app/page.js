"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвратить стандартное поведение формы

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-resume/",
        form,
        { responseType: "blob" }
      );

      // Генерация ссылки для скачивания PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating resume:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resume Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />
        <br />
        <label>Skills:</label>
        <textarea name="skills" onChange={handleChange} required />
        <br />
        <label>Experience:</label>
        <textarea name="experience" onChange={handleChange} required />
        <br />
        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
}

