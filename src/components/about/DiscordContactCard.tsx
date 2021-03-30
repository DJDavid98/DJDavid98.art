import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { ContactCardProps, DiscordContactCardProps } from 'src/config';
import { ContactCard } from './ContactCard';

enum CopyStatus {
  INFO,
  COPIED,
}

const COPY_BUTTON_ID = 'copy-discord-tag';

export const DiscordContactCard: React.FC<ContactCardProps<DiscordContactCardProps>> = (props) => {
  const { t } = useTranslation();
  const { discordTag, ...rest } = props;

  const [copyStatus, setCopyStatus] = useState(CopyStatus.INFO);

  const handleCopy = () => {
    copyToClipboard(discordTag);
    setCopyStatus(CopyStatus.COPIED);
  };

  const copyMessage = useMemo<string>(() => {
    switch (copyStatus) {
      case CopyStatus.INFO:
        return t(`about:contact.copyStatus.info`);
      case CopyStatus.COPIED:
        return t(`about:contact.copyStatus.copied`);
      default:
        return '';
    }
  }, [copyStatus, t]);

  return (
    <ContactCard wrapInLink={false} {...rest}>
      <Button id={COPY_BUTTON_ID} color="link" onClick={handleCopy} onMouseLeave={() => setCopyStatus(CopyStatus.INFO)}>
        <FontAwesomeIcon icon="clipboard" className="mr-2" />
        {discordTag}
      </Button>
      <UncontrolledTooltip placement="bottom" target={COPY_BUTTON_ID} fade={false}>
        {copyMessage}
      </UncontrolledTooltip>
    </ContactCard>
  );
};
