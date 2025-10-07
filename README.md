# قناة الصراط الفضائية - Assirat TV

A modern, responsive website for Assirat TV (قناة الصراط الفضائية), a religious Islamic television channel.

## Features

- **Live Streaming**: Watch live TV stream with HLS support
- **Program Schedule**: Daily program listings with Islamic calendar dates
- **Responsive Design**: Mobile-first design that works on all devices
- **Social Media Integration**: Links to various social media platforms
- **Program Gallery**: Interactive gallery of TV programs and segments
- **Multi-language Support**: Arabic interface with RTL support

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5
- **Libraries**: 
  - Swiper.js for carousels
  - jQuery for DOM manipulation
  - Universal Parallax for scroll effects
  - Custom web player component for video streaming
- **Video Streaming**: HLS (HTTP Live Streaming)

## Project Structure

```
├── assets/
│   ├── css/           # Stylesheets
│   ├── data/          # JSON data files
│   ├── fonts/         # Custom fonts
│   ├── images/        # Images and graphics
│   ├── libs/          # JavaScript libraries
│   └── video/         # Video files
├── index.html         # Main HTML file
├── date.json          # Islamic calendar dates
└── programs2.json     # TV program schedule
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/reranin/hashtag.assirat.git
   ```

2. Open `index.html` in a web browser

3. For development, use a local server to avoid CORS issues:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## Live Streaming

The website includes live streaming functionality using HLS. The stream source is configured in the HTML:
```html
<eyevinn-video source="https://svs.itworkscdn.net/assiratvlive/assirat/playlist.m3u8">
```

## Program Schedule

Program schedules are managed through JSON files:
- `programs2.json`: Contains program names, days, and times
- `date.json`: Contains Islamic calendar date mappings

## Social Media

The website includes links to:
- Twitter: [@tvassirat](https://x.com/tvassirat)
- Instagram: [@assirattv](https://www.instagram.com/assirattv)
- WhatsApp: [assirattv.net/whatsapp](https://assirattv.net/whatsapp)
- Telegram: [@tvassirat](https://t.me/tvassirat)

## Satellite Frequencies

- **Nilesat**: 11603 H (Horizontal)
- **Galaxy 19**: 12177 V (Vertical)

## License

All rights reserved © Assirat TV 2024

## Contact

- Email: info@assirat.com.lb
- Website: [assirat24.com](https://assirat24.com)
