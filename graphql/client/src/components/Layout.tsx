import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="App p-10 max-w-xl">
      <header className="flex justify-between pb-5 border-b mb-6">
        <NavLink to="/">🌱 Australian Florae</NavLink>
      </header>
      <main className="grid gap-y-5 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
