import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="w-auto h-auto mx-3 my-4 flex flex-row justify-around items-center ">
        <Link to={"/"}>
          <p className=" font-bold font-sans text-4xl">Fake Store App</p>
        </Link>
        <Link
          className="rounded-md px-4 w-[6rem] text-center py-2 font-bold bg-cyan-100 hover:bg-cyan-400 duration-200"
          to={"/cart"}>
          <button>Cart</button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
