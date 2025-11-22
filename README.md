# 🎮 Shiny Hunt Counter — OBS Overlay Guide

A simple, free, streamer-friendly tool for tracking shiny hunts with a customizable animated Pokéball counter.  
Works as both a normal webpage for control and a clean on-stream Pokéball overlay when positioned correctly in OBS.

✔️ No signup  
✔️ No downloads  
✔️ No attribution required  
Just use it freely!

---

## ⭐ Features

- Track **multiple shiny hunts** at once
- Clean, animated **Pokéball counter**
- Multiple themes: **Poké Ball, Great Ball, Ultra Ball, Dusk Ball, Love Ball**, and more to come
- Controller stays **off-screen**, so only the Pokéball appears on stream
- Fully interactive using **OBS → Interact**
- All hunts + counts **auto-save** in your browser

---

## 🚀 Using This as an OBS Overlay

### **1. Open the Website**

When you load the Shiny Hunt Counter, you will see:

- **Controller Panel** — where you manage hunts, themes, counts
- **Pokéball Display** — the ball that is meant to appear on stream

You will **not the main page**.
You will **capture the popup window**, then hide the controller.

---

### **2. Add the Website to OBS**

1. Open OBS
2. Under **Sources**, click **➕ Add**
3. Select **Browser**
4. Name it anything you like
5. Paste the website URL
6. Set the recommended size:
   - **Width:** 800
   - **Height:** 600
7. Click **OK**

You will now see the full webpage inside OBS.

---

## 🎛️ Positioning the Overlay in OBS

To show **only the Pokéball**:

1. Click the Browser Source in OBS
2. Drag it until the controller panel is moved **off your canvas** (off-screen)
3. Position the Pokéball wherever you want it on stream
4. Resize if needed:
   - Right-click → **Transform → Fit to Screen**
   - or manually drag the handles

Only the Pokéball will be visible to viewers — the controller stays hidden.

---

## 🖱️ Interacting With the Overlay in OBS

To click the Pokéball or update hunts:

1. Right-click the Browser Source
2. Choose **Interact**
3. A mini OBS browser appears
4. Use that window to:
   - Press the Pokéball to add +1
   - Change themes
   - Switch hunts
   - Reset counts
   - Add/delete hunts

**Do NOT click the browser window outside OBS** — only the OBS Interact panel works for live interaction.

---

## 🎨 Changing Ball Themes

From the controller panel, choose any ball:

- Poké Ball
- Great Ball
- Ultra Ball
- Dusk Ball
- Love Ball
- More can be added manually if you edit the code

The theme updates instantly on stream.

---

## 🧠 Tips for Streamers

- Keep the controller on a second monitor or simply off-screen in OBS
- Only display the Pokéball area
- The site auto-saves your progress locally

---

## ❤️ Free To Use

This tool is 100% free.  
No credit required — enjoy it however you like!

If you want to share it or give credit, that’s always very appreciated.

---

## 🐞 Issues or Requests?

If you’d like new ball designs, improvements, or fixes, feel free to reach out or modify the code.

**Happy shiny hunting! ✨🎮**
