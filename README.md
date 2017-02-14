# creative_coding_workshop

# create a drawing space
~ denotes you can leave these out
###ctx.createCanvas(canvas_id, ~canvas_width, ~canvas_height);


# Basic Objects

##draw a solid rectangle
`ctx.fillRect(x, y, width, height);`

##draw a rectangle outline
`ctx.strokeRect(x, y, width, height);`

##draw a solid circle
`ctx.fillEllipse(x, y, width, height);`

##draw a circle outline
`ctx.strokeEllipse(x, y, width, height);`

##draw a line
`ctx.line(x1, y1, x2, y2);`



# colours
Here's a helpful link: http://htmlcolorcodes.com/

## Change the background colour
- ctx.background("red"); // most colours have an english named variable
- ctx.background(red, blue, green); // values from 0-255
- ctx.background(red, blue, green, alpha); // alpha is values are 0-1
- ctx.background(grey); // alpha is values are 0-1


## change an object's fill colour
####use with filled objects like fillRect(), fillEllipse()
*use it before you draw your objects*

- ctx.fillStyle = "red";
- ctx.fillStyle = rgb(red, green, blue); // values from 0-255
- ctx.fillStyle = rgba(red, green, alpha); // alpha is values are 0-1
- ctx.fillStyle = rgb(grey); // draws grey fill

- ctx.Fill("red");
- ctx.Fill(red, green, blue); // values from 0-255
- ctx.Fill(red, green, blue, alpha); // alpha is values are 0-1
- ctx.Fill(grey); // draws grey fill


## change an objects stroke (line) colour
####use with stroked objects like strokeRect(), strokeEllipse(), line()
*use it before you draw your objects*

- ctx.strokeStyle = "red";
- ctx.strokeStyle = rgb(red, green, blue); // values from 0-255
- ctx.strokeStyle = rgba(red, green, alpha); // alpha is values are 0-1

- ctx.Stroke("red");
- ctx.Stroke(red, green, blue); // values from 0-255
- ctx.Stroke(red, green, blue, alpha); // alpha is values are 0-1
