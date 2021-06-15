import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Image from 'next/image';
import { ExternalLink, ExternalLinkProps } from 'components/common/ExternalLink';
import styles from 'modules/ArtworkCredit.module.scss';
import React, { memo, useMemo, VFC } from 'react';
import { AvatarCreditProps } from 'src/config';
import { resolveSocialIconStyle } from 'src/util/resolve-social-icon-style';

interface PropTypes extends AvatarCreditProps, Pick<ExternalLinkProps, 'className' | 'tag'> {
  spacingClass?: null | 'mr-1' | 'mr-2' | 'mr-3' | 'mr-4' | 'mr-5';
}

const ArtworkCreditComponent: VFC<PropTypes> = ({ url, name, className, spacingClass = 'mr-1', tag }) => {
  const { colorClass, ...restProps } = useMemo(() => resolveSocialIconStyle(url), [url]);
  return (
    <ExternalLink tag={tag} href={url} className={className}>
      {'brandIcon' in restProps && <FontAwesomeIcon icon={['fab', restProps.brandIcon]} className={classNames(spacingClass, colorClass)} />}
      {'brandLogo' in restProps && (
        <span className={classNames(styles.brandLogo, spacingClass)}>
          <Image
            src={restProps.brandLogo}
            alt="website logo"
            width={restProps.logoWidth}
            height={restProps.logoHeight}
            layout="responsive"
          />
        </span>
      )}
      {`/${name}`}
    </ExternalLink>
  );
};

export const ArtworkCredit = memo(ArtworkCreditComponent);
