import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "../utils/connectionslice";
import Usercard from "./Usercard";
import api from "../utils/api";

const Connections = () => {
  const connections = useSelector((store) => store.connections) || [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    api.get("/connections")
      .then(({ data }) => {
        if (!cancelled) dispatch(addconnections(Array.isArray(data) ? data : []));
      })
      .catch(() => {
        if (!cancelled) setError("We couldn’t load your connections. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [dispatch]);

  return (
    <div>
      <div className="section-head">
        <h1 className="page-heading">Your connections</h1>
        <p className="page-subtitle">A growing circle of developers ready to share ideas and make things.</p>
      </div>
      {loading && <p role="status" className="status-state">Loading connections…</p>}
      {error && <p role="alert" className="error-message">{error}</p>}
      {!loading && !error && connections.length === 0 && <div className="empty-state"><strong>Your circle starts here.</strong>Connect with developers you’d like to work with, and you’ll find them here.</div>}
      <div className="collection-grid">
        {connections.map((connection) => (
          <Usercard key={connection._id} user={connection.otherUser} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
