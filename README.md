# React Native Post & Comment Viewer

A React Native application that displays posts and their comments from the JSONPlaceholder API.

## Features

- Fetches and displays all posts
- View comments for a selected post
- Edit comments with API mock updates
- Modern UI design with loading indicators and error handling
- Global state management with Zustand

## Project Structure

```
/src
  /components        # Reusable UI components
  /screens           # App screens
  /services          # API services
  /navigation        # Navigation configuration
  /hooks             # Custom hooks
  store.ts           # Global state management
  types.ts           # TypeScript interfaces
```

## How to Run

1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```
3. Start Metro:
   ```
   yarn start
   ```
4. Run on iOS:
   ```
   yarn ios
   ```
5. Run on Android:
   ```
   yarn android
   ```

## API Endpoints

- List all posts: `GET https://jsonplaceholder.typicode.com/posts`
- Get comments for a post: `GET https://jsonplaceholder.typicode.com/posts/{postId}/comments`
- Update a comment: `PUT https://jsonplaceholder.typicode.com/comments/{commentId}`

## Technologies Used

- React Native
- TypeScript
- React Navigation
- Zustand for state management
- Axios for API requests
