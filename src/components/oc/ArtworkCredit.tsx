import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { CustomIcon } from 'components/common/CustomIcon';
import { ExternalLink, ExternalLinkProps } from 'components/common/ExternalLink';
import styles from 'modules/ArtworkCredit.module.scss';
import Image from 'next/image';
import { memo, useMemo, useRef, VFC } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { ArtistContactDetails } from 'src/types/oc';
import { resolveSocialIconStyle } from 'src/util/resolve-social-icon-style';

interface PropTypes extends ArtistContactDetails, Pick<ExternalLinkProps, 'className' | 'tag'> {
  spacingClass?: false | 'mr-1' | 'mr-2' | 'mr-3' | 'mr-4' | 'mr-5';
}

const ArtworkCreditComponent: VFC<PropTypes> = ({ url, name, label, nsfw, className, spacingClass = 'mr-1', tag }) => {
  const { colorClass, ...restProps } = useMemo(() => resolveSocialIconStyle(url), [url]);
  const customIconRef = useRef<HTMLImageElement>(null);

  return (
    <ExternalLink tag={tag} href={url} className={className}>
      {'icon' in restProps && <FontAwesomeIcon icon={restProps.icon} className={classNames(spacingClass, colorClass)} />}
      {'brandIcon' in restProps && <FontAwesomeIcon icon={['fab', restProps.brandIcon]} className={classNames(spacingClass, colorClass)} />}
      {'brandLogo' in restProps && (
        <span className={classNames(styles.brandLogo, spacingClass)}>
          <Image src={restProps.brandLogo} alt="website logo" width={32} height={32} layout="responsive" />
        </span>
      )}
      {label ? <span className="ml-1">{label}</span> : `/${name}`}
      {nsfw && (
        <>
          <CustomIcon src="/logos/18.svg" className="ml-2" innerRef={customIconRef} />
          <UncontrolledTooltip target={customIconRef}>NSFW</UncontrolledTooltip>
        </>
      )}
    </ExternalLink>
  );
};

export const ArtworkCredit = memo(ArtworkCreditComponent);
