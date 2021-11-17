import styles from 'modules/AvatarCredit.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo, VFC } from 'react';
import { ARTIST_MAP } from 'src/config/artists';
import { CURRENT_AVATAR } from 'src/config/avatars';
import { isArtistMe } from 'src/util/oc';

const AvatarCreditComponent: VFC = () => {
  const { t } = useTranslation();
  const { artist: artistKay } = CURRENT_AVATAR;
  const artist = ARTIST_MAP[artistKay];

  if (isArtistMe(artist)) return null;

  return (
    <p className={styles.avatarCredit}>
      {`${t('about:avatarBy')}`}
      <Link href="/avatar">
        <a className="ml-1">{artist.name}</a>
      </Link>
    </p>
  );
};

export const AvatarCredit = memo(AvatarCreditComponent);
