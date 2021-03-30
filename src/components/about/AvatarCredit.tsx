import { ArtworkCredit } from 'components/oc';
import { useTranslation } from 'next-i18next';
import { memo, VFC } from 'react';

const AvatarCreditComponent: VFC<{ name: string; url: string }> = memo((props) => {
  const { t } = useTranslation();
  return (
    <p className="px-3 text-center">
      <small className="d-block text-muted mt-2">
        {`${t('about:avatarBy')}`}
        <ArtworkCredit {...props} className="ml-1" spacingClass={null} />
      </small>
    </p>
  );
});

export const AvatarCredit = AvatarCreditComponent;
