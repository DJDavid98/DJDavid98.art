import { ArtworkCredit } from 'components/oc';
import styles from 'modules/AvatarCredit.module.scss';
import { useTranslation } from 'next-i18next';
import { memo, VFC } from 'react';
import { AvatarCreditProps } from 'src/config';

const AvatarCreditComponent: VFC<AvatarCreditProps> = (props) => {
  const { t } = useTranslation();
  return (
    <p className={styles.avatarCredit}>
      {`${t('about:avatarBy')}`}
      <ArtworkCredit {...props} className="ml-1" spacingClass={false} />
    </p>
  );
};

export const AvatarCredit = memo(AvatarCreditComponent);
