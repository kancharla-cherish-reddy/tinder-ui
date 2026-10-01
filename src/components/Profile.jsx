import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((Store) => Store.user);
  return <EditProfile user={user} />;
};

export default Profile;
