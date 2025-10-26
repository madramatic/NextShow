# NextShow

A modern React Native app for discovering, viewing, and booking upcoming movies. Built with Expo, TypeScript, and Clean Architecture for scalability and maintainability.

## Demo Video
[▶ Watch Demo on Google Drive](https://drive.google.com/file/d/1w-CMa1YnOaz3W6X0oHwgZtOaDsAugRQN/view?usp=drive_link)

## Features
- **Upcoming Movies**: Browse a list of upcoming movies (powered by TMDb API)
- **Movie Details**: View detailed info, genres, and trailers
- **Trailer Playback**: Watch trailers in full-screen
- **Seat Mapping**: Interactive seat selection UI (UI only)
- **Search**: Find movies by title
- **Offline-first**: (Optional, recommended)
- **Cross-platform**: Android & iOS support

## Tech Stack
- **React Native** (Expo, TypeScript)
- **Expo Router** (navigation)
- **Redux Toolkit** (state management)
- **Axios** (API communication)
- **Poppins** (custom fonts)

## Architecture
- **Clean Architecture**: Modular, maintainable, and testable codebase
- **src/**
  - `app/`: Navigation, store
  - `core/`: Theme, constants, utilities
  - `data/`: API, DTOs
  - `domain/`: Entities, use cases
  - `repository/`: Data abstraction
  - `presentation/`: UI, screens, components

## Getting Started
1. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```
2. **Start the app**
   ```sh
   npx expo start
   ```
3. **Run on device**
   - Android: `npx expo start --android`
   - iOS: `npx expo start --ios`

## API Key
- Sign up for a free API key at [TMDb](https://www.themoviedb.org/documentation/api)
- Create a `.env` file in the root directory and add your API key and base URL

## Contributing
- Follow Clean Architecture and modular folder structure
- Use TypeScript and Redux Toolkit best practices
- Write clear, concise commit messages (see below)

## Commit Message Guidelines
- follow conventional commit guidelines

## License
This project is for educational and demonstration purposes only.
