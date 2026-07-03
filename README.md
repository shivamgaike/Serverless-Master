# Serverless-Master

A fully serverless **Employee Management System** built on AWS, using **S3** for static web hosting, **API Gateway** as the HTTP entry point, **Lambda** for business logic, and **DynamoDB** as the NoSQL data store. The app lets users add employee records and view all stored records in real time, with zero servers to manage.

---

## 🏗️ Architecture

The application follows a classic serverless 3-tier pattern:

```
Browser (S3 Static Website)
        │
        ▼
  Amazon API Gateway  (REST endpoint)
        │
        ▼
   AWS Lambda Functions
   ├── insertEmployeeData  → writes to DynamoDB
   └── getEmployees        → reads from DynamoDB
        │
        ▼
   Amazon DynamoDB  (table: employeeData)
```

Reference diagrams are included in the repo:
- `Diagram/High-Level-Architecture.jpg` — overall system architecture
- `Diagram/Pipeline Architecture.png` — deployment/data flow pipeline

---

## ✨ Features

- **Add Employee** — submit Employee ID, Name, Department, and Salary through a web form
- **View Employees** — fetch and display all employee records in a live table
- **Fully Serverless** — no EC2 instances or servers to provision or maintain
- **Pay-per-use** — Lambda and DynamoDB costs scale to zero when idle
- Clean, responsive UI built with Bootstrap 5 and Font Awesome

---

## 🛠️ Tech Stack

| Layer          | Service / Technology            |
|----------------|----------------------------------|
| Frontend       | HTML5, CSS3, Bootstrap 5, jQuery |
| API Layer      | Amazon API Gateway               |
| Compute        | AWS Lambda (Python)              |
| Database       | Amazon DynamoDB                  |
| Hosting        | Amazon S3 (Static Website Hosting) |

---

## 📁 Project Structure

```
Serverless-Master/
├── Diagram/
│   ├── High-Level-Architecture.jpg   # System architecture diagram
│   └── Pipeline Architecture.png     # Deployment pipeline diagram
├── Lambda/
│   ├── getEmployees.py               # Scans DynamoDB and returns all employee records
│   └── insertEmployeeData.py         # Writes a new employee record to DynamoDB
├── S3/
│   ├── index.html                    # Frontend UI (form + records table)
│   └── scripts.js                    # Handles API calls (Save / Get employees)
├── Screenshots/                      # Application screenshots
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started / Deployment

### Prerequisites
- An AWS account
- AWS CLI configured with appropriate IAM permissions (S3, Lambda, API Gateway, DynamoDB)
- Basic familiarity with the AWS Management Console

### 1. Create the DynamoDB Table
Create a table named **`employeeData`** with `employeeid` as the partition key.

### 2. Deploy the Lambda Functions
- Create two Lambda functions (Python runtime) named e.g. `insertEmployeeData` and `getEmployees`, and upload the corresponding scripts from the `Lambda/` folder.
- Attach an IAM execution role with `AmazonDynamoDBFullAccess` (or a scoped-down equivalent) to both functions.

### 3. Configure API Gateway
- Create a REST (or HTTP) API in API Gateway.
- Create a resource/route with:
  - **POST** method → integrated with `insertEmployeeData`
  - **GET** method → integrated with `getEmployees`
- Enable CORS on the resource.
- Deploy the API to a stage (e.g. `az`) and note the **Invoke URL**.

### 4. Configure the Frontend
Open `S3/scripts.js` and update the `API_ENDPOINT` constant with your own API Gateway invoke URL:

```js
const API_ENDPOINT = "https://<your-api-id>.execute-api.<region>.amazonaws.com/<stage>";
```

### 5. Host on S3
- Create an S3 bucket and enable **Static website hosting**.
- Upload `index.html` and `scripts.js` from the `S3/` folder.
- Set a public bucket policy (or use CloudFront + OAC) to allow read access.
- Open the S3 website endpoint in your browser to use the app.

---

## 🔌 API Reference

**Base URL:** `https://<api-id>.execute-api.<region>.amazonaws.com/<stage>`

| Method | Description             | Body / Response                                             |
|--------|--------------------------|----------------------------------------------------------------|
| `POST` | Add a new employee       | Body: `{ "employeeid", "name", "department", "salary" }`     |
| `GET`  | Retrieve all employees   | Response: JSON array of employee objects                     |

---

## 📸 Screenshots

Screenshots of the running application are available in the [`Screenshots/`](./Screenshots) folder.

---

## 🔮 Future Improvements

- Add **Update** and **Delete** operations for full CRUD support
- Add input-level validation and error handling on the Lambda side
- Secure the API with an authorizer (Amazon Cognito / IAM)
- Automate deployment using Infrastructure as Code (AWS SAM / CloudFormation / Terraform)
- Add a CI/CD pipeline (GitHub Actions / AWS CodePipeline) for automated deployments

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Shivam Gaike**
GitHub: [@shivamgaike](https://github.com/shivamgaike)
