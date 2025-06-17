import React, {useCallback, useMemo} from 'react';
import db from 'store/db.json';
import {MotionOpacity} from 'components/aux/motions/MotionOpacity';
import {useAppStore} from 'store/AppStore/AppStoreProvider';
import {useSearchOptions} from 'utils/hooks/useOptionsSearch';
import {observer} from 'mobx-react-lite';
import type {FC, ReactNode} from 'react';
import {isEmpty} from 'utils/primitives';
import {NotFound} from 'components/common/NotFound';
import {CardsLayout} from './CardsLayout';
import type { TLandingRoutes } from 'components/App';

export const CARDS_ANIMATE_PRESENSE_DURATION_MS = 200;

export type TRoutesCardsLayoutProps = {
  pageContent?: ReactNode | ReactNode[];
  pagesWithContentInCardsDiv?: TLandingRoutes[];
  routePage?: TLandingRoutes;
};

export const RoutesCardsLayout: FC<TRoutesCardsLayoutProps> = observer(
  ({pageContent, pagesWithContentInCardsDiv, routePage}) => {
    const [baseCards, sectionCards] = useMemo(() => {
      const cardsHash = db.cards.reduce((acc, c) => Object.assign(acc, {...acc, [c.id]: c}), {});
      const baseCards = db.cardLayouts.baseCardLayoutIds.map((cardId) => cardsHash[cardId]);
      const sectionCards = db.cardLayouts.sectionCardLayoutIds.map((cardId) => cardsHash[cardId]);
      return [baseCards, sectionCards];
    }, []);

    const appStore = useAppStore(),
      {cardSearchPrompt} = appStore;

    const searchCards = useCallback(
      (cards, populateWithExtraCards = false) => {
        const unproxifiedCardSearch = cardSearchPrompt
          ? JSON.parse(JSON.stringify(cardSearchPrompt))
          : undefined;

        if (!unproxifiedCardSearch) return cards;
        else
          return useSearchOptions(
            !populateWithExtraCards
              ? cards
              : [...cards, ...db.cards.slice(db.cardLayouts.lastInLayoutIdx + 1)],
            unproxifiedCardSearch,
            ['userName', 'url', 'product']
          );
      },
      [cardSearchPrompt, routePage]
    );

    const [searchedBaseCards, searchedSectionCards] = useMemo(() => {
      return [searchCards(baseCards), searchCards(sectionCards, true)];
    }, [cardSearchPrompt, routePage]);

    return !routePage && isEmpty(searchedBaseCards) && isEmpty(searchedSectionCards) ? (
      <MotionOpacity duration={CARDS_ANIMATE_PRESENSE_DURATION_MS}>
        <NotFound style={{fontSize: '100px'}} />
      </MotionOpacity>
    ) : (
      <CardsLayout
        leftCards={searchedBaseCards}
        rightCards={searchedSectionCards}
        pageContent={pageContent}
        pagesWithContentInCardsDiv={pagesWithContentInCardsDiv}
        pageRoute={routePage}
      />
    );
  }
);
