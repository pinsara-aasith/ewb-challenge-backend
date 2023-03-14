import express from 'express';
import { validate } from '../common/middlewares/validate';
import { createReport, getAllReports, getReport } from './report.controller';
import { CreateReportSchema } from './report.schema';

const ReportRouter = express.Router();

ReportRouter.get('/report/', getAllReports);
ReportRouter.get('/report/:id', getReport);
ReportRouter.post('/report/', validate(CreateReportSchema), createReport);

export default ReportRouter;
