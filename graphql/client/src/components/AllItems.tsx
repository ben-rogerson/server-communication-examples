import { Link, NavLink } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAllFlora } from "@/utils/hooks";

function AllItems() {
  const allFlora = useAllFlora();

  if (allFlora.loading) return <>Loading</>;
  if (allFlora.error)
    return (
      <div className="text-red-500">
        Error: {getErrorMessage(allFlora.error)}
      </div>
    );

  if (!allFlora.data) return null;

  if (allFlora.data.getAllFlora.length === 0)
    return (
      <div>
        No flora added, <Link to="/add">add one now &rsaquo;</Link>
      </div>
    );

  return (
    <>
      <ul className="grid gap-y-3 transition-opacity">
        {[...allFlora.data.getAllFlora].reverse().map((flora) => (
          <li key={flora.id} className="text-2xl">
            <Link to={`/${flora.id}`}>{flora.title}</Link>
          </li>
        ))}
      </ul>
      <NavLink to="/add">+ Add</NavLink>
    </>
  );
}

export default AllItems;
