# Blood Donation Application
Welcome to our Blood Donation Application, a revolutionary solution dedicated to simplifying the process of blood donation and connecting generous donors with individuals in critical need. Our platform serves as a vital bridge between those seeking assistance and those willing to lend a helping hand. Here users can register, create donation requests, view their donation history, and update their profile information. 

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Relational Mapping (ORM):** Prisma for PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod for error handling

## Models

### User Model:

- **id (String):** A distinctive identifier for each user.
- **name (String):** The name of the user.
- **email (String):** The email address of the user.
- **password (String):** The hashed password of the user.
- **bloodType (String):** The type of blood a user has.
- **location (String):** The location of the user.
- **availability(Boolean):** The status will be false by default.
- **createdAt (DateTime):** The timestamp indicating when the user was created.
- **updatedAt (DateTime):** The timestamp indicating when the user was last updated.

### Request Model:

- **id (String):** A distinctive identifier for each request.
- **donorId(String):** Id of a user. The user id will be that of a donor. The user you want to request for blood.
- **requesterId(String):** Id of a user. The user id will be that of a requester. The user who will send requests.
- **phoneNumber (String):** The phone number of the requester.
- **dateOfDonation (String):** The date of donation
- **hospitalName(String):** The name of the hospital.
- **hospitalAddress (String):** The address of the hospital.
- **reason(String):** The reason for donation.
- **requestStatus (String):** The status will be PENDING by default. Use enum: PENDING, APPROVED, REJECTED.
- **createdAt (DateTime):** The timestamp indicating when the found item was reported.
- **updatedAt (DateTime):** The timestamp indicating when the found item was last updated.

### UserProfile Model:

- **id (String):** A distinctive identifier for each user profile.
- **userId (String):** A reference to the user associated with the profile.
- **bio (String):** A brief bio or description of the user.
- **age (Integer):** The age of the user.
- **lastDonationDate (String):** The last date of donation
- **createdAt (DateTime):** The timestamp indicating when the user profile was created.
- **updatedAt (DateTime):** The timestamp indicating when the user profile was last updated.

## Relations Description

- **Request Model - Donor (User) Relation:** Each request is associated with one donor user. A donor can have multiple associated requests.
- **Request Model - Requester (User) Relation:** Each request is associated with one requester user. A requester can have multiple associated requests.
- **UserProfile Model - User Relation:** Each user profile corresponds to one user. There is a one-to-one relationship between a user and their profile.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-JannatunNimeNishat`
2. Install dependencies: `npm install`
3. Set up PostgreSQL and configure database connection in `.env` file
4. Run database migrations: `npx prisma migrate dev`
5. Start the server: `npm start`

## Usage

1. Register a new user  `/api/register`.
2. Log in with the `/api/login` endpoint to obtain a JWT token.
3. Create a donation request using the `/api/donation-request` endpoint.
4. View your donation history with the `/api/donation-request` endpoint.
5. Update your profile information using the `/api/my-profile` endpoint.

## Endpoints

- `POST /api/register`: Create a new user account.
- `POST /api/login`: Log in and obtain a JWT token.
- `POST /api/donation-request`: Create a new donation request.
- `GET /api/donation-request`: Retrieve donation history.
- `PUT /api/donation-request/:requestId`: Update the status of a donation request.
- `GET /api/donor-list`: Get a list of all donors.
- `GET /api/my-profile`: Retrieve user's own profile information.
- `PUT /api/my-profile`: Update user's own profile information.

## Project Owner

- [Jannatun Nime Nishat](https://github.com/JannatunNimeNishat)

## Live Demo

[Live Demo](https://blooddonationserverfinal-jannatunnimenishats-projects.vercel.app)

## License
