import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { VFC } from 'react';
import { Col, Row } from 'reactstrap';
import { AVATAR_HISTORY } from 'src/config/avatars';
import { AVATAR_IMAGE_SIZE, getAvatarImageUrl } from 'src/util/avatars';

export const AvatarHistoryComponent: VFC<{ selectedIndex: number }> = ({ selectedIndex }) => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t('avatar:history')}</h2>
      <Row>
        {AVATAR_HISTORY.reverse().map((def, i) => (
          <Col key={def.firstUsed} xs={6} s={4} m={3} l={2} xl={1} className={classNames({ 'bg-dark text-white': selectedIndex === i })}>
            <Image
              src={getAvatarImageUrl(def.firstUsed)}
              width={AVATAR_IMAGE_SIZE}
              height={AVATAR_IMAGE_SIZE}
              alt={t('avatar:previousProfilePicture')}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
