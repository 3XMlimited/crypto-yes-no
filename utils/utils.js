"use server";
import { MongoClient, ServerApiVersion } from "mongodb";

const url =
  "mongodb+srv://3XM:chuchupa888@cluster0.6uckc.mongodb.net/?retryWrites=true&w=majority";

// const connectDB = async (
//   db_name,
//   collection_name,
//   action,
//   rules,
//   filter,
//   update
// ) => {
//   const client = await MongoClient.connect(url, {}).catch((err) => {
//     console.log(err);
//   });

//   if (!client) {
//     return;
//   }
//   try {
//     const db = client.db(db_name);

//     let collection = db.collection(collection_name);
//     let result;
//     switch (action) {
//       case "create_one":
//         result = await collection.insertOne(update);
//         break;
//       case "read_one":
//         result = await collection.findOne(rules);
//         break;
//       case "update_one":
//         result = await collection.updateOne(filter, { $set: update });
//         break;
//       case "create":
//         result = await collection.insertMany(update);
//         break;
//       case "read":
//         result = await collection.find(rules).toArray();
//         break;
//       case "update":
//         result = await collection.updateMany(filter, { $set: update });
//         break;
//       case "delete":
//         result = await collection.deleteMany(filter);
//         break;
//       default:
//         console.log("Something went wrong");
//         break;
//     }

//     return result;
//   } catch (err) {
//     console.log(err);
//     return null;
//   } finally {
//     client.close();
//   }
// };

const getOrderbook = async () => {
  const uri = "https://clob.polymarket.com/book?token_id=";
  const id =
    "10382206167602821537615393390727190508838830270797400733981332891522737823882";
  const response = await fetch(uri + id);
  const result = await response.json();
  // console.log(result);
  return result;
};

const getEvents = async () => {
  const uri = "https://gamma-api.polymarket.com/events/";
  const id = "11722";
  const response = await fetch(uri + id);
  const result = await response.json();
  // console.log(result);
  return result;
};

module.exports = {
  getOrderbook,
  getEvents,
};
