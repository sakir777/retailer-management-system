import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from '../slices/authSlice';

// Mock API functions
const mockLogin = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email === 'admin@example.com' && password === 'password') {
    return {
      id: '1',
      name: 'Sakir Shaikh',
      email: email,
      avatar: 'https://avatars.githubusercontent.com/u/106683015?v=4?w=32&h=32&fit=crop&crop=face',
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

const mockSignup = async (name: string, email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email && password && name) {
    return {
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar: 'https://avatars.githubusercontent.com/u/106683015?v=4?w=32&h=32&fit=crop&crop=face',
    };
  } else {
    throw new Error('Invalid signup data');
  }
};

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    const user = yield call(mockLogin, email, password);
    yield put(loginSuccess(user));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(loginFailure(errorMessage));
  }
}

function* handleSignup(action: ReturnType<typeof signupRequest>) {
  try {
    const { name, email, password } = action.payload;
    const user = yield call(mockSignup, name, email, password);
    yield put(signupSuccess(user));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(signupFailure(errorMessage));
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(signupRequest.type, handleSignup);
}
