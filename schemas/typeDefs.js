const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    login(email: String!, password: String!): AuthData
    employees: [Employee!]!
    employee(id: ID!): Employee
    users: [User!]! # Assuming you want to query all users
    user(id: ID!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    createEmployee(
      first_name: String!, 
      last_name: String!, 
      email: String!, 
      gender: String!, 
      salary: Float!
    ): Employee
    updateEmployee(
      id: ID!, 
      first_name: String, 
      last_name: String, 
      email: String, 
      gender: String, 
      salary: Float
    ): Employee
    deleteEmployee(id: ID!): Employee
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type AuthData {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
