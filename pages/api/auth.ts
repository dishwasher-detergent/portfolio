// import { Server } from "#/utils/config";

// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   if (req.method === "POST") {
//     // You could get email and password here
//     const { email, password } = req.body;

//     // const request = await api.createSession(email, password);

//     // TODO: Forward location headers
//     const request = await fetch(Server.endpoint + "/account/sessions/email", {
//       method: "POST",
//       headers: {
//         "x-appwrite-project": Server.project,
//         "Content-type": "application/json; charset=UTF-8",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     const response = await request.json();

//     const newHostname =
//       Server.hostname === "localhost" ? Server.hostname : "." + Server.hostname;

//     const cookie = (request.headers.get("set-cookie") ?? "")
//       .split("." + Server.appwrite_hostname)
//       .join(newHostname);

//     console.log(cookie);

//     res.setHeader("set-cookie", cookie);
//     res.status(200).json({
//       ...response,
//     });
//   } else {
//     res.status(404);
//   }
// }

import { Server } from "#/utils/config";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    // You could get email and password here
    // const { email, password } = req.body;

    // TODO: Forward location headers
    const request = await fetch(
      Server.endpoint + "/account/sessions/anonymous",
      {
        method: "POST",
        headers: {
          "x-appwrite-project": Server.project,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const response = await request.json();

    const newHostname =
      Server.hostname === "localhost" ? Server.hostname : "." + Server.hostname;

    const cookie = (request.headers.get("set-cookie") ?? "")
      .split("." + Server.appwrite_hostname)
      .join(newHostname);

    console.log(cookie);

    res.setHeader("set-cookie", cookie);
    res.status(200).json({
      ...response,
    });
  } else {
    res.status(404);
  }
}
