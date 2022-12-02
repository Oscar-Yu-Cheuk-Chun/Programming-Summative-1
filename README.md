# Art Gallery 
Art Gallery is an interactive website which displays beautiful European artworks, it is contains artwork display, chart about a artwork dataset and an input section to collect user's feedback.

## How to open
Run code through a web server with Python shell / terminal
- Python 2
```bash
 python -m SimpleHTTPServer 8000
```
- Python 3
```bash
 python -m http.server 8000
```
- Then Open browser
```bash
 Access http://127.0.0.1:8000
 Navigate to http://127.0.0.1:8000/formative.html
```

## Overview
- The website header includes the website name on the right and a button which directs user to the dataset used in the project: https://www.kaggle.com/datasets/ansonnnnn/historic-art
![Alt text](/image/header.png?raw=true "Optional Title")

- The next section is for displaying historic European artworks, each artwork consists:
  - the image of artwork itself
  - desription for the artwork's name, author and year of creation
  - a download button to download the image 
![Alt text](/image/image.png?raw=true "Optional Title")
- The section is screensize responsive so the grid of the images will change according to the screensize

- The next section is two buttons which can individually shows and hide a chart 
  - the first button is to show and hide a bar chart showing the top 20 artist who created most artwork in the dataset
  - the second button is to show and hide a bar chart showing the amount of artwork created in different art period 
![Alt text](/image/buttons.png?raw=true "Optional Title")
- After clicking on both button, the two charts should be shown as follows,
![Alt text](/image/charts.png?raw=true "Optional Title")
- The barchart is interactive so if user hover on each bar they can view the exact value of it.

- The next section is for displaying artworks of Gogh, Vincent van, each artwork consists:
  - the image of artwork itself
  - desription for the artwork's name
![Alt text](/image/van_gogh.png?raw=true "Optional Title")
- The section is screensize responsive so the grid of the images will change according to the screensize

- The next section is a form which ask users which artist and what artwork they want to see in the future, users can either input in one or both of the questions.


