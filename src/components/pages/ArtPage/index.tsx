import React from 'react';
import styles from './styles.module.scss';
import {GridCard} from 'components/common/Card/GridCard';
import {IconButtonPlus} from 'components/aux/icons/ButtonPlus';
import {IconButtonBag} from 'components/aux/icons/ButtonBag';

export const ArtPage = () => {
  return (
    <div className={styles.art_page}>
      {/* Market */}
      <GridCard
        theme='white'
        contentLeft={
          <div className='row col justify-between height-100pc'>
            <div className='row align-center'>
              <h4>Маркет</h4>
              <IconButtonPlus className='row align-center push-right' />
            </div>
            <div className={styles.sales_numbers}>
              <div>Продажи: 31</div>
              <div>Работ: 57</div>
            </div>
            <div className='row align-center'>
              <h4 className={styles.price}>+250 300 ₽</h4>
              <IconButtonBag className='row align-center push-right' />
            </div>
          </div>
        }
      />
    </div>
  );
};
