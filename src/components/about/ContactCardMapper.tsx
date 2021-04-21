import { FC } from 'react';
import { Col } from 'reactstrap';
import { ContactCardSettings } from 'src/config';
import { ContactCard } from './ContactCard';
import { DiscordContactCard } from './DiscordContactCard';
import { EmailContactCard } from './EmailContactCard';

interface PropTypes {
  data: ContactCardSettings[];
}

export const ContactCardMapper: FC<PropTypes> = ({ data }) => {
  const colProps = {
    xs: 12,
    md: 6,
    lg: 'auto',
    className: 'justify-content-between flex-grow-1 contact-card-wrapper',
  };
  return (
    <>
      {data.map((el) => {
        if ('discordTag' in el) {
          return (
            <Col key={el.id} {...colProps}>
              <DiscordContactCard {...el} />
            </Col>
          );
        }
        if ('email' in el) {
          return (
            <Col key={el.id} {...colProps}>
              <EmailContactCard {...el} />
            </Col>
          );
        }
        return (
          <Col key={el.id} {...colProps}>
            <ContactCard {...el} />
          </Col>
        );
      })}
    </>
  );
};
