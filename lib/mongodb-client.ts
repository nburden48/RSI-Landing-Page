// Define the cached connection type
interface MongooseConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Define the global namespace to include mongoose
declare global {
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined
}

// Initialize the cached connection
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null }

// Cache the mongoose connection
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null }
}

/**
 * Check if MongoDB is configured
 */
export const isMongoConfigured = (): boolean => {
  return !!process.env.MONGODB_URI && process.env.ENABLE_MONGODB === "true"
}

/**
 * Connect to MongoDB
 * Returns the mongoose connection or null if MongoDB is not configured
 */
export async function dbConnect(): Promise<typeof mongoose | null> {
  // If MongoDB is not configured, return null
  if (!isMongoConfigured()) {
    console.warn("MongoDB is not configured or disabled. Using mock data.")
    return null
  }

  // If we already have a connection, return it
  if (cached.conn) {
    return cached.conn
  }

  // If a connection is being established, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    // Create a new connection promise
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB")
        return mongoose
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error)
        return null
      })
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise
    return cached.conn
  } catch (e) {
    console.error("Error connecting to MongoDB:", e)
    return null
  }
}

/**
 * Disconnect from MongoDB
 */
export async function dbDisconnect(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect()
    cached.conn = null
    cached.promise = null
    console.log("Disconnected from MongoDB")
  }
}

export default dbConnect
