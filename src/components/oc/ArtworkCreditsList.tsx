import classNames from 'classnames';
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
  const btnClasses = useMemo(() => classNames('btn btn-link', { 'btn-sm': compact }), [compact]);
  const creditsElements = useMemo(
    () =>
      credits.reduce(
        (finalCredits, credit, i) =>
          hideNsfw && credit.nsfw === true
            ? finalCredits
            : [
                ...finalCredits,
                <ArtworkCredit
                  key={i}
                  className={btnClasses}
                  url={credit.url}
                  name={credit.name || name}
                  label={credit.label}
                  nsfw={credit.nsfw}
                />,
              ],
        [] as JSX.Element[],
      ),
    [credits, hideNsfw, btnClasses, name],
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
