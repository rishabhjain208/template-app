# Template App

A Node.js Express application to **export, import, and fill templates** with images and text boxes. This project allows you to manage template JSON files and dynamically populate them with custom data.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [License](#license)

---

## Features

- Export templates with multiple text boxes and images.
- Import existing templates by name.
- Fill templates dynamically with custom text and image replacements.
- Handle invalid routes gracefully.

---

## Project Structure

```

template-app/
├── controllers/
│   └── templateController.js
├── routes/
│   └── templateRoutes.js
├── templates/
│   └── birthdayCard.json
├── uploads/
├── server.js
├── package.json
├── package-lock.json
└── .gitignore

````

---

## Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/template-app.git](https://github.com/your-username/template-app.git)
    cd template-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```
    Or, if you have `nodemon` installed for auto-reloading:
    ```bash
    npm run dev
    ```
    The server will be running at `http://localhost:3000`.

---

## Usage

You can interact with the application through its API endpoints. Use a tool like Postman or `curl` to send requests.

-   **Export a new template:** Use the `/api/templates/export-template` endpoint.
-   **Retrieve an existing template:** Use the `/api/templates/import-template/:templateName` endpoint.
-   **Populate a template with data:** Use the `/api/templates/fill-template` endpoint.

---

## API Endpoints

### 1. Export Template

Exports a new template by creating a JSON file and saving associated images.

-   **URL:** `/api/templates/export-template`
-   **Method:** `POST`
-   **Request Type:** `multipart/form-data`
-   **Form Fields:**
    -   `templateName` (string): The name for the new template (e.g., `"birthdayCard"`).
    -   `textBoxes` (stringified JSON): A JSON string representing the text box configuration (e.g., `"[{\"id\":1,\"value\":\"\"}]"`).
    -   `images` (file): One or more image files to be included in the template.
-   **Success Response (201):**
    ```json
    {
      "status": "success",
      "message": "Template exported successfully",
      "templatePath": "templates/birthdayCard.json"
    }
    ```

### 2. Import Template

Retrieves the JSON data for an existing template.

-   **URL:** `/api/templates/import-template/:templateName`
-   **Method:** `GET`
-   **URL Parameters:**
    -   `templateName` (string): The name of the template to import.
-   **Success Response (200):**
    ```json
    {
      "status": "success",
      "message": "Template imported successfully",
      "template": {
        "textBoxes": [
          {
            "id": 1,
            "value": ""
          }
        ],
        "images": [
          "uploads/image1.jpg"
        ]
      }
    }
    ```

### 3. Fill Template

Fills an existing template with provided text values and replaces its images.

-   **URL:** `/api/templates/fill-template`
-   **Method:** `POST`
-   **Request Body:**
    ```json
    {
      "templateName": "birthdayCard",
      "textBoxValues": {
        "1": "Happy Birthday!"
      },
      "imageReplacements": [
        "uploads/newImage.jpg"
      ]
    }
    ```
-   **Success Response (200):**
    ```json
    {
      "status": "success",
      "message": "Template filled successfully",
      "template": {
        "textBoxes": [
          {
            "id": 1,
            "value": "Happy Birthday!"
          }
        ],
        "images": [
          "uploads/newImage.jpg"
        ]
      }
    }
    ```

---

## Dependencies

-   [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
-   [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
-   [fs-extra](https://www.npmjs.com/package/fs-extra): Adds file system methods that aren't included in the native `fs` module.
-   [multer](https://www.npmjs.com/package/multer): Node.js middleware for handling `multipart/form-data`.
-   [path](https://nodejs.org/api/path.html): Node.js module for handling and transforming file paths.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
````
