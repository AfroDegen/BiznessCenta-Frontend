import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function CreateBusiness() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    whatsapp: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/");
      return;
    }

    const { data: existing } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (existing) {
      navigate("/dashboard");
      return;
    }

    const { error: insertError } = await supabase
      .from("businesses")
      .insert({
        owner_id: user.id,
        ...form,
      });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Create your business profile</h1>

        <form
          onSubmit={handleSubmit}
          className="business-form"
        >
          <input
            name="name"
            placeholder="Business name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            name="whatsapp"
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
          />

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button
            className="primary-btn"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
