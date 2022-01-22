import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'modules/AvatarCredit.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo, VFC } from 'react';
import { ARTIST_MAP } from 'src/config/artists';
import { CURRENT_AVATAR } from 'src/config/avatars';
import { isArtistMe } from 'src/util/oc';

const avatarPage = '/avatar';

const AvatarCreditComponent: VFC = () => {
  const { t } = useTranslation();
  const { artist: artistKay } = CURRENT_AVATAR;
  const artist = ARTIST_MAP[artistKay];

  return (
    <p className={styles.avatarCredit}>
      {isArtistMe(artist) ? (
        <Link href={avatarPage}>
          <a>
            <FontAwesomeIcon icon="history" className="mr-2" size="sm" />
            {t('about:avatarHistory')}
          </a>
        </Link>
      ) : (
        <>
          {`${t('about:avatarBy')}`}
          <Link href={avatarPage}>
            <a className="ml-1">{artist.name}</a>
          </Link>
        </>
      )}
    </p>
  );
};

export const AvatarCredit = memo(AvatarCreditComponent);
