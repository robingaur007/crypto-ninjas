export const hasBeenAdded = (id: string): boolean => {
  const watchlist = localStorage.getItem("watchlist");
  if (watchlist) {
    const arr: string[] = JSON.parse(watchlist);
    return arr.includes(id);
  }
  return false;
};
