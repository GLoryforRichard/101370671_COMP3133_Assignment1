const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Employee = require('../models/employee');

const resolvers = {
  Query: {
    // Login user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, 'your-secret-key');
      return { token, user };
    },
    // Get all employees
    employees: async () => {
      try {
        const allEmployees = await Employee.find({});
        allEmployees.forEach(employee => {
          if (!employee.first_name) {
            throw new Error(`Employee with ID ${employee.id} is missing the first_name field`);
          }
        });
        return allEmployees;
      } catch (error) {
        throw new Error(`Error retrieving employees: ${error.message}`);
      }
    },
    // Search for a specific employee
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
  },
  Mutation: {
    // User signup
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    // Add a new employee
    createEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      const newEmployee = new Employee({ first_name, last_name, email, gender, salary });
      return await newEmployee.save();
    },
    // Update employee details
    updateEmployee: async (_, { id, first_name, last_name, email, gender, salary }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      employee.first_name = first_name || employee.first_name;
      employee.last_name = last_name || employee.last_name;
      employee.email = email || employee.email;
      employee.gender = gender || employee.gender;
      employee.salary = salary || employee.salary;
      await employee.save();
      return employee;
    },
    // Delete an employee
    deleteEmployee: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        await Employee.deleteOne({ _id: id });
        return employee;
      } catch (error) {
        console.error('Error deleting employee:', error.message);
        throw new Error('Error deleting employee');
      }
    },
  },
};

module.exports = resolvers;
