import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
import requestIp from "request-ip";
import dayjs from "dayjs";
import { faucet } from "../../utils/contracts/faucet";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { body, method } = req;

  // Extract the email and captcha code from the request body
  const { walletAddress, captcha } = body;

  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!walletAddress || !captcha) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      });
    }

    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
      if (captchaValidation.success) {
        // Replace this with the API that will save the data received

        const ipAddress = requestIp.getClientIp(req);
        const faucetAddress = await prisma.faucet.findFirst({
          where: {
            wallet: {
              contains: walletAddress,
            },
            ip_address: {
              contains: ipAddress,
            },
          },
        });

        if (faucetAddress) {
          const diffAt = dayjs().diff(faucetAddress?.transaction_at, "days");
          if (diffAt > 0) {
            const { _nftTx, _tokenTx } = await faucet(walletAddress);
            const result = await prisma.faucet.updateMany({
              where: {
                wallet: {
                  contains: walletAddress,
                },
              },
              data: {
                transaction_at: dayjs().toISOString(),
                nft_transaction_hash: _nftTx?.transactionHash,
                token_transaction_hash: _tokenTx?.transactionHash,
              },
            });
            return res.status(200).json({
              message: "Success",
              data: `Transaction: ${result?.nft_transaction_hash} & ${result?.token_transaction_hash}`,
            });
          } else {
            return res.status(422).json({
              message: "You can't get faucet in 24 hours",
              data: null,
            });
          }
        } else {
          const { _nftTx, _tokenTx } = await faucet(walletAddress);

          const result = await prisma.faucet.create({
            data: {
              wallet: walletAddress,
              ip_address: ipAddress,
              nft_transaction_hash: _nftTx?.transactionHash,
              token_transaction_hash: _tokenTx?.transactionHash,
            },
          });
          return res.status(200).json({
            message: "Success",
            data: `Transaction: ${result?.nft_transaction_hash} & ${result?.token_transaction_hash}`,
          });
        }
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
        data: null,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(422)
        .json({ message: "Something went wrong", data: null });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}
