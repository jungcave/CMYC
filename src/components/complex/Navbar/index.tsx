import React, {useCallback, useRef, useState} from 'react';
import styles from './style.module.scss';
import db from 'store/db.json';
import {IconLogo} from 'components/aux/icons/Logo';
import {IconDots} from 'components/aux/icons/Dots';
import type {FC, CSSProperties} from 'react';
import {observer} from 'mobx-react-lite';
import {useAppStore} from 'store/AppStore/AppStoreProvider';
import {Link} from 'react-router-dom';
import type {TTimer} from 'types/common';
import {fillSvgElemColorWithInterval} from './helpers';
import {Search} from 'components/common/InputSearch';
import {useDebounce} from 'utils/hooks/useDebouncer';
import {getParams, getUrlSlug} from 'utils/url';
import {useLocation} from 'react-router-dom';
import {IconUserCircled} from 'components/aux/icons/UserCircled';

export type TNavbarProps = {
  className?: string;
  style?: CSSProperties;
};

export const Navbar: FC<TNavbarProps> = observer(({className = '', style}) => {
  const location = useLocation();
  const routePage = getUrlSlug(location?.pathname)?.[0];
  const showSearch =
    !routePage || ['education', 'events', 'work', 'products', 'art'].includes(routePage);

  const intervalIdRef = useRef<TTimer | undefined>(undefined);

  const [refresh, setRefresh] = useState(0);

  const appStore = useAppStore(),
    {cardSearchPrompt, setCardSearchPrompt} = appStore;

  const handleLogoMouseEnter = useCallback((ev) => {
    intervalIdRef.current = fillSvgElemColorWithInterval(ev.target, 2000);
  }, []);

  const handleLogoMouseLeave = useCallback((ev) => {
    intervalIdRef.current && clearInterval(intervalIdRef.current);
    fillSvgElemColorWithInterval(ev.target);
  }, []);

  const debounceSetCardSearch = useDebounce(
    (ev, searchedOption) => setCardSearchPrompt(searchedOption ?? ev?.target?.value),
    500
  );

  const handleSearchChange = useCallback(
    (ev, searchedOption) => {
      const prevCardSearch = cardSearchPrompt
        ? JSON.parse(JSON.stringify(cardSearchPrompt))
        : undefined;

      if (searchedOption?.originType === 'selected') {
        if (searchedOption?.value === prevCardSearch?.value) return; // ignore if has same value
        // Set instantly on select option
        setCardSearchPrompt(searchedOption ?? ev?.target?.value);
      } else {
        // Set debounced else
        debounceSetCardSearch(ev, searchedOption);
      }
    },
    [cardSearchPrompt]
  );

  return (
    <div
      className={`${styles.navbar} ${!showSearch ? styles.invisible_search : ''} ${className}`}
      style={style}
    >
      <Link
        to={'/'}
        style={{userSelect: 'none', width: 'fit-content'}}
        onClick={() => setRefresh((refresh) => (refresh += 1))}
      >
        <IconLogo
          className={styles.logo_icon}
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        />
      </Link>
      <Search
        visible={showSearch}
        refresh={refresh}
        className={styles.search_dropdown}
        options={db.searchOptions}
        onChange={handleSearchChange}
      />
      <div className={styles.right}>
        {/* <IconDots /> */}
        <IconUserCircled fill='lightgrey' />
      </div>
    </div>
  );
});
