# News App (React + TypeScript)

A modern, responsive web application for browsing the latest news, built with React and TypeScript. The app fetches data from the public GNews API and provides users with an intuitive interface to read and manage their news feed.

## Features

* **Latest News:** View top headlines from various sources in a clean, card-based layout.
* **Search:** Filter news articles by keywords in their title and content.
* **Favorites:** Save any article to a personal favorites list for later reading. State is persisted between sessions using local storage.
* **Share:** Quickly share news articles to popular social media platforms (Facebook, Twitter, Telegram, etc.).
* **Responsive Design:** A clean and user-friendly interface that works flawlessly on all devices—from mobile phones to desktop monitors—thanks to Bootstrap.
* Plain `fetch` + `useState`/`useEffect`.

## Tech Stack

* **React 18** + **TypeScript**
* **Vite**
* API: **GNews API** (`gnews.io/api/v4`)

## API

Two endpoints are used:

* `${BASE_URL}/search?q=${searchQuery}&lang=en&country=us&max=10&apikey=${API_KEY}` — for search query
* `${BASE_URL}/top-headlines?category=${categoryName}&lang=en&country=us&max=10&apikey=${API_KEY}` — for category name
