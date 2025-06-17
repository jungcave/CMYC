import React from 'react';
import styles from './styles.module.scss';
import {GridCard} from 'components/common/Card/GridCard';
import {IconButtonForward} from 'components/aux/icons/ButtonForward';
import {Carousel} from 'components/complex/Carousel';
import db from 'store/db.json';
import {parseOptions} from 'utils/parsers';

export const ProductsPage = () => {
  return (
    <div className={styles.products_page}>
      <GridCard
        theme='primary'
        displayShrinkContent='right'
        contentLeft={
          <div className={`row align-center ${styles.card_left}`}>
            <h4>Бибилотека</h4>
            <IconButtonForward className={`${styles.icon_left} row center`} fill='black' />
          </div>
        }
        contentRight={
          <div className={`row col align-center ${styles.card_right} `}>
            <span className='row align-center'>Рекомендации</span>
            <Carousel options={parseOptions(db.libraryItems)} />
          </div>
        }
      />
    </div>
  );
};
