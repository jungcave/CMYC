import React from 'react';
import styles from './style.module.scss';
import {GridCard} from 'components/common/Card/GridCard';
import {IconButtonForward} from 'components/aux/icons/ButtonForward';
import {IconBubleDialog} from 'components/aux/icons/BubbleDialog';

export const EducationPage = () => {
  return (
    <div className={styles.education_page}>
      <GridCard
        contentLeft='Обучение'
        contentRight={
          <div className={styles.card_content}>
            <div className={styles.top}>
              <div>UI/UX с 0 до PRO</div>
              <IconButtonForward className={styles.forward_icon} />
            </div>
            <div className={styles.bottom}>
              <IconBubleDialog isActive />
            </div>
          </div>
        }
      />
    </div>
  );
};
