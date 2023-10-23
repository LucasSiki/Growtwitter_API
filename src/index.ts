import express, { Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./routes/user.routes";
import { FollowerRoutes } from "./routes/follower.routes";
import { TweetRoutes } from "./routes/tweet.routes";
import { RetweetRoutes } from "./routes/retweet.routes";
import { LikeRoutes } from "./routes/like.routes";
import { ResponseDto } from "./dtos/response.dto";
import { authRoutes } from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/User", UserRoutes());
app.use("/auth", authRoutes());
app.use("/twitter", TweetRoutes());
app.use("/follower", FollowerRoutes()); 
app.use("/like", LikeRoutes()); 
app.use("/retweet", RetweetRoutes()); 
app.listen(4040, () => {
    console.log("---> http://localhost:4040/");
});

app.get("/", (req: Request, res: Response) => {
    const response: ResponseDto = {
    code: 200,
    message: "API running perfectly :)",
};

return res.status(response.code).send(response);
});