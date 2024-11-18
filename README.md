# Todolist Mobile App
# Installations
   - visual studio code
   - nodejs
   - react-native cli
   - Expo go(app on Android or IOS)
   - Android studio(for android), Xcode(for IOS from app store)


# Steps to Create App 
   - Open command prompt and go to the folder where you want your app should be saved on PC.
   - once at desired location type commands as below
   - commands:
      For creating project using react-native commands:
         >> npx react-native init YourProjectName --template react-native-template
         >> cd YourProjectName
         - This command initializes a new React Native project with the specified name.
         On VS Code:
         1. Launch Visual Studio Code (VS Code).
         2. Select File > Open Folder, navigate to your project folder, and open it.
         3. Install the React Native Tools extension in VS Code for a better development experience.
         4. Open App.js and modify the content to display
         
         in terminal type
            >> npx react-native start

         For creating project using Expo commands:
            >> npx create-expo-app YourProjectName --template blank
            >> cd YourProjectName
         follow VS code steps the in terminal type
            >> npx expo start

# Steps to step up Emulator

   For Android Users:
      1. Install Android Studio from the Android Developer Website: https://developer.android.com/studio.
      2. Open Android Studio and navigate to:   Preferences > Appearance & Behavior > System Settings > Android SDK
      3. Enable Recommended SDK Tools under the SDK Tools tab:
         • Android SDK Build-Tools (install the latest version).
         • Android SDK Platform-Tools.
         • Android Emulator.
         • Google Play Services (if your app needs Google services).
   
   For iOS Users:
      • Ensure Xcode is installed from the App Store.
      • Install Xcode Command Line Tools: xcode-select --install

 - After setting up the emulator and starting the Virtual Device on Android Studio
    type on terminal 
      >> npx react-native run-android 
               (or)
      >> npx expo start --android
   
   For Xcode:
      >> npx react-native run-ios
               (or)
      >> npx expo start --ios

# Run Your App on a Mobile Device Using Expo
   	- after installing Expo Go on device and creating project 
            and starting it with expo go commands a QR code is generated
      - just scan the QR code with yooour mobile camera app, 
            this generates a link to open it on Expo go on clicking it takes you to the app you cretaed

# Tasks
  - Marks Completed Tasks
  - Persist Data Using AsyncStorage  
  - Edit Tasks
  - Add Animations
  
