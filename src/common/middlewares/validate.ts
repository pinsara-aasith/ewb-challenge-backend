import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
    (schema: AnyZodObject, asynch = false) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const f = asynch ? schema.parseAsync : schema.parse
                f({
                    params: req.params,
                    query: req.query,
                    body: req.body,
                });

                next();
            } catch (err: any) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        status: 'fail',
                        message: 'Please verify details before submitting...',
                        errors: err.errors?.map((e) => ({field: e.path?.[1],...e})),
                    });
                }
                next(err);
            }
        };

