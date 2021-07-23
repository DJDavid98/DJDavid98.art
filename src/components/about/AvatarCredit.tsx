import styles from 'modules/AvatarCredit.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo, VFC } from 'react';
import { GlobalAvatarCredit } from 'src/config';

const AvatarCreditComponent: VFC<Pick<GlobalAvatarCredit, 'name'>> = ({ name }) => {
  const { t } = useTranslation();
  if (!name) return null;
  return (
    <p className={styles.avatarCredit}>
      {`${t('about:avatarBy')}`}
      <Link href="/avatar">
        <a className="ml-1">{name}</a>
      </Link>
    </p>
  );
};

export const AvatarCredit = memo(AvatarCreditComponent);
