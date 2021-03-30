declare module 'react-scrollchor' {
  export interface ScrollchorProps {
    /**
     * id attribute of the target DOM node
     * - `#` can be omitted
     * - let it blank, `to = ''`, for scroll to page top
     * - this prop is required
     */
    to: PropTypes.string.isRequired;

    /**
     * id attribute of the scrollable DOM node
     * - `#` can be omitted
     * - uses the root element of the document if omitted
     */
    target?: string;

    /**
     * scroll smooth animation can be customized
     * Accepted options, Ex: (default)
     *  { offset: 0, duration: 400, easing: 'easeOutQuad' }
     */
    animate?: { offset?: number; duration?: number; easing?: unknown };

    /**
     * callback function triggered before scroll to #hash
     * @param1 Received click event
     */
    beforeAnimate?: (e: MouseEvent) => void;

    /**
     * callback function triggered after scroll to #hash
     */
    afterAnimate?: (e: MouseEvent) => void;

    /**
     * enable/disable update browser history with scroll behaviours
     * Default to `false`
     */
    disableHistory?: boolean;
  }

  const Scrollchor: React.FC<ScrollchorProps>;
  export default Scrollchor;
}
