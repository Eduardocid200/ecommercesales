import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SearchBar from "./SearchBar";

const reddressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="
    sticky
    top-0
    w-full
    bg-slate-200
    z-30
    shadow-sm
    "
    >
      <div className="py-4 border-b-[1px] ">
        <Container>
          <div className="
            flex items-center justify-between gap-3 md:gap-0">
            {/* Elimina el <a> dentro del <Link> */}
            <Link href="/">
              <div className={`${reddressed.className} font-bold text-2xl flex items-center gap-2`}>
                <Image
                  src="/Logo.png"
                  alt="TechFusion Hub Logo"
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
                Import Sales
              </div>
            </Link>

            <div className="hidden md:block"><SearchBar /></div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
