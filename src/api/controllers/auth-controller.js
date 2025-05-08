import { AuthService } from '../services/auth.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const data = await AuthService.login(email, password);

    res.json(data);
  } catch (e) {
    res.status(400).json({ message: 'Login failed , so sad', Error: e });
  }
}

export async function register(req, res) {
  try {
    const { email, password, username } = req.body;

    await AuthService.register(email, password, username);

    const data = await AuthService.login(email, password);

    res.json(data);
  } catch (e) {
    res.status(401).json({ message: 'Registration failed', Error: e.message });
  }
}
