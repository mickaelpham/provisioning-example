import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  create,
  join,
  retrieveBySlug,
  retrieveMembers,
} from '../repositories/workspaces';

const router = express.Router();

router.post(
  '/',
  body('name').notEmpty(),
  body('slug').isSlug(),
  body('userId').notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const workspace = await create(
        req.body.slug,
        req.body.name,
        req.body.userId
      );
      res.json(workspace);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:slug/join',
  body('userId').notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const workspace = await retrieveBySlug(req.params?.slug);
      const result = await join(workspace.id, req.body.userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:slug', async (req, res, next) => {
  try {
    const workspace = await retrieveBySlug(req.params.slug);
    const members = (await retrieveMembers(workspace.id)).map((u) => ({
      id: u.user.id,
      name: u.user.name,
      email: u.user.email,
      role: u.userRole,
    }));

    res.json({ ...workspace, members });
  } catch (error) {
    next(error);
  }
});

export default router;
