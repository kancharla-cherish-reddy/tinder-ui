import { useState } from "react";
import { useDispatch } from "react-redux";
import Usercard from "./Usercard";
import api from "../utils/api";
import { adduser } from "../utils/userslice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [age, setAge] = useState(user?.age ?? "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photourl || user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const updatedUser = {
        firstname,
        lastname,
        age: age === "" ? null : Number(age),
        about,
        photourl: photoUrl,
        gender,
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const { data } = await api.patch("/profile/edit", updatedUser);
      dispatch(adduser(data.data));
      setSuccess(data.message || "Profile updated successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "We couldn’t save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="section-head">
        <h1 className="page-heading">Your profile</h1>
        <p className="page-subtitle">Tell the community what you’re into and the kind of work you love doing.</p>
      </div>
      <div className="profile-layout">
        <section className="profile-form-card">
          <h2>Edit your details</h2>
          <p>Your profile helps other developers find common ground.</p>
          <form onSubmit={handleSubmit} className="profile-form">
            <div>
              <div className="form-field"><label htmlFor="profile-firstname">First name</label>
              <input
                id="profile-firstname"
                type="text"
                minLength={1}
                maxLength={50}
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className=""
              />
              </div>
            </div>

            <div>
              <div className="form-field"><label htmlFor="profile-lastname">Last name</label>
              <input
                id="profile-lastname"
                type="text"
                minLength={1}
                maxLength={50}
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className=""
              />
              </div>
            </div>

            <div>
              <div className="form-field"><label htmlFor="profile-age">Age</label>
              <input
                id="profile-age"
                type="number"
                min={18}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className=""
              />
              </div>
            </div>

            <div>
              <div className="form-field"><label htmlFor="profile-about">About you</label>
              <textarea
                id="profile-about"
                maxLength={500}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className=""
              />
              </div>
            </div>

            <div>
              <div className="form-field"><label htmlFor="profile-photo">Profile photo URL</label>
              <input
                id="profile-photo"
                type="url"
                maxLength={2048}
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className=""
              />
              </div>
            </div>

            <div>
              <div className="form-field"><label htmlFor="profile-gender">Gender</label>
              <select
                id="profile-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className=""
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              </div>
            </div>

            <div>
              <div className="form-field"><label htmlFor="profile-skills">Skills</label>
              <input
                id="profile-skills"
                type="text"
                placeholder="JavaScript, React, Node.js"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className=""
              />
              </div>
            </div>

            {error && <p role="alert" className="error-message">{error}</p>}
            {success && <p role="status" className="success-message">{success}</p>}

            <button type="submit" className="button button-primary button-wide" disabled={saving}>
              {saving ? "Saving…" : "Save Profile"}
            </button>
          </form>
        </section>

        <aside className="profile-preview">
          <p className="preview-label">Live preview</p>
          <Usercard
            user={{
              firstname,
              lastname,
              age,
              about,
              photoUrl,
              photourl: photoUrl,
              gender,
              skills: skills.split(",").map((skill) => skill.trim()).filter(Boolean),
            }}
          />
        </aside>
      </div>
    </>
  );
};

export default EditProfile;
