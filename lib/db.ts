import Database from "better-sqlite3";
import path from "path";

export const db = new Database("site_content.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    id TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    image TEXT,
    span TEXT
  );
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    excerpt TEXT,
    date TEXT,
    author TEXT,
    image TEXT,
    category TEXT
  );
`);

// Seed initial data if empty or missing keys
const seedData = () => {
  const insertContent = db.prepare("INSERT OR IGNORE INTO content (id, value) VALUES (?, ?)");
  insertContent.run("hero_headline", "Built for Integrity");
  insertContent.run("hero_description", "A legacy construction firm defined by structural precision. We translate complex architectural blueprints into enduring landmarks across the UAE.");
  insertContent.run("about_page_headline", "Building the Future of UAE");
  insertContent.run("about_page_description", "Founded in 2011, Saud Shehatha Construction has grown from a specialized engineering firm into a premier construction powerhouse. Our journey is defined by a relentless pursuit of structural perfection and a commitment to the UAE's visionary landscape.");
  
  const projectCount = db.prepare("SELECT count(*) as count FROM projects").get() as { count: number };
  if (projectCount.count === 0) {
    const insertProject = db.prepare("INSERT INTO projects (title, category, image, span) VALUES (?, ?, ?, ?)");
    insertProject.run("The Royal Heights", "Luxury Residential", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", "md:col-span-2 md:row-span-2");
    insertProject.run("Industrial Hub X", "Infrastructure", "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800", "md:col-span-1 md:row-span-1");
    insertProject.run("Barsha Tower", "Commercial", "https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=800", "md:col-span-1 md:row-span-1");
    insertProject.run("Artisan Villa", "Renovation", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", "md:col-span-2 md:row-span-1");
    insertProject.run("Skyline Plaza", "Commercial", "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&q=80&w=800", "md:col-span-1 md:row-span-1");
    insertProject.run("Desert Oasis Resort", "Hospitality", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800", "md:col-span-1 md:row-span-1");
  }

  const blogCount = db.prepare("SELECT count(*) as count FROM blog_posts").get() as { count: number };
  if (blogCount.count === 0) {
    const insertBlog = db.prepare("INSERT INTO blog_posts (title, excerpt, date, author, image, category) VALUES (?, ?, ?, ?, ?, ?)");
    insertBlog.run("The Future of Sustainable Construction in Dubai", "Exploring how green building materials and solar integration are reshaping the UAE skyline.", "March 15, 2026", "Eng. Saud Shehatha", "https://images.unsplash.com/photo-1518005020251-582c7b97465d?auto=format&fit=crop&q=80&w=800", "Sustainability");
    insertBlog.run("Precision Engineering: Beyond the Blueprint", "Why structural integrity starts long before the first stone is laid in luxury residential projects.", "February 28, 2026", "Sarah Ahmed", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800", "Engineering");
    insertBlog.run("Safety Protocols in High-Rise Infrastructure", "A deep dive into the zero-incident framework that defines our construction sites.", "January 12, 2026", "Michael Chen", "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800", "Safety");
    insertBlog.run("Modernizing Heritage Sites", "How we balance historical preservation with modern structural requirements in the UAE.", "December 05, 2025", "Ahmed Al-Maktoum", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", "Renovation");
  }
};

seedData();
