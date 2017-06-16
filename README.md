# sound and video reactive workshop

# Mic

The Mic object exposes a number of functions

### Mic.getVol(_max)
get the total volume mapped to a max value

### Mic.mapSound(me, total, min, max)
maps a frequency to a new range

### Mic.getHighsVol(_max)
get the total volume of the highs mapped to a max value

### Mic.getMidsVol(_max)
get the total volume of the mids mapped to a max value

### Mic.getBassVol(_max)
get the total volume of the bass mapped to a max value

### Mic.getHighs()
returns an array of all the highs

### Mic.getMids()
returns an array of all the highs

### Mic.getBass()
returns an array of all the highs

### Mic.mapHighs(me, total, min, max)
maps a high frequency to a new range

### Mic.mapMids(me, total, min, max)
maps a mid frequency to a new range


### Mic.mapBass(me, total, min, max)
maps a bass frequency to a new range


# create a drawing space
~ denotes you can leave these out
### ctx.createCanvas(canvas_id, ~canvas_width, ~canvas_height);


# Basic Objects

## draw a solid rectangle
`ctx.fillRect(x, y, width, height);`

## draw a rectangle outline
`ctx.strokeRect(x, y, width, height);`

## draw a solid circle
`ctx.fillEllipse(x, y, width, height);`

## draw a circle outline
`ctx.strokeEllipse(x, y, width, height);`

## draw a line
`ctx.line(x1, y1, x2, y2);`



# colours
Here's a helpful link: http://htmlcolorcodes.com/

## Change the background colour

`ctx.background("red");` //most colours have an english named variable

`ctx.background(red, blue, green);` //values from 0-255

`ctx.background(red, blue, green, alpha);` //can also contain alpha/transparency value - alpha values are 0-1

`ctx.background(grey);` //*grey values from 0-255*


## change an object's fill colour
####use with filled objects like fillRect(), fillEllipse()
*use it before you draw your objects*

#####ctx.fillStyle
`ctx.fillStyle = "red";`

`ctx.fillStyle = rgb(red, green, blue);` // values from 0-255

`ctx.fillStyle = rgba(red, green, alpha);` // alpha is values are 0-1

`ctx.fillStyle = rgb(grey);` // draws grey fill


#####ctx.Fill
`ctx.Fill("red");`

`ctx.Fill(red, green, blue);` // values from 0-255

`ctx.Fill(red, green, blue, alpha);` // alpha is values are 0-1

`ctx.Fill(grey);` // draws grey fill



## change an objects stroke (line) colour
####use with stroked objects like strokeRect(), strokeEllipse(), line()
*use it before you draw your objects*

#####ctx.strokeStyle
`ctx.strokeStyle = "red";`

`ctx.strokeStyle = rgb(red, green, blue);` // values from 0-255

`ctx.strokeStyle = rgba(red, green, alpha);` // alpha is values are 0-1


#####ctx.Stroke
`ctx.Stroke("red");`

`ctx.Stroke(red, green, blue);` // values from 0-255

`ctx.Stroke(red, green, blue, alpha);` // alpha is values are 0-1
# sound_and_video
