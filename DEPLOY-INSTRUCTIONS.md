# KARLOZ PHOTOGRAPHY — DEPLOY INSTRUCTIONS
# Plain English. No coding required.
# =====================================================

## WHAT YOU HAVE
A complete photography website with:
- 3 pages: Home (portfolio grid), Testimonials, About & Contact
- 4-column photo grid with session grouping + lightbox
- CMS dashboard at yoursite.com/admin (add photos, edit text, manage testimonials)
- Mobile responsive
- SEO optimized


## STEP 1 — CREATE A GITHUB REPOSITORY (one time only)

1. Go to github.com and sign in as karloz8008
2. Click the "+" button (top right) → "New repository"
3. Name it: karloz-photography
4. Set to PUBLIC
5. Click "Create repository"
6. On the next page, click "uploading an existing file"
7. Drag your entire karloz-photography folder into the upload area
8. Click "Commit changes"
   ✅ Your files are now on GitHub


## STEP 2 — DEPLOY TO NETLIFY (one time only)

1. Go to netlify.com → Sign up with your GitHub account
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub → select "karloz-photography"
4. Leave all settings as default → click "Deploy site"
5. Wait ~1 minute → your site is live at a random URL like:
   https://random-name-123.netlify.app
   ✅ Your site is live!


## STEP 3 — CONNECT YOUR CUSTOM DOMAIN

1. In Netlify dashboard → click your site → "Domain settings"
2. Click "Add custom domain" → type your domain (e.g. karlozphotography.com)
3. Netlify will show you DNS settings to copy
4. Log into your domain registrar (GoDaddy, Namecheap, etc.)
5. Find "DNS Settings" or "Nameservers"
6. Update nameservers to Netlify's (they'll show you exactly what to copy)
7. Wait up to 24 hours → your domain points to your new site
   ✅ Site live at your custom domain


## STEP 4 — ENABLE THE CMS DASHBOARD

1. In Netlify dashboard → "Site configuration" → "Identity"
2. Click "Enable Identity"
3. Scroll to "Registration" → set to "Invite only"
4. Scroll to "Services" → "Git Gateway" → click "Enable Git Gateway"
5. Go to "Identity" tab → "Invite users"
6. Invite your own email (karloz8008@gmail.com)
7. Check your email → click the invite link → set a password

Now go to: yoursite.com/admin
Log in → you'll see your full CMS dashboard!
   ✅ CMS is live


## USING YOUR CMS DASHBOARD

Once logged in at yoursite.com/admin you can:

TESTIMONIALS:
- Click "Testimonials" in left sidebar
- Click "New Testimonial"
- Fill in: Name, Role, Initials (2 letters), and their quote
- Click "Publish" → it saves to GitHub → site updates in ~1 minute

PHOTO SESSIONS:
- Click "Photo Sessions"
- Click "New Session"
- Give it a name, upload the hero photo, add all session photos
- Click "Publish"

PAGE TEXT:
- Click "Page Content" → "About Page"
- Edit your bio, heading, location, specialties
- Click "Publish"


## ADDING PHOTOS MANUALLY (without CMS)

If you prefer to add photos directly:

1. Open index.html in any text editor (TextEdit on Mac, Notepad on Windows)
2. Find the section that says "PHOTO GRID"
3. Copy one grid-item block and paste it below the last one
4. Change the session name, image filename, and label
5. Drop the new photo file into the /photos/ folder
6. Upload the updated files to GitHub (drag and drop on github.com)
   Site updates automatically in ~1 minute


## ADDING MORE TESTIMONIALS MANUALLY

1. Open testimonials.html
2. Find the last .testimonial-card block
3. Copy it, paste it below
4. Change the initials, name, role, and quote text
5. Save and upload to GitHub


## YOUR FILE STRUCTURE
karloz-photography/
├── index.html          ← Home page (edit grid photos here)
├── testimonials.html   ← Testimonials (add cards here)
├── about.html          ← Bio + contact (edit bio here)
├── style.css           ← All styles (don't touch unless confident)
├── script.js           ← All interactions (don't touch)
├── netlify.toml        ← Netlify config (don't touch)
├── admin/
│   ├── index.html      ← CMS login page (don't touch)
│   └── config.yml      ← CMS configuration (don't touch)
└── photos/
    ├── hero.jpg        ← Your main hero photo (replace this)
    ├── actor-blue-1.jpg
    └── ... (add all your photos here)


## PHOTO NAMING TIPS
- Use lowercase, no spaces: "actor-sofia-1.jpg" not "Actor Sofia 1.jpg"
- Use .jpg for photos (smaller file size = faster loading)
- Recommended size: 1200px tall, 960px wide (4:5 ratio)
- Keep file size under 500KB for fast loading


## NEED HELP?
Email: karloz8008@gmail.com (that's you!)
Netlify docs: docs.netlify.com
GitHub docs: docs.github.com
