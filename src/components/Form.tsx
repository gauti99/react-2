import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./Form.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  subjects: string[];
  resume: File | null;
  url: string;
  choice: string;
  about: string;
}

function Form() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "",
    subjects: [],
    resume: null,
    url: "",
    choice: "",
    about: "",
  });

  // Handle text, radio, dropdown, textarea
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle checkbox
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    let updated = [...form.subjects];

    if (e.target.checked) {
      updated.push(e.target.value);
    } else {
      updated = updated.filter((sub) => sub !== e.target.value);
    }

    setForm({ ...form, subjects: updated });
  };

  // Handle file upload
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      resume: e.target.files ? e.target.files[0] : null,
    });
  };

  // Submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    alert("Form Submitted Successfully!");
    
   // ✅ Save form data to localStorage
    localStorage.setItem("reactFormData", JSON.stringify(form));
  };


  // Reset form
  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: "",
      subjects: [],
      resume: null,
      url: "",
      choice: "",
      about: "",
    });
  };
  
  return (
    <div className="card">
      <h2 className="title">Form in React</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name*</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
        />

        <label>Last Name*</label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
        />

        <label>Enter Email*</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <label>Contact*</label>
        <input
          type="number"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
        />

        <label>Gender*</label>
        <div className="inline">
          <label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          </label>

          <label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          </label>

          <label>
            <input type="radio" name="gender" value="Other" onChange={handleChange} /> Other
          </label>
        </div>

        <label>Your Best Subject*</label>
        <div className="inline">
          <label>
            <input type="checkbox" value="English" onChange={handleCheckbox} /> English
          </label>

          <label>
            <input type="checkbox" value="Maths" onChange={handleCheckbox} /> Maths
          </label>

          <label>
            <input type="checkbox" value="Physics" onChange={handleCheckbox} /> Physics
          </label>
        </div>

        <label>Upload Resume*</label>
        <input type="file" onChange={handleFile} />

        <label>Enter URL*</label>
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="Enter URL"
        />

        <label>Select Your Choice</label>
        <select name="choice" value={form.choice} onChange={handleChange}>
          <option value="">Select your answer</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="Express">Express</option>
        </select>

        <label>About</label>
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About yourself"
        />

        <div className="btn-box">
          <button type="button" className="reset" onClick={handleReset}>
            Reset
          </button>

          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
