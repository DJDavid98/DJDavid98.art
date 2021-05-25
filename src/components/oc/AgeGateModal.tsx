import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthOptions } from 'components/oc/MonthOptions';
import { getDate, getMonth, getYear } from 'date-fns';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, ChangeEventHandler, FormEventHandler, useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';
import {
  Alert,
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import {
  AGE_GATE_KEY,
  constructDate,
  getAgeGateValue,
  isOldEnoughForNsfw,
  isValidDate,
  MINIMUM_SENSIBLE_YEAR,
  setAgeGateValue,
} from 'src/util/oc';

interface PropTypes {
  visible: boolean;
  close: VoidFunction;
  verify: (value: boolean) => void;
}

const FORM_ID = 'age-gate-form';

const getInputValueAsNumber = (e: ChangeEvent): number => parseInt((e.target as HTMLInputElement).value, 10);
const getInputChecked = (e: ChangeEvent): boolean => (e.target as HTMLInputElement).checked;
const getInitialDateComponents = (initialDate: Date | undefined): [number, number, number] => {
  const localInitialDate = initialDate || new Date();
  return [getDate(localInitialDate), getMonth(localInitialDate) + 1, getYear(localInitialDate)];
};

export const AgeGateModal: VFC<PropTypes> = ({ visible, close, verify }) => {
  const { t, i18n } = useTranslation();
  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [initialDay, initialMonth, initialYear] = useMemo(() => getInitialDateComponents(initialDate), [initialDate]);
  const [day, setDay] = useState<number>(initialDay);
  const [month, setMonth] = useState<number>(initialMonth);
  const [year, setYear] = useState<number>(initialYear);
  const [remember, setRemember] = useState<boolean>(true);
  const isEnteredDateValid = useMemo(() => isValidDate(year, month, day), [day, month, year]);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const handleYearChange: ChangeEventHandler = useCallback((e) => setYear(getInputValueAsNumber(e)), []);
  const handleMonthChange: ChangeEventHandler = useCallback((e) => setMonth(getInputValueAsNumber(e)), []);
  const handleDayChange: ChangeEventHandler = useCallback((e) => setDay(getInputValueAsNumber(e)), []);
  const handleRememberChange: ChangeEventHandler = useCallback((e) => setRemember(getInputChecked(e)), []);
  const handleVerification = useCallback(
    (date: Date) => {
      setAgeGateValue(date, remember);
      setInitialDate(date);
      const oldEnough = isOldEnoughForNsfw(date);
      verify(oldEnough);
    },
    [remember, verify],
  );
  const handleSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      const constructedDate = constructDate(year, month, day);
      handleVerification(constructedDate);
      close();
    },
    [close, day, handleVerification, month, year],
  );
  const focusYearInput = useCallback(() => {
    if (yearInputRef.current) yearInputRef.current.focus();
  }, []);

  useEffect(() => {
    // Must be done on client side to avoid localStorage is undefined error
    setInitialDate(getAgeGateValue());
  }, []);

  useEffect(() => {
    const storageListener = (e: StorageEvent) => {
      if (e.key !== AGE_GATE_KEY) return;

      handleVerification(getAgeGateValue());
    };

    window.addEventListener('storage', storageListener);
    return () => window.removeEventListener('storage', storageListener);
  }, [handleVerification]);

  useEffect(() => {
    const [newInitialDay, newInitialMonth, newInitialYear] = getInitialDateComponents(initialDate);
    setDay(newInitialDay);
    setMonth(newInitialMonth);
    setYear(newInitialYear);
  }, [initialDate]);

  return (
    <Modal isOpen={visible} toggle={close} onOpened={focusYearInput}>
      <ModalHeader className="bg-dark text-light border-0">{t('oc:ageGate.title')}</ModalHeader>
      <ModalBody className="bg-dark text-light border-0 py-0">
        <Alert color="warning" fade={false}>
          <FontAwesomeIcon icon="exclamation-triangle" className="mr-2" />
          {t('oc:ageGate.explanation')}
        </Alert>
        <Form id={FORM_ID} onSubmit={handleSubmit}>
          <Row form>
            <Col md={3} tag={FormGroup}>
              <Label for="age-gate-year">{t('oc:ageGate.year')}</Label>
              <Input
                id="age-gate-year"
                type="number"
                value={year}
                min={MINIMUM_SENSIBLE_YEAR}
                invalid={!isEnteredDateValid}
                onChange={handleYearChange}
                innerRef={yearInputRef}
              />
            </Col>
            <Col md={6} tag={FormGroup}>
              <Label for="age-gate-month">{t('oc:ageGate.month')}</Label>
              <CustomInput id="age-gate-month" type="select" value={month} invalid={!isEnteredDateValid} onChange={handleMonthChange}>
                <MonthOptions language={i18n.language} />
              </CustomInput>
            </Col>
            <Col md={3} tag={FormGroup}>
              <Label for="age-gate-day">{t('oc:ageGate.day')}</Label>
              <Input
                id="age-gate-day"
                type="number"
                value={day}
                min={1}
                max={31}
                invalid={!isEnteredDateValid}
                onChange={handleDayChange}
              />
            </Col>
          </Row>
          {!isEnteredDateValid && (
            <Alert color="danger" fade={false} className="text-center p-2">
              {t('oc:ageGate.invalidDate')}
            </Alert>
          )}
          <FormGroup>
            <CustomInput
              type="checkbox"
              id="age-gate-remember"
              label={t('oc:ageGate.remember')}
              checked={remember}
              onChange={handleRememberChange}
            />
          </FormGroup>
          <Alert color="info" className="p-2 mb-0">
            <FontAwesomeIcon icon="lock" className="mr-2" />
            {t('oc:ageGate.storageNotice')}
          </Alert>
        </Form>
      </ModalBody>
      <ModalFooter className="bg-dark text-light border-0 d-flex justify-content-between">
        <Button color="warning" outline form={FORM_ID} disabled={!isEnteredDateValid}>
          {t('oc:ageGate.verify')}
        </Button>
        <Button onClick={close} size="lg">
          {t('oc:ageGate.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
