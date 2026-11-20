import { useDispatch, useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";
import { useEffect } from "react";
import axios from "axios";
import { itemListActions } from "../store";
import { useSearchParams } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (search) params.set("search", search);
        const query = params.toString();
        const url = query
          ? `${import.meta.env.VITE_COMMON_URL}/?${query}`
          : `${import.meta.env.VITE_COMMON_URL}`;
        const result = await axios.get(url, {
          withCredentials: true,
          signal,
        });
        console.log(result);
        const receivedItems = Array.isArray(result.data)
        ? result.data
        : result.data?.items;

        dispatch(
          itemListActions.itemsFromServer({
            items: Array.isArray(receivedItems) ? receivedItems : [],
          })
        );
      } catch (err) {
        if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
        console.log("home fetch error", err);
      }
    })();

    return () => {
      console.log("Clean UP!!");
      controller.abort();
    };
  }, [category, search, dispatch]);
  const itemList = useSelector((store) =>
    Array.isArray(store.itemList) ? store.itemList : []
  );
  console.log("i am getting ", itemList);

  return (
    <>
      <main>
        <div className="items-container">
          {itemList.map((item) => {
            return <HomeItem key={item._id} item={item}></HomeItem>;
          })}
        </div>
      </main>
    </>
  );
};
export default Home;
