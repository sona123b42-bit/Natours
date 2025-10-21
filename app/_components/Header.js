import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header({ user }) {
  return (
    <header className="border-b border-primary-900 px-8 py-5 bg-[#444]">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        <Logo />
        <Navigation user={user} />
      </div>
    </header>
  );
}

export default Header;
