import { call, put, takeEvery, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  User,
} from '../slices/authSlice';

// In-memory user storage (in a real app, this would be a database)
interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const users: StoredUser[] = [
  // Default admin user
  {
    id: '1',
    name: 'Sakir Shaikh',
    email: 'admin@example.com',
    password: 'password',
    avatar: 'https://avatars.githubusercontent.com/u/106683015?v=4?w=32&h=32&fit=crop&crop=face',
  }
];

// Mock API functions
const mockLogin = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

const mockSignup = async (name: string, email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Mock validation
  if (email && password && name) {
    const newUser: StoredUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
      avatar: 'https://avatars.githubusercontent.com/u/106683015?v=4?w=32&h=32&fit=crop&crop=face',
    };
    
    // Store the new user
    users.push(newUser);
    
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    };
  } else {
    throw new Error('Invalid signup data');
  }
};

function* handleLogin(action: ReturnType<typeof loginRequest>): Generator<CallEffect<User> | PutEffect, void, User> {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(mockLogin, email, password);
    yield put(loginSuccess(user));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(loginFailure(errorMessage));
  }
}

function* handleSignup(action: ReturnType<typeof signupRequest>): Generator<CallEffect<User> | PutEffect, void, User> {
  try {
    const { name, email, password } = action.payload;
    const user: User = yield call(mockSignup, name, email, password);
    yield put(signupSuccess(user));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(signupFailure(errorMessage));
  }
}

export default function* authSaga(): Generator<ForkEffect, void, unknown> {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(signupRequest.type, handleSignup);
}
