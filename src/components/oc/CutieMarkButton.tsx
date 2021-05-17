import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomIcon } from 'components/common/CustomIcon';
import { useTranslation } from 'next-i18next';
import React, { VFC } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { getOcCutieMarkPath } from 'src/util/oc';

interface PropTypes {
  buttonId: string;
}

export const CutieMarkButton: VFC<PropTypes> = ({ buttonId }) => {
  const { t } = useTranslation();
  const fileName = `${PERSONAL_DETAILS.OC_NAME} ${t('oc:detail.cutieMark')}`;
  const cacheBust = 1;
  return (
    <UncontrolledButtonDropdown className="mb-2 mr-md-2">
      <DropdownToggle color="secondary" id={buttonId} caret>
        <CustomIcon src="/logos/disy-cm.svg" className="mr-2" />
        {t('oc:detail.cutieMark')}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem tag="a" href={getOcCutieMarkPath('png', cacheBust)} download={`${fileName}.png`}>
          <FontAwesomeIcon icon="image" fixedWidth />
          &nbsp;
          {t('oc:detail.cutieMarkRaster')}
        </DropdownItem>
        <DropdownItem tag="a" href={getOcCutieMarkPath('svg', cacheBust)} download={`${fileName}.svg`}>
          <FontAwesomeIcon icon="pen-nib" fixedWidth />
          &nbsp;
          {t('oc:detail.cutieMarkVector')}
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};
