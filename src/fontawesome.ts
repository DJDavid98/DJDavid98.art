import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faDeviantart,
  faDiscord,
  faFacebookSquare,
  faGithub,
  faGuilded,
  faMastodon,
  faOsi,
  faPatreon,
  faPlaystation,
  faSoundcloud,
  faSpotify,
  faSteam,
  faSteamSymbol,
  faTelegramPlane,
  faTwitter,
  faVk,
  faXbox,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faClipboard,
  faClock,
  faDog,
  faDownload,
  faExclamationTriangle,
  faExternalLink,
  faFileDownload,
  faGlobe,
  faHeart,
  faHistory,
  faHome,
  faHorse,
  faHorseHead,
  faIdCard,
  faImage,
  faImages,
  faLeaf,
  faLink,
  faLock,
  faMars,
  faPaintBrush,
  faPalette,
  faPaw,
  faPenNib,
  faPenToSquare,
  faPerson,
  faPlayCircle,
  faShieldAlt,
  faShirt,
  faSpinner,
  faStar,
  faTimes,
  faTrash,
  faUser,
  faUserPlus,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's being imported
config.autoAddCss = false;

const brandIcons = [
  faDeviantart,
  faDiscord,
  faFacebookSquare,
  faGithub,
  faGuilded,
  faMastodon,
  faOsi,
  faPatreon,
  faPlaystation,
  faSoundcloud,
  faSpotify,
  faSteam,
  faSteamSymbol,
  faTelegramPlane,
  faTwitter,
  faVk,
  faXbox,
  faYoutube,
];

// List of used icons - amend if new icons are needed
library.add(
  ...brandIcons,
  faPaw,
  faDog,
  faLeaf,
  faLock,
  faUser,
  faStar,
  faHome,
  faLink,
  faMars,
  faClock,
  faHorse,
  faGlobe,
  faHeart,
  faImage,
  faTimes,
  faVenus,
  faTrash,
  faUsers,
  faShirt,
  faIdCard,
  faPenNib,
  faPerson,
  faImages,
  faPalette,
  faSpinner,
  faHistory,
  faDownload,
  faUserPlus,
  faClipboard,
  faHorseHead,
  faShieldAlt,
  faArrowRight,
  faPlayCircle,
  faPaintBrush,
  faPenToSquare,
  faExternalLink,
  faFileDownload,
  faExclamationTriangle,
);
