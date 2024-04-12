import { Link, useNavigate } from "react-router-dom";
import { logout } from "../be-firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../be-firebase/firebase-config";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="w-auto h-auto mx-3 my-4 flex flex-row justify-around items-center ">
        <Link to={"/"}>
          <p className=" font-bold font-sans text-4xl">Fake Store App</p>
        </Link>
        <Link
          className="rounded-md px-4 text-center py-2 font-bold bg-cyan-100 hover:bg-cyan-400 duration-200"
          to={"/cart"}>
          <button>Show Cart</button>
        </Link>
        <button onClick={() => logout(signOut, auth, navigate)}>Logout</button>
      </nav>
    </div>
  );
};

export default Header;
