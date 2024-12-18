"use client"
import Container from "../Container";
import Logo from "../Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import useWindowScroll from "../../../hooks/useWindowScroll"




export default function NavBar() {
    const height = useWindowScroll();

  return (
    <div className={`${
          height > 1
          ? "fixed w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-b border-gray-100 z-40 shadow-sm"
          : "bg-white"} transition-all duration-300 ease-in-out`}>
      <div className="py-2 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <Logo />
            <div className="mx-auto">
            <Search />
            </div>
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
