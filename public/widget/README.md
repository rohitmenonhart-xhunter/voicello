# Voicello Widget

A floating embeddable video conferencing widget that can be added to any website.

## How to Use

### Basic Integration

Add the embed script to your website by including this code before the closing `</body>` tag:

```html
<!-- Add the widget script -->
<script src="https://your-voicello-domain.com/widget/embed.js"></script>

<!-- Initialize with custom options -->
<script>
  window.addEventListener('load', function() {
    VoicelloWidget.init({
      position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
      theme: 'light' // light, dark
    });
  });
</script>
```

Replace `https://your-voicello-domain.com` with your actual deployed Voicello URL.

### Auto-Initialization with Data Attributes

Alternatively, you can use data attributes for automatic initialization:

```html
<!-- Add data attributes for auto-initialization -->
<div data-voicello-widget
     data-position="bottom-right"
     data-theme="light"></div>

<!-- Add the widget script -->
<script src="https://your-voicello-domain.com/widget/embed.js"></script>
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| position | bottom-right | Position of the widget button (bottom-right, bottom-left, top-right, top-left) |
| theme | light | Widget theme (light, dark) |
| widgetUrl | Current domain + /widget | URL to the widget page |

## Demo

A demo page is available at `/widget/demo.html` on your Voicello deployment. This page demonstrates the widget in action and shows how to embed it on your own site.

## Features

- Floating button that can be positioned in any corner of your website
- Expands to a video conferencing interface when clicked
- Uses LiveKit for high-quality, scalable video conferencing
- Easy to integrate into any website with minimal code
- Customizable appearance with theming options

## Development

The widget consists of:

1. A client-side JavaScript file (`/widget/embed.js`) that creates an iframe and handles UI interactions
2. Next.js pages that render the video conferencing interface
3. Integration with LiveKit for video conferencing functionality

To modify the widget, edit the files in:
- `/app/widget/` - The widget React components
- `/public/widget/` - The embed script and demo page 