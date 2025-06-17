import React, {memo} from 'react';
import styles from './style.module.scss';
import db from 'store/db.json';
import {Tabs} from 'components/common/Tabs';
import {Tab} from 'components/common/Tabs/Tab';
import {IconSliders} from 'components/aux/icons/Sliders';
import {getUrlSlug} from 'utils/url';
import {useLocation} from 'react-router-dom';
import type {FC, ReactNode} from 'react';
import type {TLandingRoutes} from 'components/App';
import {RoutesCardsLayout} from './RoutesCardsLayout';

export type TLandingRoutesCardsLayoutProps = {
  children?: ReactNode | ReactNode[];
  pagesWithContentInCardsDiv?: TLandingRoutes[];
};

export const LandingRoutesCardsLayout: FC<TLandingRoutesCardsLayoutProps> = memo(
  ({pagesWithContentInCardsDiv = [], children: pageContent}) => {
    const location = useLocation();
    const routePage = getUrlSlug(location.pathname)?.[0] as TLandingRoutes;

    return (
      <section className={styles.landing_routes_cards_layout}>
        <div className='row center'>
          <div className={styles.tabs_wrapper}>
            {/* <Tab>
            <IconSliders scale={1.5} />
            <span style={{marginLeft: '10px'}}>Фильтры</span>
          </Tab> */}
            <Tabs options={db.tabOptions} defaultValue={routePage} />
          </div>
          {/* <i className='fa fa-cog' style={{transform: 'scale(1.5)'}} /> */}
        </div>

        <div className={styles.content}>
          <RoutesCardsLayout
            pageContent={pageContent}
            pagesWithContentInCardsDiv={pagesWithContentInCardsDiv}
            routePage={routePage}
          />
        </div>
      </section>
    );
  }
);
