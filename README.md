# Web Gallery of Art
Web Gallery of Art is an interactive website which displays beautiful European artworks from the 3rd to 19th century, it is contains artwork display, charts about a artwork dataset and an input section to collect user's feedback.

## How to open
### Run code through a web server with Python shell / terminal
- Python 2
```bash
 python -m SimpleHTTPServer 8000
```
- Python 3
```bash
 python -m http.server 8000
```
###  Open browser
```bash
 Access http://127.0.0.1:8000
 Navigate  to the directory of formative.html files 
```

## Overview
### The header includes the website name on the right and a button which directs users to the dataset used in the project: https://www.kaggle.com/datasets/ansonnnnn/historic-art

![Alt text](/image/header.png?raw=true "Optional Title")

- The next section is for displaying historic European artworks, each artwork consists:
  - the image of artwork itself
  - desription for the artwork's name, author and year of creation
  - a download button to download the image 
- The section is screensize responsive so the grid of the images will change according to the screensize

![Alt text](/image/artwork.png?raw=true "Optional Title")

- The next section is two buttons which can individually shows and hide a chart 
  - the first button is to show and hide a bar chart showing the top 20 artist who created most artwork in the dataset
  - the second button is to show and hide a bar chart showing the amount of artwork created in different art period 

![Alt text](/image/buttons.png?raw=true "Optional Title")

- The barchart is interactive so if users hover on each bar they can view the exact value of it.
- After clicking on both button, the two charts should be shown as follows,

![Alt text](/image/charts.png?raw=true "Optional Title")

- The next section is for displaying artworks of Gogh, Vincent van, each artwork consists:
  - the image of artwork itself
  - desription for the artwork's name
- The section is screensize responsive so the grid of the images will change according to the screensize

![Alt text](/image/van_gogh.png?raw=true "Optional Title")

- The next section is a form which ask users which artist and what artwork they want to see in the future, users can either input in one or both of the questions.

![Alt text](/image/input.png?raw=true "Optional Title")
- if the users sucessfully input any value in one or both of the questions, an alert will pop up indicates a sucessful submittion, the inputs will be saved in JavaScript

![Alt text](/image/sucess.png?raw=true "Optional Title")

- Otherwise, an alert will pop up indicates an error

![Alt text](/image/error.png?raw=true "Optional Title")

## Reference 
1. Google Font (2022) Google fonts: Barlow. Google. Available at: https://fonts.google.com/specimen/Barlow?query=BARLOW (Accessed: October 31, 2022). 

2. Mark Otto, J.T. (2022) Bootstrap, Bootstrap · The most popular HTML, CSS, and JS library in the world. Available at: https://getbootstrap.com/ (Accessed: October 31, 2022). 

3. Patel, A. (2021) How to count the same property values in array of objects, Medium. JavaScript in Plain English. Available at: https://javascript.plainenglish.io/how-to-count-the-same-property-values-in-array-of-objects-cc4719c5fc6d (Accessed: November 30, 2022). 

4. Holtz, Y. (2022) Basic barplot in d3.js. Available at: https://d3-graph-gallery.com/pie.html (Accessed: November 30, 2022). 

5. Holtz, Y. (2022) Donut chart with Group label in d3.js, The D3 Graph Gallery – Simple charts made with d3.js. Available at: https://d3-graph-gallery.com/graph/donut_label.html (Accessed: November 30, 2022). 

6. Chan, A. (2022) Historic_Art, Kaggle. Available at: https://www.kaggle.com/datasets/ansonnnnn/historic-art (Accessed: December 2, 2022). 