# Text to SVG
An easy GUI for creating pixel-font SVGs of text. Useful for visually displaying contact information or other data that you want humans to be able to see, but scrapers to pass over.

The SVG is dynamically generated as you enter text and adjust the options, so you can tweak the presentation as you create your SVG.

##Why use an SVG for contact info?
Spammers (and others) use bots to 'scrape' websites, searching the text for valuable information such as email addresses and phone numbers. When you publish your contact information online, spammers will get a hold of it, and you'll have to deal with the junk they send you.

If you want to give real humans a way to get in touch with you online while avoiding spammers, you have a few options:

* **Use a contact form**
  This keeps your personal info away from spammers, but your form will get spammed
* **Replace characters with HTML entities**
  You can replace the characters in your contact information with their [HTML entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity). This used to work well, back when simple bots just scanned the page source for characters, but isn't very effective now, as bots typically render a page and then scan the rendered HTML.
* **Use an image**
  If you put your contact information as an image, bots won't be able to get it from your page. There are some accessibility concerns (users on screen readers won't be able to get your contact info, for example), but it's generally considered the best way to avoid releasing your contact info to every spammer on the internet.

An SVG is simply a vector image generated via XML. In theory, a bot could be programmed to render an SVG image and read the words that it is displaying. In practice, that's a lot more computational effort than just scanning text, so it's more efficient for spammers just to focus their efforts on the schmucks who leave their contact info out for any ol' bot to grab.

## How to use it
Simply enter the text, adjust your options, and you're good to go!

###SVG options:
* **Text**: The text you wish to convert to SVG. There is no limit on the length, but best practice is to keep it short and sweet.
* **'Pixel' size**: The size, in actual pixels, of each 'pixel' that makes up the letters. Basically, this controls the size of the text in your SVG.
* **Line width**: The number of 'pixels' that are displayed horizontally on one line of text in the SVG. If you multiply 'pixel' size and line width, you'll get the maximum width of your SVG, in actual pixels.
* **Line spacing**: The number of 'pixels' between the bottom of one row of text and the top of the next. This isn't exact, since some characters are taller than others.

###Output:
You can get your SVG in two ways:
1. Click the 'click to download' link, right underneath the image. You can use the downloaded file just like you would any other image file.
2. Copy the code from the code box, and insert it in your webpage.

##Future updates
This project is currently pretty bare-bones. I made it as a tool to use while redesigning my own website. I plan to update this project as I have the time and interest in the future. Planned improvements include:

* Add text color selection
* Add more characters (mostly symbols)
* Style the GUI for use on tablet or mobile

If you have suggestions for future updates, or would like to contribute, feel free to submit an issue or pull request here, or get in touch with me at [my website](https://ogdendavis.com/).

##License
This project is licensed under the terms of the [MIT license](https://www.mit.edu/~amini/LICENSE.md).
