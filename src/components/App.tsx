import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {AppStoreProvider} from 'store/AppStore/AppStoreProvider';
import {HomePage} from 'components/pages/HomePage';
import {Navbar} from 'components/complex/Navbar';
import {NotFoundPage} from 'components/pages/NotFoundPage';
import {LandingRoutesCardsLayout} from 'components/layouts/LandingRoutesCardsLayout';
import {EducationPage} from 'components/pages/EducationPage';
import {EventsPage} from 'components/pages/EventsPage';
import {WorkPage} from 'components/pages/WorkPage';
import {ProductsPage} from 'components/pages/ProductsPage';
import {ArtPage} from 'components/pages/ArtPage';
import {UserPage} from 'components/pages/UserPage';
import {AnimatePresence} from 'framer-motion';
import {MotionOpacity} from './aux/motions/MotionOpacity';
import {flattenObject} from 'utils/parsers';

const routes = {
  landing: {
    home: '/',
    education: '/education',
    events: '/events',
    work: '/work',
    products: '/products',
    art: '/art',
  },
  user: '/user',
};

export const landingRoutes = routes.landing;

export type TLandingRoutes = keyof typeof landingRoutes | '';

const availableRoutes = Object.values(flattenObject(routes));

export default function App() {
  return (
    <AppStoreProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={availableRoutes}>
            <Switch>
              {/* User page */}
              <Route exact path={routes['user']}>
                <AnimatePresence>
                  <MotionOpacity>
                    <UserPage />
                  </MotionOpacity>
                </AnimatePresence>
              </Route>
              {/* Landing page */}
              <LandingRoutesCardsLayout pagesWithContentInCardsDiv={['events', 'art'] as TLandingRoutes[]}>
                <Route exact path={landingRoutes['home']}>
                  <HomePage />
                </Route>
                <Route exact path={landingRoutes['education']}>
                  <EducationPage />
                </Route>
                <Route exact path={landingRoutes['events']}>
                  <EventsPage />
                </Route>
                <Route exact path={landingRoutes['work']}>
                  <WorkPage />
                </Route>
                <Route exact path={landingRoutes['products']}>
                  <ProductsPage />
                </Route>
                <Route exact path={landingRoutes['art']}>
                  <ArtPage />
                </Route>
              </LandingRoutesCardsLayout>
            </Switch>
          </Route>
          {/* 404 */}
          <Route path='*'>
            <AnimatePresence>
              <MotionOpacity>
                <NotFoundPage />
              </MotionOpacity>
            </AnimatePresence>
          </Route>
        </Switch>
      </Router>
    </AppStoreProvider>
  );
}
