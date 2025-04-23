# Voicello Widget

A lightweight, embeddable video conferencing widget powered by LiveKit.

## Features

- Easy integration with any website
- Customizable positioning and theme
- Responsive design
- Built with React and LiveKit for reliable video conferencing

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

## Live Demo

Try the widget: [https://nimble-sawine-d560b1.netlify.app/widget/demo.html](https://nimble-sawine-d560b1.netlify.app/widget/demo.html)

## Development

This widget is part of the Voicello project. For development:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Access the widget demo at `http://localhost:3000/widget/demo.html`

For more details, see the [Embed Guide](./EMBED_GUIDE.md). 