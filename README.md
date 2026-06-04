# JK Farms Website

Premium static website for JK Farms, a Kerala-style farm stay and event venue in Nizamabad, Telangana.

## Research Notes Used

Public web research positioned JK Farms as a Nizamabad-region farm stay and private event venue rather than only a generic farmhouse.

- Telangana Tourism describes Nizamabad as about 175 km northwest of Hyderabad and highlights Dichpally Ramalayam, Nizamabad Fort/Raghunatha Temple, Ali Sagar, Ashok Sagar, and Mallaram Forest.
- Mallaram Forest is promoted as an eco-tourism and picnic spot about 8 km southwest of Nizamabad town, with treks, a viewpoint tower, Mallaram Cheruvu, migratory birds, and a mushroom-shaped rock.
- Nizamabad district horticulture data lists 21,746.36 hectares under horticulture and 199,531 MT production, including fruits, vegetables, flowers, and spices.
- Public Instagram/search signals around Telangana farmhouses emphasize swimming pools, lawns, private celebrations, birthdays, haldi/mehendi, pre-wedding shoots, family stays, and WhatsApp-first booking. Public Instagram search did not expose reliable performance metrics, so no follower or engagement claims were added.

Useful source links:

- Telangana Tourism Nizamabad: https://tourism.telangana.gov.in/destinations/nizamabad
- Nizamabad District Horticulture: https://nizamabad.nic.in/departments/horticulture/
- Britannica Nizamabad overview: https://www.britannica.com/place/Nizamabad

## How to Run Locally

Open `index.html` directly in any modern browser.

You can also run a simple local server from this folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## How to Replace Images

Replace the files inside the `images` folder with real JK Farms photos using the same filenames:

- `jk-farms-kerala-entrance.jpeg`
- `jk-farms-kerala-lawn.jpeg`
- `jk-farms-kerala-sunset.jpeg`
- `hero.jpg`
- `pool.jpg`
- `lawn.jpg`
- `banquet.jpg`
- `farmhouse.jpg`
- `event.jpg`
- `night-view.jpg`
- `gallery-1.jpg`

Use optimized JPG images where possible. Keep large hero images around 1600px wide and gallery images around 1200px wide for good performance.

## Gallery Media

The gallery supports both photos and videos. Current media includes:

- 3 analyzed Kerala-style exterior photos: golden entrance, lawn approach, and sunset facade.
- 15 optimized MP4 walkthrough videos in the `videos` folder, named `JKF-01.mp4` through `JKF-15.mp4`.
- 15 unique JPG video posters in the `images` folder, named `video-thumb-01.jpg` through `video-thumb-15.jpg`.

The original MOV files can remain as source footage locally, but production pages should reference the optimized MP4/H.264 files for faster mobile playback.

## How to Update Phone Number

Search in `index.html` and `script.js` for:

```text
8297961433
918297961433
```

Replace both with the new phone number. The `91` prefix is the India country code used for WhatsApp links.

## How to Update WhatsApp Message

In `index.html`, update the text inside links that start with:

```text
https://wa.me/918297961433?text=
```

In `script.js`, update the message array inside the inquiry form submit handler.

## How to Replace Google Maps Location

The current website uses a location card and Google Maps search link. Replace the card in `index.html` with an embedded map after the official JK Farms Google Maps pin is available.

## How to Deploy on Hostinger or cPanel

1. Open your hosting file manager.
2. Go to `public_html` or the domain folder.
3. Upload everything inside `jk-farms-website`.
4. Make sure `index.html`, `style.css`, `script.js`, and the `images` folder are in the same directory.
5. Visit your domain and test the navigation, WhatsApp links, gallery, FAQ, and form.

## Design Quality Checklist

- Navbar works on mobile.
- WhatsApp button opens correctly.
- Contact form opens WhatsApp with entered data.
- FAQ accordion opens and closes.
- Gallery lightbox works.
- Back-to-top button works.
- Page is responsive.
- No horizontal scrolling on mobile.
- Images have alt text.
- SEO title and description are added.
- All sections are connected from navigation.
