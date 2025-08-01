import { db } from ".";
import { users } from "./schema";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data (optional - remove if you want to keep existing data)
    await db.delete(users);
    console.log("🗑️  Cleared existing users");

    // Sample users data
    const sampleUsers = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        clerkId: "user_2abc123def456ghi",
        firstName: "John",
        lastName: "Doe",
        photo: "https://images.clerk.dev/uploaded/img_2abc123def456ghi.jpeg",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        clerkId: "user_2xyz789uvw012rst",
        firstName: "Jane",
        lastName: "Smith",
        photo: "https://images.clerk.dev/uploaded/img_2xyz789uvw012rst.jpeg",
      },
      {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        clerkId: "user_2mno345pqr678stu",
        firstName: "Bob",
        lastName: "Johnson",
        photo: "https://images.clerk.dev/uploaded/img_2mno345pqr678stu.jpeg",
      },
      {
        name: "Alice Wilson",
        email: "alice.wilson@example.com",
        clerkId: "user_2efg901hij234klm",
        firstName: "Alice",
        lastName: "Wilson",
        photo: "https://images.clerk.dev/uploaded/img_2efg901hij234klm.jpeg",
      },
      {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        clerkId: "user_2nop567qrs890tuv",
        firstName: "Charlie",
        lastName: "Brown",
        photo: "https://images.clerk.dev/uploaded/img_2nop567qrs890tuv.jpeg",
      },
    ];

    // Insert users
    const insertedUsers = await db
      .insert(users)
      .values(sampleUsers)
      .returning();

    console.log(`✅ Successfully created ${insertedUsers.length} users:`);
    insertedUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email})`);
    });

    // Verify the data
    const allUsers = await db.select().from(users);
    console.log(`\n📊 Total users in database: ${allUsers.length}`);

    console.log("\n🎉 Seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("🏁 Seed script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seed script failed:", error);
    process.exit(1);
  });
