import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { VFC } from 'react';
import { PERSONAL_DETAILS } from 'src/config';
import { CURRENT_AVATAR } from 'src/config/avatars';
import { AVATAR_IMAGE_SIZE, getAvatarImagePath } from 'src/util/avatars';

export const Avatar: VFC = () => {
  const { t } = useTranslation();
  return (
    <Image
      src={getAvatarImagePath(CURRENT_AVATAR.firstUsed)}
      width={AVATAR_IMAGE_SIZE}
      height={AVATAR_IMAGE_SIZE}
      priority
      layout="responsive"
      alt={t('common:seo.avatarImageAlt', { name: PERSONAL_DETAILS.NAME })}
    />
  );
};
