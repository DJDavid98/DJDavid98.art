import { VFC } from 'react';
import { Button } from 'reactstrap';
import { ContactCardProps, EmailContactCardProps } from 'src/config';
import { ContactCard } from './ContactCard';

export const EmailContactCard: VFC<ContactCardProps<EmailContactCardProps>> = (props) => {
  const { email, ...rest } = props;
  return (
    <ContactCard {...rest}>
      <Button color="link">{email}</Button>
    </ContactCard>
  );
};
