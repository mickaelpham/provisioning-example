import express from 'express';
import { body, validationResult } from 'express-validator';
import { create, retrieve } from '../repositories/users';
import { retrieveByUser } from '../repositories/workspaces';

const router = express.Router();

router.post(
  '/',
  body('email').isEmail(),
  body('name').notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await create(req.body.name, req.body.email);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req, res, next) => {
  try {
    const user = await retrieve(req.params.id);
    const workspaces = (await retrieveByUser(user.id)).map((w) => ({
      id: w.workspace.id,
      role: w.userRole,
      name: w.workspace.name,
      slug: w.workspace.slug,
    }));

    res.json({ ...user, workspaces });
  } catch (error) {
    next(error);
  }
});

export default router;
