const db = require('better-sqlite3')('site_content.db');
db.prepare("UPDATE projects SET image = '/project_placeholder.png'").run();
db.prepare("UPDATE blog_posts SET image = '/blog_placeholder.png'").run();
console.log("DB Updated Successfully!");
