import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import copyToClipboard from 'copy-to-clipboard';
import { TFunction, useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';

enum CopyStatus {
  INFO,
  COPIED,
}

const CopyMessage: VFC<{ status?: CopyStatus; t: TFunction; update: VoidFunction }> = ({ status, t, update }) => {
  const text = useMemo(() => {
    switch (status) {
      case CopyStatus.INFO:
        return t(`about:contact.copyStatus.info`);
      case CopyStatus.COPIED:
        return t(`about:contact.copyStatus.copied`);
      default:
        return '';
    }
  }, [status, t]);

  useEffect(() => {
    update();
  }, [text, update]);

  return <>{text}</>;
};

export const CardCopyButton: FC<{ copyValue: string; id: string }> = ({ children, copyValue, id }) => {
  const { t } = useTranslation();

  const [copyStatus, setCopyStatus] = useState(CopyStatus.INFO);

  const handleCopy = useCallback(() => {
    copyToClipboard(copyValue);
    setCopyStatus(CopyStatus.COPIED);
  }, [copyValue]);

  const handleMouseLeave = useCallback(() => {
    setCopyStatus(CopyStatus.INFO);
  }, []);

  return (
    <>
      <Button id={id} color="link" onClick={handleCopy} onMouseLeave={handleMouseLeave}>
        <FontAwesomeIcon icon="clipboard" className="mr-2" />
        {children || copyValue}
      </Button>
      <UncontrolledTooltip placement="bottom" target={id} fade={false}>
        {({ scheduleUpdate }) => <CopyMessage update={scheduleUpdate} t={t} status={copyStatus} />}
      </UncontrolledTooltip>
    </>
  );
};
