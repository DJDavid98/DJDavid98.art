import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'modules/AvatarCredit.module.scss';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FunctionComponent, memo, useCallback, VFC } from 'react';
import { ARTIST_MAP } from 'src/config/artists';
import { CURRENT_AVATAR } from 'src/config/avatars';
import { isArtistMe } from 'src/util/oc';

const avatarPage = '/avatar';

const AvatarCreditComponent: VFC = () => {
  const { t } = useTranslation();
  const { artist: artistKay, basedOnArtist: basedOnArtistKey } = CURRENT_AVATAR;
  const artist = ARTIST_MAP[artistKay];
  const basedOnArtist = basedOnArtistKey && ARTIST_MAP[basedOnArtistKey];

  const LinkTag: FunctionComponent<{ className?: string }> = useCallback(
    ({ children, className }) => (
      <Link href={avatarPage}>
        <a className={className}>{children}</a>
      </Link>
    ),
    [],
  );

  let contents: JSX.Element | undefined;

  if (isArtistMe(artist)) {
    if (basedOnArtist) {
      contents = (
        <Trans t={t} i18nKey="about:avatarBasedOn">
          0<LinkTag>{{ basedOnArtist: basedOnArtist.name }}</LinkTag>
        </Trans>
      );
    } else {
      contents = (
        <LinkTag>
          <FontAwesomeIcon icon="history" className="mr-2" size="sm" />
          {t('about:avatarHistory')}
        </LinkTag>
      );
    }
  }
  if (!contents) {
    contents = (
      <>
        {t('about:avatarBy')}
        <LinkTag className="ml-1">{artist.name}</LinkTag>
      </>
    );
  }

  return <p className={styles.avatarCredit}>{contents}</p>;
};

export const AvatarCredit = memo(AvatarCreditComponent);
