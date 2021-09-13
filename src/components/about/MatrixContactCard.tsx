import { CardCopyButton } from 'components/common/CardCopyButton';
import { ExternalLink } from 'components/common/ExternalLink';
import { FC, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { ContactCardProps, MatrixContactCardProps } from 'src/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactCard } from './ContactCard';

const INVITE_BUTTON_ID = 'matrix-invite';

export const MatrixContactCard: FC<ContactCardProps<MatrixContactCardProps>> = (props) => {
  const { t } = useTranslation();
  const { matrixUsername, ...rest } = props;

  const [namePart, domainPart] = useMemo(() => matrixUsername.split(/(?=:)/), [matrixUsername]);

  return (
    <ContactCard wrapInLink={false} {...rest}>
      <CardCopyButton id="copy-matrix-username" copyValue={matrixUsername}>
        {namePart}
        <small className="opacity-50">{domainPart}</small>
      </CardCopyButton>
      <Button id={INVITE_BUTTON_ID} tag={ExternalLink} color="link" href={rest.url}>
        <FontAwesomeIcon icon="user-plus" />
      </Button>
      <UncontrolledTooltip placement="bottom" target={INVITE_BUTTON_ID} fade={false}>
        {t('about:contact.invite')}
      </UncontrolledTooltip>
    </ContactCard>
  );
};
