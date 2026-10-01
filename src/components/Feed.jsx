import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtofeed, removefromfeed } from "../utils/feedslice";
import Usercard from "./Usercard";
import api from "../utils/api";

const Feed = () => {
  const feed = useSelector((store) => store.feed) || [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    api.get("/feed")
      .then(({ data }) => {
        if (!cancelled) dispatch(addtofeed(Array.isArray(data) ? data : []));
      })
      .catch(() => {
        if (!cancelled) setError("We couldn’t load developer profiles. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [dispatch]);

  const handleDecision = async (userId, status) => {
    setError("");
    try {
      await api.post(`/request/send/${status}/${userId}`, {});
      dispatch(removefromfeed(userId));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We couldn’t save that choice. Please try again.");
    }
  };

  return (
    <div className="feed-layout">
      <section className="feed-intro">
        <p className="eyebrow">Your community</p>
        <h1>Find your people.</h1>
        <p>Discover developers, see what they’re building, and connect when something clicks.</p>
      </section>
      <section className="feed-stack" aria-label="Developer profiles">
        {error && <p role="alert" className="error-message">{error}</p>}
        {loading && <p role="status" className="status-state">Finding developers for you…</p>}
        {!loading && !error && feed.length === 0 && <div className="empty-state"><strong>You’re all caught up.</strong>Check back soon for more developers to meet.</div>}
        {feed.map((user) => (
          <Usercard
            key={user._id}
            user={user}
            onInterested={() => handleDecision(user._id, "interested")}
            onIgnore={() => handleDecision(user._id, "ignored")}
          />
        ))}
      </section>
    </div>
  );
};

export default Feed;
