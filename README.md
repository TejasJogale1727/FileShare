# FileShare – Cloud Storage and File Sharing Web Application

**FileShare** is a web application inspired by Google Drive, designed for seamless file and folder management, as well as quick, secure sharing. It allows users to upload, organize, and share files with ease, both inside and outside the platform.

---

## Features

- **File & Folder Management**

  - Upload files and create folders in your personal storage space.
  - Rename, move, or delete files and folders.
  - Organize resources efficiently with a user-friendly interface.

- **Advanced Sharing Options**

  - Share files with other registered users or with non-users via a secure link.
  - Grant folder access to other users for collaborative work.
  - Manage access permissions with full control.

- **Quick File Share (SendAnywhere-Inspired)**

  - Access a dedicated _Quick Share_ page directly from the homepage.
  - Instantly upload files (up to 100MB) and generate a sharable link.
  - Share via email, WhatsApp, Facebook, Twitter, or QR code.

- **User Authentication & Verification**

  - Secure login with email and password.
  - New accounts require email verification before activation.

- **Shared Content Management**
  - View files and folders shared with you by other users.
  - Collaborate on shared resources in real-time.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating Engine**: EJS
- **Email Service**: SMTP (for file-sharing notifications)
- **Frontend**: HTML, CSS, JavaScript (integrated via EJS templates)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```
2. **Clone the repository**
   ```bash
    npm install
   ```
3. **Configure environment variables**

- Create a `.env` file in the root folder.

```bash
 npm install
```

- Add your MongoDB connection string:
  ```bash
      MONGO_URI=your-mongodb-connection-string
  ```
- Add your SMTP server details (if email notifications are required):
  ```bash
      SMTP_HOST=your-smtp-host
      SMTP_PORT=your-smtp-port
      SMTP_USER=your-smtp-username
      SMTP_PASS=your-smtp-password
  ```

4. **Run the application**
   ```bash
       npm start
   ```
5. **Access the application**

- Open `http://localhost:3000` in your browser.

---

## Credits

This project is inspired by the work of the following creators, whose tutorials and source code contributed to its development:

- [Adnan Afzal – YouTube](https://www.youtube.com/@AdnanAfzal565)
- [Coders Gyan – YouTube](https://www.youtube.com/@CodersGyan)
- [Padhega India – YouTube](https://www.youtube.com/@PadhegaIndiaYT)

---

## License

This project is for educational purposes only. Please ensure you have proper permissions before reusing any source code from credited creators.
