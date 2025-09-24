import { toast } from "react-toastify";

export const addToWatchlist = (id: string): void => {
  const items = localStorage.getItem("watchlist");

  if (items) {
    const arr: string[] = JSON.parse(items);
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem("watchlist", JSON.stringify(arr));
    }
  } else {
    const arr: string[] = [id];
    localStorage.setItem("watchlist", JSON.stringify(arr));
  }

  toast.success(
    `${id.charAt(0).toUpperCase() + id.slice(1)} - Added To The Watchlist!`
  );
};
