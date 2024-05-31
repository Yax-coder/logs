import { Outlet } from "react-router-dom";
import { Box, Text, Layout } from "@flexisaf/flexibull2";
import { useEffect, useState } from "react";
import { Edit, Grid5, MenuBoard, Profile } from "iconsax-react";
import { Link } from "react-router-dom";
import { useQueryStateSync } from "../utils/use-query-state-sync";
import logoUrl from "../assets/logo.svg";
import theme from "../utils/theme";
import { getToken } from "../utils/tempToken";

const AppLayout = () => {
  const initialQueryState = { active: 1, title: "Dashboard" };
  const { queryState, setQueryField } = useQueryStateSync(initialQueryState);
  const [activeMenuId, setActiveMenuId] = useState(1);

  useEffect(() => {
    const activeQueryParam = parseInt(queryState.active);
    if (!isNaN(activeQueryParam)) {
      setActiveMenuId(activeQueryParam);
    }
  }, [queryState]);

  useEffect(() => {
    const setToken = async () => {
      const token = await getToken();
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
      }
    };
    setToken()
  }, [queryState]);

  const handleItemClick = (id, title) => {
    setQueryField("active", id);
    setQueryField("title", title);
  };

  const menuList = [
    {
      icon: <Grid5 size="18" color="#4D5562" />,
      name: "Dashboard",
      label: "Dashboard",
      navlink: "/",
      id: 1,
    },
    {
      icon: <Edit size="18" color="#4D5562" />,
      name: "Modifications",
      label: "Modifications Logs",
      navlink: "/modifications",
      id: 2,
    },
    {
      icon: <MenuBoard size="18" color="#4D5562" />,
      name: "Events",
      label: "Events Logs",
      navlink: "/events",
      id: 3,
    },
    {
      icon: <Profile size="18" color="#4D5562" />,
      name: "Users",
      label: "Users",
      navlink: "/users",
      id: 4,
    },
  ];

  const MenuItem = ({ to, children, isActive, onClick }) => (
    <Link to={to}>
      <div
        className={` rounded p-3 cursor-pointer`}
        style={{
          background: isActive ? "#F9FAFB" : "#fff",
          boxShadow: isActive ? "inset 0 0 0 2px #E6E7EB" : "",
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );

  return (
    <Layout theme={theme}>
      <div className="flex">
        <div className="w-64 border-r border-r-1 h-screen  text-gray-800 p-4 sticky top-0">
          <Brand />
          <ul className="mt-15 p-5">
            {menuList.map((menu) => (
              <li key={menu.navlink} className="mb-2">
                <MenuItem
                  to={`${menu.navlink}`}
                  className="hover:text-gray-400"
                  onClick={() => handleItemClick(menu.id, menu.name)}
                  isActive={menu.id === activeMenuId}
                >
                  <div className="flex justify-between">
                    <Text size="14px" color="#383A3F">
                      <div className="flex">
                        <Text style={{ marginTop: "0.9px" }} className=" mr-2">
                          {menu.icon}
                        </Text>
                        {menu.name}
                      </div>
                    </Text>
                  </div>
                </MenuItem>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <div
            className=" border-b  border-b-1 p-4 sticky top-0 z-20"
            style={{ background: "rgba(249, 250, 251, 1)" }}
          >
            <h1 className="text-2xl ml-14">{queryState.title}</h1>
          </div>
          <div
            className=" h-screen flex-1 overflow-y-auto p-8 overflow-x-hidden"
            style={{ background: "rgba(249, 250, 251, 1)" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

function Brand() {
  return (
    <Box pad="10px" style={{ display: "flex" }}>
      <img
        alt="logo"
        src={logoUrl}
        style={{
          maxWidth: "80px",
          maxHeight: "40px",
          width: "auto",
          height: "auto",
        }}
      />
      {/* <h2 className="ml-2 mt-1 text-2xl font-bold mb-4 text-center">
        Audit Log
      </h2> */}
    </Box>
  );
}

export default AppLayout;
