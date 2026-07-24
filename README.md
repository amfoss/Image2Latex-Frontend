# Image to LaTeX Converter (Frontend)

A modern and responsive frontend application for converting images containing mathematical expressions into **LaTeX code**. Built with **React** and **Tailwind CSS**, the application provides a simple interface for uploading images and communicates with a Flask backend that performs OCR-based LaTeX extraction.

---

## Overview

This project serves as the frontend for the Image to LaTeX Converter. Users can upload an image containing mathematical equations, which is then sent to the backend API for processing. The extracted LaTeX code is returned and displayed in the interface.

---

## Features

- Drag-and-drop image upload using `react-dropzone`
- Real-time communication with the backend using Axios
- Responsive user interface built with React and Tailwind CSS
- Clean and minimal design
- Easy integration with the Flask OCR backend

---
## Demo
[demo.webm](https://github.com/user-attachments/assets/4c9b1e7d-1d22-4862-9feb-08200a0dfbcf)


---
## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend Framework | React (Vite) |
| Styling | Tailwind CSS, PostCSS |
| API Communication | Axios |
| File Upload | react-dropzone |

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later)
- npm

### Clone the Repository

```bash
git clone https://github.com/quantam-syntax/Image2Latex-Frontend.git
cd Image2Latex-Frontend
```

### Install Dependencies

```bash
npm install
```

### Configure the Backend

Make sure the Flask backend is running. If necessary, update the backend API URL in the frontend configuration.

Example:

```text
http://localhost:5000/
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Project Structure

```
Image2Latex-Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git add .
git commit -m "feat: describe your changes"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

If you encounter a bug or have a suggestion for improvement, please open an issue with a detailed description.

---

## License

This project is licensed under the MIT License.
