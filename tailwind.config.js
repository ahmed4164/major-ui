const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FFFFFF',
        // Gray Colors
        'gray-dark': '#595959', /* Dark Gray */
        'gray-darker': '#161616', /* Dark Gray */
        'gray-medium': '#999999', /* Medium Gray */
        'gray-light': '#D9D9D9', /* Light Gray */
        'gray-lighter': '#282828', /* Light Gray */
        // Danger Colors
        'danger-light': '#A22020', /* Light Danger */
        'danger-medium': '#BF2626', /* Medium Danger */
        'danger-dark': '#E14747', /* Dark Danger */
        // Primary Colors
        'primary-light': '#003EB3', /* Light Primary */
        'primary-medium': '#0074F0', /* Medium Primary */
        'primary-main': '#14A9FF', /* Main Primary */
        'primary-dark': '#85DCFF', /* Dark Primary */
        // Success Colors
        'success-light': '#199033', /* Light Success */
        'success-medium': '#32A94C', /* Medium Success */
        'success-dark': '#4CC366', /* Dark Success */
        // Custom Colors
        'accent1': '#191B5B', /* Accent Color 1 */
        'custom-primary1': '#C9B8F9', /* Primary Color 1 */
        'custom-primary2': '#A193C7', /* Primary Color 2 */
        'secondary1': '#F1DDD9', /* Secondary Color 1 */
        'neutral-dark': '#07081D', /* Dark Neutral */
        'neutral-light': '#FFFFFF', /* Light Neutral */
        // Add more colors as needed
      },
      spacing: {
        // Sizes
        'large': '144px', /* Large Size */
        'medium': '96px', /* Medium Size */
        'small': '48px', /* Small Size */
        'xlarge': '192px', /* Extra Large Size */
        'xsmall': '16px', /* Extra Small Size */
        'xxlarge': '288px', /* Double Extra Large Size */
        'maxwidth': '1400px', /* Maximum Width */
        // Spacing
        'unit': '16px', /* Basic Spacing Unit */
        'halfunit': '8px', /* Half of Basic Spacing Unit */
        'oneandhalfunits': '24px', /* One and a Half Basic Spacing Units */
        'twounits': '32px', /* Two Basic Spacing Units */
        'threeunits': '48px', /* Three Basic Spacing Units */
        'fourunits': '64px', /* Four Basic Spacing Units */
        'fiveunits': '80px', /* Five Basic Spacing Units */
        'sixunits': '96px', /* Six Basic Spacing Units */
        // Add more spacing as needed
      },
      borderRadius: {
        // Border Radius
        'round': '50%', /* Circular Border Radius */
        'radius2': '2px', /* Small Border Radius */
        'radius4': '4px', /* Medium Border Radius */
        'radius8': '8px', /* Large Border Radius */
        // Add more border radius as needed
      },
      // Add more theme extensions if needed
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
