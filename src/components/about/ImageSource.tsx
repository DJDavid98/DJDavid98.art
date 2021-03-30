import { ExternalLink } from 'components/common/ExternalLink';
import { useTranslation } from 'next-i18next';
import React, { VFC } from 'react';

export const ImageSource: VFC<{ id: number; sourceUrl?: string }> = ({ id, sourceUrl }) => {
  const { t } = useTranslation();
  const finalSource = sourceUrl || `https://furbooru.org/images/${id}`;
  return (
    <>
      {t('about:artwork.source')}: <ExternalLink href={finalSource}>{finalSource}</ExternalLink>
    </>
  );
};
