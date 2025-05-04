import React, {PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';

import {Cross} from 'src/ui/components/icons/Cross';

import {Button, ButtonStyleType} from '../Button/Button';

import s from './Modal.module.css';

interface Props {
  onClose: () => void;
}

export function Modal({onClose, children}: PropsWithChildren<Props>) {
  return createPortal(
    <div className={s.modal} onClick={onClose}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <Button styleType={ButtonStyleType.Common} className={s.closeButton} onClick={onClose}>
          <Cross className={s.closeIcon} />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
