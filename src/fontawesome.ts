import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faBirthdayCake,
  faClipboard,
  faCompactDisc,
  faDownload,
  faExclamationTriangle,
  faGlobe,
  faHorseHead,
  faIdCard,
  faImage,
  faLeaf,
  faLock,
  faPaintBrush,
  faPalette,
  faPaw,
  faPenNib,
  faShieldAlt,
  faTimes,
  faUser,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's being imported
config.autoAddCss = false;

// List of used icons - amend if new icons are needed
library.add(
  fab,
  faGlobe,
  faCompactDisc,
  faPalette,
  faArrowRight,
  faImage,
  faPenNib,
  faClipboard,
  faUser,
  faBirthdayCake,
  faShieldAlt,
  faDownload,
  faVenus,
  faHorseHead,
  faPaw,
  faPaintBrush,
  faIdCard,
  faLeaf,
  faLock,
  faExclamationTriangle,
  faTimes,
);
