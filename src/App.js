import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// pages
import PageNotFound from './pages/NotFound';
import AdminLayout from './pages/Admin/layout/Layout';
import Title from 'components/common/title';
import { privateRoutes, publicRoutes, shipperRoutes } from 'routes';
import DefaultLayout from 'layouts/DefaultLayout';
import Private from 'components/common/Private';
import ShipperPrivate from 'components/common/Private/ShipperPrivate';

const App = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout ? route.layout : route.layout === null ? Fragment : DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout title={route.title}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes?.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout ? route.layout : route.layout === null ? Fragment : AdminLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Private>
                  <Layout>
                    {route.title&&<Title title={route.title} back={route.back} />}
                    <Page />
                  </Layout>
                </Private>
              }
            />
          );
        })}
        {shipperRoutes?.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout ? route.layout : route.layout === null ? Fragment : AdminLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ShipperPrivate>
                  <Layout title={route.title}>
                    <Page />
                  </Layout>
                </ShipperPrivate>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <DefaultLayout>
              <PageNotFound />
            </DefaultLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
