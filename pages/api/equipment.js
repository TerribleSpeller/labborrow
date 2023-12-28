import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("lab_equipment");

       const equipment = await db
           .collection("lab")
           .find({})
           .sort({ qty: -1 })
           .limit(10)
           .toArray();

       res.json(equipment);
   } catch (e) {
       console.error(e);
   }
};