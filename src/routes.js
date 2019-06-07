import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Init'));

//new forms

const Categories = React.lazy(() => import('./views/Categories'));
const CategoriesForm = React.lazy(() =>
   import('./views/Categories/CategoriesForm')
);
const Subcategories = React.lazy(() => import('./views/Subcategories'));
const SubcategoriesForm = React.lazy(() =>
   import('./views/Subcategories/SubcategoriesForm')
);
const Products = React.lazy(() => import('./views/Products'));
const ProductsForm = React.lazy(() => import('./views/Products/ProductsForm'));

const routes = [
   { path: '/', exact: true, name: 'Mi Bazar Aida', component: DefaultLayout },
   { path: '/inicio', name: 'Inicio', component: Dashboard },
   {
      path: '/categories/:id',
      name: 'Detalle',
      component: CategoriesForm
   },
   {
      path: '/categories',
      name: 'Listado de registros',
      component: Categories
   },
   {
      path: '/subcategories/:id',
      name: 'Detalle',
      component: SubcategoriesForm
   },
   {
      path: '/subcategories',
      name: 'Listado de registros',
      component: Subcategories
   },
   {
      path: '/products/:id',
      name: 'Detalle',
      component: ProductsForm
   },
   {
      path: '/products',
      name: 'Listado de registros',
      component: Products
   }
];

export default routes;
