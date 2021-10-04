import styles from 'modules/AvatarCredit.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo, VFC } from 'react';
import { ArtistInfo } from 'src/types/oc';
import { isArtistMe } from 'src/util/oc';

const AvatarCreditComponent: VFC<{ artist: ArtistInfo }> = ({ artist }) => {
  const { t } = useTranslation();
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
