import type { VercelRequest, VercelResponse } from "@vercel/node";
import Data from "../src/data/classes.json" with { type: "json" };

export default function handler(req: VercelRequest, res: VercelResponse) {
  if(req.method === "GET"){
    try{
    const flattenedData = Data.flatMap(item => item && item.classes? item.classes : []);
    res.status(200).json(flattenedData);
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }else{
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}