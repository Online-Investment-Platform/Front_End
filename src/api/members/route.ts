// /*eslint-disable */

// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "POST") {
//     try {
//       const { body } = req;
//       console.log("Received request body:", body);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/members`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(body),
//         },
//       );

//       console.log("Backend response status:", response.status);
//       const data = await response.text();
//       console.log("Backend response data:", data);

//       res.status(response.status).json(JSON.parse(data));
//     } catch (error) {
//       console.error("Error in API route:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
