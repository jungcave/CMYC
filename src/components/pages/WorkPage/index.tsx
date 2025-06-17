import {GridCard} from 'components/common/Card/GridCard';
import React, {Fragment} from 'react';
import styles from './style.module.scss';
import {Button} from 'components/common/Button';
import {Checker} from 'components/common/Checker';
import {makeArray} from 'utils/generators';
import {FlatCard} from 'components/common/Card/FlatCard';
import {ReactComponent as GrapthDummy} from './graph_dummy.svg';
import {IconEllipses} from 'components/aux/icons/Ellipses';
import { IconArrowCorner } from 'components/aux/icons/ArrowCorner';

export const WorkPage = () => {
  return (
    <div className={styles.work_page}>
      <GridCard
        className={styles.work_card}
        contentLeft={
          <div className={styles.cell} id={styles.orders}>
            <div className={styles.row}>
              <div className={styles.title}>Заказы</div>
              <IconEllipses />
            </div>
            <GrapthDummy />
          </div>
        }
        contentRight={
          <div className={styles.cell} id={styles.todo}>
            <div className={styles.row}>
              <div className={styles.title}>To Do</div>
              <IconEllipses />
            </div>
            <div className={styles.projects}>
              {makeArray(4).map((i) => (
                <Fragment key={`checker-${i}`}>
                  <Checker>Проект {i + 1}</Checker>
                </Fragment>
              ))}
            </div>
          </div>
        }
        contentBottom={
          <div className={styles.cell} id={styles.tasks}>
            <div className={styles.row}>
              <div className={styles.title}>Задачи для вас:</div>
              <IconEllipses />
            </div>
            <div className={styles.wrapper}>
              <div className={styles.offer_cards}>
                {makeArray(8).map((i) => (
                  <Fragment key={`offer-card-${i}`}>
                    <FlatCard className={`${styles.offer_card} card-${i + 1}`}>
                      <div className={styles.header}>
                        <span>Разработка логотипа</span>
                        <IconArrowCorner />
                      </div>
                      <div className={styles.content}>
                        <span>
                          Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
                          сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более
                          или менее стандартное заполнение шаблона, а также...
                        </span>
                      </div>
                      <div className={styles.footer}>
                        <div className={styles.price}>50 000 ₽</div>
                        <Button type='primary'>Откликнуться</Button>
                      </div>
                    </FlatCard>
                  </Fragment>
                ))}
              </div>
              <Button className={styles.vertical_button} type='primary' orientation='vertical'>
                Смотреть еще
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};
