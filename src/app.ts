import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.route";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import httpStatus from "http-status";
import { AuthRoutes } from "./app/modules/Auth/auth.route";
import { RequestRouter } from "./app/modules/Request/request.route";
import { AdminRoutes } from "./app/modules/Admin/admin.route";
const app: Application = express();
app.use(cors());
// app.use(cors({origin:`http://localhost:3000`, credentials:true}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "blood donation application server is running...",
  });
});

app.use("/api", UserRoutes);
app.use("/api", AuthRoutes);
app.use("/api", RequestRouter);
app.use("/api", AdminRoutes);

//global error handler
app.use(globalErrorHandler);

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your request path is not found",
    },
  });
});

export default app;
