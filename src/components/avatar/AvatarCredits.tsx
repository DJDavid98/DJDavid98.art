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
}

export const AvatarCredits: VFC<AvatarCreditsProps> = ({ t, by, artist, hideNsfw }) => {
  switch (by) {
    case AvatarBy.ME:
      return (
        <>
          <small className="d-block text-muted font-italic mb-3">{t('avatar:thatIsMe')}</small>
          <p>
            <Trans t={t} i18nKey="avatar:noCreditsExplainer">
              0<HomeLink />2
            </Trans>
          </p>
        </>
      );
    case AvatarBy.ANONYMOUS:
      return t('avatar:noContactAnonymous');
    default:
      if (typeof artist === 'object' && artist !== null) {
        let credits = artist.credits;
        if (hideNsfw) {
          credits = credits.filter((c) => !c.nsfw);
        }
        if (credits.length > 0) {
          return (
            <>
              <p>{t('avatar:contactBelow')}</p>
              <ArtworkCreditsList name={artist.name} credits={credits} hideNsfw={hideNsfw} />
            </>
          );
        }
      }

      return <p>{t('avatar:noContactAvailable')}</p>;
  }
};
