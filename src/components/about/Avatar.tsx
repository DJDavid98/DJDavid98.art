import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { VFC } from 'react';
import { PERSONAL_DETAILS } from 'src/config';
import { getGravatarUrl } from 'src/util/common';

const size = '500';

export const Avatar: VFC = () => {
  const { t } = useTranslation();
  return (
    <Image
      src={getGravatarUrl(size)}
      unoptimized
      width={size}
      height={size}
      priority
      layout="responsive"
      alt={t('common:avatarImageAlt', { name: PERSONAL_DETAILS.NAME })}
    />
  );
};
