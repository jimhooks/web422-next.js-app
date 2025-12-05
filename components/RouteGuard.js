import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Pages that do NOT require login
  const PUBLIC_PATHS = ["/login", "/register", "/about"];

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  useEffect(() => {
    const enforceAuth = async () => {
      // Only protect PROTECTED pages
      if (!PUBLIC_PATHS.includes(router.pathname)) {
        if (!isAuthenticated()) {
          router.push("/login");
        } else {
          await updateAtom();
        }
      }
    };

    enforceAuth();
  }, [router.pathname]);

  return <>{children}</>;
}
