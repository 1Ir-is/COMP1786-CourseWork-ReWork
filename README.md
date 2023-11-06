# COMP1786 - CourseWork: M-Hike Hiker Management App (React Native Version)

M-Hike is a mobile application designed for hikers to effectively plan, document, and manage details of their hikes. Built using React Native, this app provides users with an intuitive interface and several functionalities to record and store for their hike information.

## Application Description

### Features
- **Add Hike Details**: Users can input and store comprehensive information about their hikes, including the hike's name, location, date, parking availability, length, weather, time start, difficulty level, and a descriptive overview.
- **Store, View, and Delete Hike Details**: All hike details are stored in an SQLite database, enabling users to view and manage the information.
- **Delete All**: Users have the option to delete all stored hike information in a single action.

### Usage Guide
1. **Add Hike Details**: Input specific hike details through a user-friendly interface by providing necessary information like the hike's name, location, date, and other relevant details.
2. **Store Information**: Save the hike details in the device's SQLite database for future reference and easy access.
3. **View All Hike Details**: Explore a list or detailed view of the stored hikes to obtain comprehensive information.
4. **Modify or Delete Hike Details**: Edit or delete stored information about hikes, providing users with flexibility to manage their data effectively.
5. **Delete All**: Remove all stored hike information at once.

### Note
- The application stores detailed information on the device within an SQLite database.

## Getting Started

### Installation and Setup
1. **Clone the Repository**: Clone this repository to your local machine.
2. **Navigate to the Project Directory**: Open your terminal and go to the project directory.
3. **Install Dependencies**: Run `npm i` to install all necessary project dependencies.

### Running the Application
1. **Start the Metro Bundler**: Execute `npx expo start` to initiate the Metro Bundler.
2. **Running on Device or Emulator**: Use your preferred method to run the application.

## Resolving Dependency Compatibility Issues

In case you encounter the problems like this when run the application.

![image](https://github.com/1Ir-is/COMP1786-CourseWork-ReWork/assets/93533202/2bf66249-5b35-4ba1-8946-931833fbdbf5)

This discrepancy may result in your project not working correctly due to the potential conflicts or differences in the functionality provided by these dependencies.
To resolve this issue, you can utilize this command below to ensure that the correct versions of these dependencies are installed in your project.
```
npx expo install @react-native-picker/picker@2.4.10 expo-sqlite@~11.3.3 react-native-gesture-handler@~2.12.0 react-native-reanimated@~3.3.0 react-native-screens@~3.22.0
```
## Contributing
I welcome contributions in the form of:
- Reporting issues
- Suggesting enhancements
- Opening pull requests

### Java Android Version
For those interested in the Java Android version of M-Hike, visit [COMP1786 - CourseWork](https://github.com/1Ir-is/COMP1786-CourseWork) repository to explore the original implementation.

## Credits
This React Native version of the app is developed by 1Ir-is (Huynh Minh Huy) - TCD0702 - 001353732.
