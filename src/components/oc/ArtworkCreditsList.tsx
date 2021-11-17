import { ArtworkCredit } from 'components/oc/ArtworkCredit';
import { memo, useMemo, VFC } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { ArtistInfo } from 'src/types/oc';

interface ArtworkCreditListProps {
  credits: ArtistInfo['credits'];
  name: ArtistInfo['name'];
  compact?: boolean;
  hideNsfw?: boolean;
}

const ArtworkCreditListComponent: VFC<ArtworkCreditListProps> = ({ credits, name, compact = false, hideNsfw = false }) => {
  const creditsElements = useMemo(
    () =>
      credits.reduce(
        (finalCredits, credit, i) =>
          hideNsfw && credit.nsfw === true
            ? finalCredits
            : [
                ...finalCredits,
                <ArtworkCredit key={i} className="btn btn-link" url={credit.url} name={credit.name || name} nsfw={credit.nsfw} />,
              ],
        [] as JSX.Element[],
      ),
    [credits, name, hideNsfw],
  );

  if (compact) {
    return <div>{creditsElements}</div>;
  }

  return (
    <Nav vertical>
      {creditsElements.map((credit, i) => (
        <NavItem key={i}>{credit}</NavItem>
      ))}
    </Nav>
  );
};

export const ArtworkCreditsList = memo(ArtworkCreditListComponent);
