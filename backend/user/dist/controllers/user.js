import TryCatch from "../config/tryCatch.js";
import { redisClient } from "../index.js";
import { publishToQueue } from "./../config/rabbitmq.js";
export const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;
    const rateLimitKey = `otp:ratelimit${email}`;
    const rateLimit = await redisClient.get(rateLimitKey);
    if (rateLimit) {
        res.status(429).json({
            message: "Too may requests. Please wait before requesting new opt",
        });
        return;
    }
    ;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey = `otp:${email}`;
    await redisClient.set(otpKey, otp, {
        EX: 300, // 5minutes
    });
    await redisClient.set(rateLimitKey, "true", {
        EX: 60,
    });
    const message = {
        to: email,
        subject: "Your otp code",
        body: `Your OTP is ${otp}. It is valid for 5 minutes`,
    };
    await publishToQueue("send-otp", message);
    res.status(200).json({
        message: "OTP sent to your mail",
    });
});
//# sourceMappingURL=user.js.map