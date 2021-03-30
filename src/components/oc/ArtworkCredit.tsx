import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ExternalLink, ExternalLinkProps } from 'components/common/ExternalLink';
import styles from 'modules/ArtworkCredit.module.scss';
import React, { memo, useMemo, VFC } from 'react';
import { resolveSocialIconStyle } from 'src/util/resolve-social-icon-style';

interface PropTypes extends Pick<ExternalLinkProps, 'className' | 'tag'> {
  url: string;
  name: string;
  spacingClass?: null | 'mr-1' | 'mr-2' | 'mr-3' | 'mr-4' | 'mr-5';
}

export const ArtworkCredit: VFC<PropTypes> = memo(({ url, name, className, spacingClass = 'mr-1', tag }) => {
  const { colorClass, brandIcon, brandLogo } = useMemo(() => resolveSocialIconStyle(url), [url]);
  return (
    <ExternalLink tag={tag} href={url} className={className}>
      {brandIcon && <FontAwesomeIcon icon={['fab', brandIcon]} className={classNames(spacingClass, colorClass)} />}
      {brandLogo && <img src={brandLogo} className={classNames(styles.brandLogo, spacingClass)} alt="website logo" />}
      {`/${name}`}
    </ExternalLink>
  );
});
