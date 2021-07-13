import { MongoClient, Collection, WithId } from "mongodb";

import config from "./config";
import { IAlbum, IArea, IUser, IToken } from "./types";

let client: MongoClient;
export let areaCollection: Collection<WithId<IArea>>;
export let albumCollection: Collection<WithId<IAlbum>>;
export let userCollection: Collection<WithId<IUser>>;
export let tokenCollection: Collection<WithId<IToken>>;

export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongo_host}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  let db = client.db(config.mongo_db);
  areaCollection = db.collection("areas");
  albumCollection = db.collection("albums");
  userCollection = db.collection("user");
  tokenCollection = db.collection("token");
  tokenCollection.createIndex(
    {
      createAt: 1,
    },
    {
      expireAfterSeconds: 300,
    }
  );
}
