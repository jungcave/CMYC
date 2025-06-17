import React, {useEffect, useRef, useState} from 'react';
import styles from './style.module.scss';
import type {FC} from 'react';
import {useLocation} from 'react-router-dom';
import {getParams} from 'utils/url';
import db from 'store/db.json';
import {Button} from 'components/common/Button';
import {IconUserFilledCircled} from 'components/aux/icons/UserFilledCircled';
import {NotFound} from 'components/common/NotFound';
import {IconForward} from 'components/aux/icons/Forward';
import {IconPlus} from 'components/aux/icons/Plus';
import {IconEllipses} from 'components/aux/icons/Ellipses';
import {CardsLayout} from 'components/layouts/LandingRoutesCardsLayout/CardsLayout';

export const UserPage: FC<any> = ({}) => {
  const location = useLocation();
  const urlParams = getParams(location.search);
  const user: any = db.users.find((u) => urlParams.id === u.id.toString());

  const halfIdx = Math.abs(db.cards.length / 2 - 1);
  const leftCards = db.cards.slice(halfIdx);
  const rightCards = db.cards.slice(0, halfIdx);

  return (
    <div className={`${styles.user_page} ${!user ? styles.not_found : ''}`}>
      {!user ? (
        <NotFound style={{color: '#f0f0f0'}} />
      ) : (
        <div className={styles.page_content}>
          <div className={styles.grid}>
            {/* Left */}
            <div className={styles.image}>
              {user.mainImage ? <img alt='?' src={user.mainImage} /> : <NotFound />}
            </div>

            {/* Right */}
            <div className={styles.content}>
              <div className={styles.header}>
                <IconUserFilledCircled />
                <div className={styles.name}>{user.name}</div>
                <Button>Подписаться</Button>
              </div>

              {user.info && (
                <div className={styles.info}>
                  <h1 className={styles.motto}>{user.info?.motto}&nbsp;</h1>
                  <div className={styles.statement}>{user.info?.statement}</div>
                </div>
              )}

              <div className={styles.buttons}>
                <Button type='primary'>
                  <IconPlus />
                </Button>
                <Button>
                  <IconForward />
                </Button>
                <Button>
                  <IconEllipses fill='black' />
                </Button>
              </div>

              {user.comments && (
                <div className={`${styles.comments}`}>
                  <h2>Комментарии</h2>
                  {user.comments?.map((comment) => (
                    <div className={styles.comment}>
                      <div className={styles.head}>
                        <div className={styles.avatar}>
                          {comment.userIcon ? (
                            <img alt='?' src={comment.userIcon} />
                          ) : (
                            <IconUserFilledCircled width='60' height='60' />
                          )}
                        </div>
                        <div className={styles.name}>{comment.userName}</div>
                      </div>
                      <div className={styles.text}>{comment.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.projects}>
            <div className={styles.title}>Похожие проекты</div>
            <div className={styles.flex_wrapper}>
              <CardsLayout
                leftCards={leftCards.filter(({dummy}) => !dummy)}
                rightCards={rightCards.filter(({dummy}) => !dummy)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
