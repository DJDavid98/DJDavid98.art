import { CardCopyButton } from 'components/common/CardCopyButton';
import { FC } from 'react';
import { ContactCardProps, DiscordContactCardProps } from 'src/config';
import { ContactCard } from './ContactCard';

export const DiscordContactCard: FC<ContactCardProps<DiscordContactCardProps>> = (props) => {
  const { discordTag, ...rest } = props;

  return (
    <ContactCard wrapInLink={false} {...rest}>
      <CardCopyButton id="copy-discord-tag" copyValue={discordTag} />
    </ContactCard>
  );
};
