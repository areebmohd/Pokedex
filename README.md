# 🧬 Pokédex App

A **mobile + web Pokédex application** built with **Expo, React Native, and TypeScript**. This project lets users browse and explore Pokémon characters, with clean UI design and an extendable architecture.

> 📱 Use this Pokédex as a reference or starter project for building a Pokemon info app on **iOS, Android, and the Web** using the **Expo framework**.

---

## 🚀 Features

✨ Cross-platform (iOS, Android & Web) using **Expo**
✨ TypeScript support for type safety
✨ Browse Pokémon data (can be powered by a local dataset **or** the **PokeAPI**)
✨ Modular and extensible app structure
✨ Ready for animations and additional features like search & favorites

---

## 📦 Tech Stack

| Technology                 | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| **Expo**                   | React Native framework for cross-platform apps |
| **React Native**           | UI Components                                  |
| **TypeScript**             | Static type-checking                           |
| **JavaScript / TSX**       | App logic                                      |
| **Assets (Images, Icons)** | Pokémon visuals                                |

---

## 📁 Project Structure

```
/
├── .vscode/                 # VSCode config
├── app/                     # Main Expo app code
│   ├── components/          # Reusable UI components
│   ├── screens/             # App screens (Home, Details, etc.)
│   ├── navigation/          # Navigation stack
│   └── utils/               # Helpers & API utilities
├── assets/                  # Images, icons, fonts
├── .gitignore
├── app.json                 # Expo config
├── eas.json                 # Expo Application Services config
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript config
└── README.md
```

---

## 🛠 Getting Started

Follow these instructions to run the **Pokédex app** on your machine:

### 1. Install Dependencies

```bash
git clone https://github.com/areebmohd/Pokedex.git
cd Pokedex
npm install
```

or if you use **Yarn**

```bash
yarn
```

### 2. Run Expo

Start the development server:

```bash
npx expo start
```

This will open the Expo Dev Tools in your browser.

### 3. Open the App

You can now run the app on:

* 📱 **iOS Simulator** (if available)
* 📱 **Android Emulator**
* 📲 **Physical device** (via Expo Go app)
* 🌐 **Web browser**

---

## 🧠 How It Works

This app is structured as an **Expo React Native project**:

* UI built using **React components**
* Navigation managed via **React Navigation** (if configured)
* Pokémon data can be fetched from **PokeAPI** (free Pokémon REST API) or preloaded
* Supports TypeScript for robust and maintainable code

*(Typical Pokédex projects integrate with `https://pokeapi.co/` for fetching Pokémon details and stats.)* ([GitHub][2])

---

## 📌 Recommended Enhancements

Here are common ways to extend this Pokédex app:

🔹 Add **search functionality** (search by name/ID)
🔹 Implement **favorites** using AsyncStorage
🔹 Detail screens with stats, types, and evolution chain
🔹 Add **filtering** by type or generation
🔹 Offline caching of Pokémon data

---

## 🎨 Example Screens (Optional)

You can include screenshots such as:

* Home screen (Pokémon list)
* Pokémon detail view
* Search UI

---

## ⚡ Deployment

You can build standalone apps using **Expo Application Services (EAS)**:

```bash
npx eas build --platform android
npx eas build --platform ios
```

Or deploy web version:

```bash
npx expo publish
```

---

## 🤝 Contributing

Contributions are welcome!
To contribute:

1. Fork this repository
2. Create a new branch (`feature/...`)
3. Add your enhancements
4. Create a Pull Request

