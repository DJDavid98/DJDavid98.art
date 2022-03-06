import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArtworkCreditsList } from 'components/oc/ArtworkCreditsList';
import { useMemo, VFC } from 'react';
import { TFunction } from 'react-i18next';
import { ARTIST_MAP, ArtistName } from 'src/config/artists';

export const MultiArtistCreditList: VFC<{ artists: ArtistName[]; t: TFunction; nsfwEnabled: boolean }> = ({ artists, t, nsfwEnabled }) => {
  const names = useMemo(() => {
    const nameArray = artists.map((key) => ARTIST_MAP[key].name);
    if (nameArray.length === 1) return nameArray[0];
    return nameArray.join(', ').replace(/, ([^, ]+)$/, ' & $1');
  }, [artists]);

  return (
    <>
      <p className="font-weight-bold my-2 mx-2">
        <FontAwesomeIcon icon="paint-brush" className="mr-2" />
        {t('oc:detail.artworkBy')}: {names}
      </p>
      {artists.map((key) => (
        <ArtworkCreditsList key={key} {...ARTIST_MAP[key]} compact hideNsfw={!nsfwEnabled} />
      ))}
    </>
  );
};
