import {AuthService} from '../services/auth.js';

export async function login(req, res) {
  try {
    const {email, password} = req.body;

    const authResponse = await AuthService.login(email, password);

    res.json(authResponse);
  } catch (e) {
    res.status(400).json({message: 'Login failed', Error: e});
  }
}

export async function register(req, res) {
  try {
    const {email, password, username} = req.body;

    const authResponse = await AuthService.register(email, password, username);

    res.json(authResponse);
  } catch (e) {
    res.status(400).json({message: 'Registration failed', Error: e});
  }
}
