# ffmpeg

## Examples

```shell
ffmpeg -i ./tmp/frame%d.png output.gif

ffmpeg -framerate 10 -i ./tmp/frame%d.png \
  -c:v libx264 -r 30 -pix_fmt yuv420p out.mp4

convert -delay 10 -loop 0 ./tmp/*.png destionation.gif

i=1; while true; do webpmux -get frame $i '200w (3).webp' \
  -o ./tmp/frame$i.png || break; i=$((i+1)); done

mogrify -resize 200x ./tmp/*.png

convert -delay 10 -loop 0 -layers \
  Optimize ./tmp/*.png output_optimized.gif
```
