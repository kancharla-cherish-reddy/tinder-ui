const Usercard = ({ user, onInterested, onIgnore }) => {
  if (!user) return null;

  const skills = Array.isArray(user.skills) ? user.skills : [];
  const name = [user.firstname, user.lastname].filter(Boolean).join(" ") || "Developer";

  return (
    <article className="developer-card">
      <div className="developer-image">
        <img
          src={user.photourl || user.photoUrl || "https://placehold.co/640x420/e5f4ef/087f70?text=Developer"}
          alt={`${name} profile`}
          loading="lazy"
        />
        {user.gender && <span className="image-label">{user.gender === "others" ? "Developer" : `${user.gender[0].toUpperCase()}${user.gender.slice(1)} developer`}</span>}
      </div>
      <div className="developer-body">
        <h2 className="developer-title">{name}{user.age && <span>· {user.age}</span>}</h2>
        {user.about && <p className="developer-about">{user.about}</p>}
        {skills.length > 0 && (
          <ul className="skill-list" aria-label="Skills">
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        )}
        {(onInterested || onIgnore) && (
          <div className="card-actions">
            {onIgnore && <button className="button button-secondary" onClick={onIgnore}>Pass</button>}
            {onInterested && <button className="button button-primary" onClick={onInterested}>Connect</button>}
          </div>
        )}
      </div>
    </article>
  );
};

export default Usercard;
