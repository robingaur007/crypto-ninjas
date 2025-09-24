import { toast } from "react-toastify";

export const removeFromWatchlist = (id: string): void => {
  if (window.confirm("Are you sure you want to remove this coin")) {
    const items = localStorage.getItem("watchlist");

    if (items) {
      const arr: string[] = JSON.parse(items);
      localStorage.setItem(
        "watchlist",
        JSON.stringify(arr.filter((item) => item !== id))
      );
      toast.success(
        `${
          id.charAt(0).toUpperCase() + id.slice(1)
        } removed from the watchlist!`
      );
    }
  } else {
    toast.error("Couldn't remove the coin from the watchlist!");
  }
};
