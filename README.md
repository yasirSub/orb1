# Orb1

A modern web application for service management built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User Authentication (Admin, Worker, User roles)
- Dark/Light Mode
- Responsive Design
- Service Management
- User Dashboard
- Worker Dashboard
- Admin Dashboard

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yasirSub/orb1.git
```

2. Install dependencies:
```bash
cd orb1
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
/src
  /app
    /admin
    /worker
    /dashboard
    /login
    /signup
  /components
    /layout
    /ui
  /utils
  /styles
```

## Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)