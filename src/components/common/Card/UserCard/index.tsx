import React, {memo, useCallback} from 'react';
import styles from './style.module.scss';
import {Card} from 'components/common/Card';
import type {FC} from 'react';
import type {Extend} from 'types/generic';
import type {TCardProps} from 'components/common/Card';
import {makeKeyId} from 'utils/generators';
import {IconCircle} from 'components/aux/icons/Circle';
import {IconComment} from 'components/aux/icons/Comment';
import {IconEllipses} from 'components/aux/icons/Ellipses';

export type TUserCard = {
  id: number;
  userName: string;
  imagePath: string;
  cardHeight?: string;
  url: string;
  product?: {
    name: string;
    desc: string;
    price: number;
  };
};

export type TUserCardProps = Extend<
  [Omit<TCardProps, 'children'>, {userCard?: TUserCard; isHovered?: boolean; linkTo?: string}]
>;

export const UserCard: FC<TUserCardProps> = memo(
  ({className = '', style = {}, userCard, isHovered = false, linkTo, onHover}) => {
    const handleClick = useCallback(() => {
      if (linkTo === undefined) return;

      window.location.href = linkTo;
    }, [linkTo]);

    return (
      <Card
        id={userCard?.id ?? makeKeyId()}
        className={className}
        imagePath={userCard?.imagePath}
        height={userCard?.cardHeight}
        onHover={onHover}
        onClick={handleClick}
      >
        <div className={`${styles.user_card} ${isHovered ? styles.hovered : ''}`} style={style}>
          <div className='row align-center'>
            <IconCircle />
            <div className={styles.name}>{userCard?.userName}</div>
            <div className='row align-center gap-30 push-right'>
              <IconComment />
              <IconEllipses />
            </div>
          </div>
          {userCard?.product && (
            <div className={styles.product}>
              <h4>{userCard?.product?.name}</h4>
              <div>{userCard?.product?.desc}</div>
              <h2>{userCard?.product?.price} ₽</h2>
            </div>
          )}
          <div className={styles.url}>{userCard?.url}</div>
        </div>
      </Card>
    );
  }
);
