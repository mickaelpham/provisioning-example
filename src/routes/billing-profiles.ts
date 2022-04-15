import express from 'express';
import { body, validationResult } from 'express-validator';
import { create } from '../repositories/billing-profiles';
import { retrieve } from '../repositories/users';

const router = express.Router();

router.post('/', body('userId').notEmpty(), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await retrieve(req.body.userId);
    const billingProfile = await create(user, req.body);

    res.status(201).json(billingProfile);
  } catch (error) {
    next(error);
  }
});

export default router;
