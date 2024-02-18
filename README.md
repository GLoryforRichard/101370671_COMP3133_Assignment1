# GraphQL API Test Cases



## Test Cases

### 1. Signup

**Mutation**: Allows a user to create a new account.

```graphql
mutation {
  signup(username: "Alice", email: "alice@example.com", password: "alice2024") {
    id
    username
    email
  }
}
```



---

### 2. Login

**Query**: Allows a user to access the system.

```graphql
query {
  login(email: "alice@example.com", password: "alice2024") {
    token
    user {
      id
      username
    }
  }
}
```


---

### 3. Get all employees

**Query**: Fetches a list of all employees.

```graphql
query {
  employees {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
```


---

### 4. Add New Employee

**Mutation**: Creates a new employee.

```graphql
mutation {
  createEmployee(first_name: "Bob", last_name: "Smith", email: "bob.smith@example.com", gender: "Male", salary: 50000) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
```


---

### 5. Search Employee by ID

**Query**: Retrieves details of an employee by their ID.

```graphql
query {
  employee(id: "employeeIdHere") {
    first_name
    last_name
    email
    gender
    salary
  }
}
```


---

### 6. Update Employee by ID

**Mutation**: Updates an existing employee's details.

```graphql
mutation {
  updateEmployee(id: "employeeIdHere", first_name: "Robert", last_name: "Smith", email: "bob.smith@example.com", gender: "Male", salary: 55000) {
    id
    first_name
    last_name
    email
    gender
    salary
  }
}
```


---

### 7. Delete Employee by ID

**Mutation**: Deletes an employee by their ID.

```graphql
mutation {
  deleteEmployee(id: "employeeIdHere") {
    id
  }
}
```


