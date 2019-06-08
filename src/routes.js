import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Init"));

//new forms

const Categories = React.lazy(() => import("./views/Categories"));
const CategoriesForm = React.lazy(() =>
  import("./views/Categories/CategoriesForm")
);

const Tomographies = React.lazy(() => import("./views/Tomographies/Index"));
const TomographiesForm = React.lazy(() =>
  import("./views/Tomographies/ViewForm")
);

const routes = [
  {
    path: "/",
    exact: true,
    name: "Servicio Tomografo",
    component: DefaultLayout
  },
  { path: "/inicio", name: "Inicio", component: Dashboard },
  {
    path: "/categories/:id",
    name: "Detalle",
    component: CategoriesForm
  },
  {
    path: "/categories",
    name: "Listado de registros",
    component: Categories
  },

  {
    path: "/tomographies/:id",
    name: "Detalle",
    component: TomographiesForm
  },
  {
    path: "/tomographies",
    name: "Listado de registros",
    component: Tomographies
  }
];

export default routes;
