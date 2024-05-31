import { Routes, BrowserRouter, Route } from "react-router-dom";

import AppLayout from "./app-layout";
import { appPaths } from "./app-paths";
import App from "../App";
import EventsLog from "../features/events-log/events-log.component";
import Modification from "../features/modifications-log/modification-log.component";
import Users from "../features/users/users.components";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={appPaths.login} element={<>Login</>} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<App />} />
          <Route path={appPaths.modifications} element={<Modification />} />
          <Route path={appPaths.events} element={<EventsLog />} />
          <Route path={appPaths.users} element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
