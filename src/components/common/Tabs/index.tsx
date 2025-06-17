import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import styles from './style.module.scss';
import {parseOptions} from 'utils/parsers';
import {makeKeyId} from 'utils/generators';
import {Tab} from './Tab';
import {Link} from 'react-router-dom';
import {landingRoutes} from 'components/App';
import type {FC, CSSProperties} from 'react';
import type {TEvent, TOption} from 'types/common';
import {Extend} from 'types/generic';

export type TTabsProps = {
  className?: string;
  style?: CSSProperties;
  options?: TOption[];
  defaultValue?: any;
  onSelect?: ((o: TOption) => void) | (() => void);
};

export type TRouteOption = Extend<[TOption, {value: keyof typeof landingRoutes}]>;

export const Tabs: FC<TTabsProps> = memo(
  ({className = '', style = {}, options: optionsProp = [], defaultValue, onSelect}) => {
    const options: TRouteOption[] = useMemo(() => parseOptions(optionsProp), [optionsProp]);
    const defaultOption = useMemo(
      () => options?.find((o) => o.value === defaultValue) ?? options[0],
      [defaultValue, options]
    );

    const tabsRef = useRef<HTMLDivElement | null>(null),
      {current: tabsElem} = tabsRef;
    const wasClickedByUserRef = useRef(false);

    const [activeTabIdx, setActiveTabIdx] = useState(defaultOption?.idx ?? 0);
    const [rerenders, setRerenders] = useState(1);

    const moveCaretToElement = (elAttr: HTMLElement, containerElement: HTMLElement | null) => {
      const el = elAttr?.tagName === 'A' ? elAttr?.parentElement : elAttr;

      if (!el || !containerElement) return;

      const left = el.offsetLeft + 'px';
      const {width} = getComputedStyle(el);
      containerElement.style.setProperty('--caret-left', left);
      containerElement.style.setProperty('--caret-width', width);
    };

    const handleTabClick = (ev: TEvent, option: TOption) => {
      if (!tabsElem || option.idx === undefined) return;

      wasClickedByUserRef.current = true;
      moveCaretToElement(ev.target as HTMLElement, tabsElem);
      setActiveTabIdx(option.idx);
      onSelect?.(option);
    };

    // On init set catet to elem
    useEffect(() => {
      if (!rerenders) return;

      if (!tabsElem) {
        setRerenders((rerenders) => rerenders + 1);
      } else {
        setRerenders(0);
        setTimeout(() => {
          const activeTabElem = tabsElem?.children?.[activeTabIdx] as HTMLElement;
          moveCaretToElement(activeTabElem, tabsElem);
        }, 1);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabsElem, rerenders]);

    // On link changes url move to default option
    useEffect(() => {
      if (defaultOption.idx !== activeTabIdx) {
        moveCaretToElement(tabsElem?.children?.[defaultOption.idx] as HTMLElement, tabsElem);
        setActiveTabIdx(defaultOption.idx);
      }
    }, [defaultOption]);

    return (
      <div ref={tabsRef} className={`${styles.tabs} ${className}`} style={style}>
        {options?.map((option) => (
          <Tab
            key={makeKeyId()}
            isActive={activeTabIdx === option.idx}
            onClick={(ev: TEvent) => handleTabClick(ev, option)}
          >
            <Link to={landingRoutes[option.value ?? 'none']}>{option?.label}</Link>
          </Tab>
        ))}
        <div className={styles.caret} />
      </div>
    );
  }
);
