# Markdown Slides

This is my assignment for making a slides app using Markdown. It is made with only HTML, CSS and JavaScript. No libraries or frameworks are used.

## What it does

- Create slides by writing markdown
- Edit slides, and the preview on the right side changes while you type
- Save slides in the browser memory (localStorage), so they are still there after closing and opening the browser
- Present slides in full screen

All the slides of one presentation are written in one markdown text. Three dashes `---` are used to break one slide from the next one.

Example:

```
# This is Slide 01
## This is Heading 02 in slide 01
This is your content on slide 01
---
# This is Slide 02
## This is Heading 02 in slide 02
This is your content on slide 02
```

## How to run

1. Download all the files and keep them in the same folder
2. Double click on `index.html` to open it in the browser

That's it, no installing is needed.

## Files

- `index.html` : the page structure
- `style.css` : the styling
- `script.js` : all the working of the app (markdown converting, buttons, saving)

## Buttons

| Button | What it does |
| --- | --- |
| New | Clears the editor for a new presentation |
| Save | Saves the slides in the browser |
| Present | Shows the slides in full screen |
| Left | Go to the previous slide (disabled on first slide) |
| Right | Go to the next slide (disabled on last slide) |
| Full Screen | Goes to full screen, and the text changes to "Exit Full Screen" when in full screen |

The slide number is shown at the bottom like `1 / 3`.

## Keyboard keys

| Key | What it does |
| --- | --- |
| Right arrow | Next slide |
| Left arrow | Previous slide |
| F11 | Full screen on / off |
| Ctrl + S | Save slides |

Note: the arrow keys do not change slides when the cursor is inside the editor, because then they are used for moving the cursor in the text.

## Markdown supported

My own small converter is written in `script.js`, so only the basic things work:

- `#`, `##`, `###` headings
- Bullet lists with `-` or `*`
- **Bold** with `**text**`
- *Italic* with `*text*`
- `inline code` with backticks
- Code blocks with three backticks
- Normal paragraphs

Things like images, links and tables are not supported.

## Problems I know about

- Only one presentation can be saved at a time. Saving again will replace the old one.
- The markdown converter is very simple, so some complex markdown may not show correctly.
- The New button clears the editor without asking, but the last saved version is still in the browser until you press Save again.
