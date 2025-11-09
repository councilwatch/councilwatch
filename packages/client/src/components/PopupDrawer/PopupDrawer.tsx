/**
 * This component displays as a popup dialog on large screens,
 * and a drawer dialog on mobile screens.
 */

import './PopupDrawer.scss';

import { v7 as uuidv4 } from 'uuid';
import React, { useEffect, useRef } from 'react';

function positionPopup(popup: HTMLDivElement, target: HTMLElement, offset: number) {
  const popupBoundingBox = popup.getBoundingClientRect();
  const targetBoundingBox = target.getBoundingClientRect();
  const arrowEdgeBounds = offset * 1.5;

  let position = 'bottom';
  if (popupBoundingBox.height + offset < window.innerHeight - (targetBoundingBox.y + targetBoundingBox.height)) {
    position = 'bottom';
  } else if ((popupBoundingBox.height + offset) < targetBoundingBox.y) {
    position = 'top';
  } else if (popupBoundingBox.width + offset < window.innerWidth - (targetBoundingBox.x + targetBoundingBox.width)) {
    position = 'right';
  } else if ((popupBoundingBox.width + offset) < targetBoundingBox.x) {
    position = 'left';
  }

  let screenX = 0;
  let screenY = 0;
  let arrowOffset = 0;
  if (position === 'left' || position === 'right') {
    screenY = targetBoundingBox.y + (targetBoundingBox.height / 2) - (popupBoundingBox.height / 2);
    screenY = Math.round(Math.max(0, Math.min(window.innerHeight - popupBoundingBox.height, screenY)));
    arrowOffset = (targetBoundingBox.y + (targetBoundingBox.height / 2)) - screenY;
    arrowOffset = Math.round(Math.max(arrowEdgeBounds, Math.min(popupBoundingBox.height - arrowEdgeBounds, arrowOffset)));
    if (position === 'left') {
      screenX = targetBoundingBox.x - offset - popupBoundingBox.width;
    } else {
      screenX = targetBoundingBox.x + targetBoundingBox.width + offset;
    }
  } else if (position === 'top' || position === 'bottom') {
    screenX = targetBoundingBox.x + (targetBoundingBox.width / 2) - (popupBoundingBox.width / 2);
    screenX = Math.round(Math.max(0, Math.min(window.innerWidth - popupBoundingBox.width, screenX)));
    arrowOffset = (targetBoundingBox.x + (targetBoundingBox.width / 2)) - screenX;
    arrowOffset = Math.round(Math.max(arrowEdgeBounds, Math.min(popupBoundingBox.width - arrowEdgeBounds, arrowOffset)));
    if (position === 'top') {
      screenY = targetBoundingBox.y - offset - popupBoundingBox.height;
    } else {
      screenY = targetBoundingBox.y + targetBoundingBox.height + offset;
    }
  }

  popup.classList.remove('popup-drawer--left', 'popup-drawer--right', 'popup-drawer--top', 'popup-drawer--bottom');
  popup.classList.add('popup-drawer--' + position);
  popup.style.setProperty('--popup-drawer-screen-x', screenX + 'px');
  popup.style.setProperty('--popup-drawer-screen-y', screenY + 'px');
  popup.style.setProperty('--popup-drawer-arrow-offset', arrowOffset + 'px');
}

export interface PopupDrawerProps {
  open: boolean;
  target?: HTMLElement;
  title?: React.ReactNode;
  dismissible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}
export const PopupDrawer: React.FC<PopupDrawerProps> = ({ open, title, children, dismissible, target, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element>(null);
  const previousTarget = useRef<HTMLElement>(null);
  const positionOffset = 16;

  const uuid = uuidv4();

  // Handle repositioning the popup when window resize / scroll

  useEffect(() => {
    const popupNode = popupRef.current;
    const focusTrapStartNode = focusTrapStartRef.current;
    if (popupNode && target) {
      window.addEventListener('resize', onWindowResize);
      document.addEventListener('scroll', onDocumentScroll);
      positionPopup(popupNode, target, positionOffset);

      if (document.activeElement && !popupNode.contains(document.activeElement)) {
        previousActiveElement.current = document.activeElement;
      }

      if (target !== previousTarget.current) {
        popupNode.classList.remove('popup-drawer--visible');
        window.setTimeout(
          () => popupNode.classList.add('popup-drawer--visible')
        , 50);
        ignoreFocusEdges = true;
        focusTrapStartNode?.focus();
        ignoreFocusEdges = false;
      } else {
        popupNode.classList.add('popup-drawer--visible');
      }
    }
    previousTarget.current = target ?? null;
    return () => {
      if (popupNode) {
        window.removeEventListener('resize', onWindowResize);
        document.removeEventListener('scroll', onDocumentScroll);
      }
    }
  });

  function onDocumentScroll() {
    if (!popupRef.current || !target) return;
    positionPopup(popupRef.current, target, positionOffset);
  }

  function onWindowResize() {
    if (!popupRef.current || !target) return;
    positionPopup(popupRef.current, target, positionOffset);
  }

  // Focus trap, required for dialog role

  let ignoreFocusEdges = false;
  const focusTrapStartRef = useRef<HTMLDivElement>(null);

  function findFocusableElements() {
    if (!popupRef.current) return [];
    return Array.from(popupRef.current.querySelectorAll<HTMLElement>(`
      a[href],
      area[href],
      input:not([disabled]),
      select:not([disabled]),
      textarea:not([disabled]),
      button:not([disabled]),
      iframe,
      object,
      embed,
      [contenteditable],
      [tabindex]:not([tabindex="-1"])
    `)).filter((el) =>
      el.offsetParent !== null
      && !el.hasAttribute('inert')
      && !el.closest('[inert]')
      && !el.hasAttribute('data-focus-trap-edge')
    );
  }

  function onFocusTrapStart() {
    if (ignoreFocusEdges) return;
    const lastFocusableElement = findFocusableElements().pop();
    lastFocusableElement?.focus();
  }

  function onKeyDownTrapStart(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
    }
  }

  function onFocusTrapEnd() {
    if (ignoreFocusEdges) return;
    const firstFocusableElement = findFocusableElements()[0];
    firstFocusableElement?.focus();
  }

  function onKeyDownTrapEnd(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
    }
  }

  // Dialog keyboard controls, as defined by spec https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

  function onKeyDownPopup(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  }

  // Handling closing - including mobile touch controls

  let dragStartPointerId: number | null = null;
  let dragStartY: number = 0;

  function close() {
    (previousActiveElement.current as HTMLElement)?.focus();
    previousActiveElement.current = null;
    onClose?.();
  }

  function onClickPopup(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === popupRef.current) {
      close();
    }
  }

  function onPointerDownDragHandle(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStartPointerId == null && event.isPrimary && event.button === 0) {
      dragStartPointerId = event.pointerId;
      dragStartY = event.pageY;
    }
  }

  function onPointerMoveWindow(event: PointerEvent) {
    if (popupRef.current && event.pointerId === dragStartPointerId) {
      const dragOffset = Math.max(0, event.pageY - dragStartY);
      popupRef.current.style.setProperty('--popup-drawer-drag-offset', dragOffset + 'px');
    }
  }

  function onPointerUpWindow(event: PointerEvent) {
    if (event.pointerId === dragStartPointerId) {
      dragStartPointerId = null;
      if (popupRef.current) {
        if (event.pageY - dragStartY > window.innerHeight / 5) {
          popupRef.current.style.setProperty('--popup-drawer-drag-offset', (window.innerHeight / 0.5) + 'px');
          setTimeout(() => {
            close();
          }, 100);
        } else {
          popupRef.current.style.setProperty('--popup-drawer-drag-offset', '0px');
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMoveWindow);
    window.addEventListener('pointerup', onPointerUpWindow);
    return () => {
      window.removeEventListener('pointermove', onPointerMoveWindow);
      window.removeEventListener('pointerup', onPointerUpWindow);
    }
  });

  // Template

  if (open && target) {
    return (
      <div
        ref={popupRef}
        className={"popup-drawer" + (dismissible ? ' popup-drawer--dismissible ' : '')}
        onKeyDown={onKeyDownPopup}
        onClick={onClickPopup}
      >
        <div className="popup-drawer__dialog" role="dialog" aria-labelledby={`popup-drawer-title-${uuid}`}>
          <div className="popup-drawer__mobile-drag-handle" onPointerDown={onPointerDownDragHandle}></div>
          <div ref={focusTrapStartRef} tabIndex={0} data-focus-trap-edge onFocus={onFocusTrapStart} onKeyDown={onKeyDownTrapStart}></div>
          {title ? <div id={`popup-drawer-title-${uuid}`} className="popup-drawer__title">{title}</div> : null}
          {dismissible ? <button className="popup-drawer__close" aria-label="Close dialog" onClick={close}></button> : null}
          <div className="popup-drawer__content">
            {children}
          </div>
          <div tabIndex={0} data-focus-trap-edge onFocus={onFocusTrapEnd} onKeyDown={onKeyDownTrapEnd}></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};