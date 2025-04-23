# Voicello Widget Embed Guide

This guide explains how to embed the Voicello video conferencing widget on your website.

## Basic Integration

Add this script to your website:

```html
<script src="https://nimble-sawine-d560b1.netlify.app/widget/embed.js"></script>
```

And initialize it:

```javascript
window.addEventListener('load', function() {
  VoicelloWidget.init({
    position: 'bottom-right',
    theme: 'light'
  });
});
```

## Auto-Initialization

You can also initialize the widget using data attributes:

```html
<div data-voicello-widget data-position="bottom-right" data-theme="light"></div>
<script src="https://nimble-sawine-d560b1.netlify.app/widget/embed.js"></script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| position | string | 'bottom-right' | Position of the widget button ('bottom-right', 'bottom-left', 'top-right', 'top-left') |
| theme | string | 'light' | Widget theme ('light', 'dark') |
| widgetUrl | string | https://nimble-sawine-d560b1.netlify.app/widget | URL to the widget page |
| roomName | string | random | Custom room name for the meeting |

## Custom Room Setup

If you want to use your own room name instead of a randomly generated one:

```javascript
VoicelloWidget.init({
  position: 'bottom-right',
  theme: 'light',
  roomName: 'my-custom-room',
  widgetUrl: 'https://nimble-sawine-d560b1.netlify.app/widget'
});
```

## API Methods

Once initialized, you can control the widget programmatically:

```javascript
// Open the widget
VoicelloWidget.open();

// Close the widget
VoicelloWidget.close();

// Toggle widget state
VoicelloWidget.toggle();

// Check if widget is open
const isOpen = VoicelloWidget.isOpen();
```

## Complete Example

Here's a complete example of embedding the Voicello widget in your HTML document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website with Voicello</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>Click the widget button in the corner to start a video call!</p>
  
  <!-- Voicello Widget Integration -->
  <script src="https://nimble-sawine-d560b1.netlify.app/widget/embed.js"></script>
  <script>
    window.addEventListener('load', function() {
      VoicelloWidget.init({
        position: 'bottom-right',
        theme: 'dark',
        roomName: 'my-website-room'
      });
    });
  </script>
</body>
</html>
```

## Troubleshooting

If you encounter any issues:

1. Make sure the script URL is correct (https://nimble-sawine-d560b1.netlify.app/widget/embed.js)
2. Check browser console for any JavaScript errors
3. Verify that the initialization code runs after the page has loaded
4. Ensure your website allows iframe embedding 