import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequests } from "../utils/requestslice";
import api from "../utils/api";

const Requests = () => {
  const dispatch = useDispatch();
  const myrequests = useSelector((store) => store.requests) || [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewing, setReviewing] = useState("");

  useEffect(() => {
    let cancelled = false;

    api.get("/get/myrequests")
      .then(({ data }) => {
        if (!cancelled) dispatch(addrequests(Array.isArray(data) ? data : []));
      })
      .catch(() => {
        if (!cancelled) setError("We couldn’t load incoming requests. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [dispatch]);

  const reviewRequest = async (requestId, status) => {
    setError("");
    setReviewing(requestId);
    try {
      await api.patch(`/request/review/${status}/${requestId}`, {});
      dispatch(addrequests(myrequests.filter((request) => request._id !== requestId)));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We couldn’t update this request.");
    } finally {
      setReviewing("");
    }
  };

  return (
    <div>
      <div className="section-head">
        <h1 className="page-heading">Requests</h1>
        <p className="page-subtitle">Review people who’d like to connect and build alongside you.</p>
      </div>
      {loading && <p role="status" className="status-state">Loading requests…</p>}
      {error && <p role="alert" className="error-message">{error}</p>}
      {!loading && !error && myrequests.length === 0 && <div className="empty-state"><strong>You’re all caught up.</strong>New connection requests will show up here.</div>}
      <div className="collection-grid">
      {myrequests.map((request) => {
        const person = request.fromUserId;
        if (!person) return null;

        return (
          <article key={request._id} className="content-card request-card">
              <img className="request-avatar" src={person.photourl || "https://placehold.co/100x100/e5f4ef/087f70?text=Dev"} alt="" />
              <div>
              <h2>
                {[person.firstname, person.lastname].filter(Boolean).join(" ")} wants to connect
              </h2>
              {person.about && <p>{person.about}</p>}
              {Array.isArray(person.skills) && person.skills.length > 0 && (
                <p><strong>Skills:</strong> {person.skills.join(", ")}</p>
              )}
              </div>
              <div className="card-actions justify-end">
                <button
                  className="button button-secondary"
                  disabled={reviewing === request._id}
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Decline
                </button>
                <button
                  className="button button-primary"
                  disabled={reviewing === request._id}
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  {reviewing === request._id ? "Saving…" : "Accept"}
                </button>
              </div>
          </article>
        );
      })}
      </div>
    </div>
  );
};

export default Requests;
