import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const { OK } = StatusCodes;
const router = Router();

router.get('/', (req, res) => {
  res
    .status(OK)
    .json({
      success: true,
      message: "Welcome to Order API"
    });
})

export default router;
