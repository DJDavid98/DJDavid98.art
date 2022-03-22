import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ArtworkCreditsList } from 'components/oc/ArtworkCreditsList';
import { TFunction, Trans } from 'next-i18next';
import Link from 'next/link';
import { FC, memo, VFC } from 'react';
import { ArtistInfo } from 'src/types/oc';

const HomeLink: FC = memo(({ children }) => (
  <Link href="/">
    <a>{children}</a>
  </Link>
));

export enum AvatarBy {
  ANONYMOUS,
  ME,
}

export interface AvatarCreditsProps {
  t: TFunction;
  by?: AvatarBy;
  hideNsfw: boolean;
  artist?: ArtistInfo | null | false;
  basedOnArtist?: ArtistInfo;
  artistMainName: string;
  basedOn?: boolean;
}

export const AvatarCredits: VFC<AvatarCreditsProps> = ({ t, by, artist, basedOnArtist, artistMainName, hideNsfw, basedOn = false }) => {
  const heading = (
    <h2 className={classNames('h3', by === AvatarBy.ME ? 'mb-0' : 'mb-3')}>
      <small className="d-block mb-2">{t(basedOn ? 'avatar:basedOn' : 'avatar:createdBy')}</small>
      <FontAwesomeIcon icon="paint-brush" className="mr-2" />
      <strong>{artistMainName}</strong>
    </h2>
  );
  switch (by) {
    case AvatarBy.ME:
      return (
        <>
          {heading}
          <small className="d-block text-muted font-italic mb-3">{t('avatar:thatIsMe')}</small>
          {basedOnArtist ? (
            <AvatarCredits t={t} artist={basedOnArtist} hideNsfw={hideNsfw} artistMainName={basedOnArtist.name} basedOn />
          ) : (
            <p>
              <Trans t={t} i18nKey="avatar:noCreditsExplainer">
                0<HomeLink />2
              </Trans>
            </p>
          )}
        </>
      );
    case AvatarBy.ANONYMOUS:
      return (
        <>
          {heading}
          {t('avatar:noContactAnonymous')}
        </>
      );
    default:
      if (typeof artist === 'object' && artist !== null) {
        let credits = artist.credits;
        if (hideNsfw) {
          credits = credits.filter((c) => !c.nsfw);
        }
        if (credits.length > 0) {
          return (
            <>
              {heading}
              <p>{t('avatar:contactBelow')}</p>
              <ArtworkCreditsList name={artist.name} credits={credits} hideNsfw={hideNsfw} />
            </>
          );
        }
      }

      return (
        <>
          {heading}
          <p>{t('avatar:noContactAvailable')}</p>
        </>
      );
  }
};
