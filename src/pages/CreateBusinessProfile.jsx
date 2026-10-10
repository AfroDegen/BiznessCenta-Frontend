import { useState } from "react";

export default function CreateBusinessProfile() {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    whatsapp: "",
    location: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Business Profile", form);

    // Supabase insert comes next
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h1>Create Business Profile</h1>

        <p>
          Let's get your business ready for
          visibility.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={form.businessName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Business Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp Number"
            value={form.whatsapp}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Save Profile
          </button>

        </form>

      </div>
    </div>
  );
}
