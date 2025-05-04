import React, {useState} from 'react';

import {Button, ButtonSize, ButtonStyleType} from 'src/ui/kit/Button/Button';

import {TexturesGalleryModal} from '../../TexturesGalleryModal/TexturesGalleryModal';

export function SelectFromGallery() {
  const [isGalleryModalActive, setGalleryModalActive] = useState(false);

  return (
    <>
      <Button styleType={ButtonStyleType.Primary} size={ButtonSize.Medium} onClick={() => setGalleryModalActive(true)}>
        Add from collection
      </Button>
      {isGalleryModalActive && (
        <TexturesGalleryModal
          onClose={() => {
            setGalleryModalActive(false);
          }}
        />
      )}
    </>
  );
}
