import fetch from "node-fetch";

async function testAPI() {
  try {
    console.log("Testing API at http://localhost:5000/api/characters...\n");

    const response = await fetch("http://localhost:5000/api/characters");
    const data = await response.json();

    console.log(`✅ Total characters: ${data.length}`);
    console.log("\n📋 First 3 characters:\n");

    data.slice(0, 3).forEach((char, index) => {
      console.log(`${index + 1}. ${char.name}`);
      console.log(`   ID: ${char.id}`);
      console.log(`   Avatar: ${char.avatar}`);
      console.log(`   Category: ${char.category}`);
      console.log("");
    });

    // Check how many have image avatars vs emoji avatars
    const withImages = data.filter(
      (c) => c.avatar && c.avatar.startsWith("/img/")
    ).length;
    const withEmojis = data.filter(
      (c) => c.avatar && !c.avatar.startsWith("/img/")
    ).length;

    console.log(`📊 Avatar Statistics:`);
    console.log(`   With images: ${withImages}`);
    console.log(`   With emojis: ${withEmojis}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testAPI();
