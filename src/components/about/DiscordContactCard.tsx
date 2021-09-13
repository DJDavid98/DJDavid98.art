import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExternalLink } from 'components/common/ExternalLink';
import { CardCopyButton } from 'components/common/CardCopyButton';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { ContactCardProps, DiscordContactCardProps } from 'src/config';
import { ContactCard } from './ContactCard';

const INVITE_BUTTON_ID = 'discord-invite';

export const DiscordContactCard: FC<ContactCardProps<DiscordContactCardProps>> = (props) => {
  const { t } = useTranslation();
  const { discordTag, ...rest } = props;

  return (
    <ContactCard wrapInLink={false} {...rest}>
      <CardCopyButton id="copy-discord-tag" copyValue={discordTag} />
      <Button id={INVITE_BUTTON_ID} tag={ExternalLink} color="link" href={rest.url}>
        <FontAwesomeIcon icon="users" />
      </Button>
      <UncontrolledTooltip placement="bottom" target={INVITE_BUTTON_ID} fade={false}>
        {t('about:contact.joinServer')}
      </UncontrolledTooltip>
    </ContactCard>
  );
};
