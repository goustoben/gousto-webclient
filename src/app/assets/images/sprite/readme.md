SVG
====

All svg files in this folder (assets/images/sprite) are generated into public/img/sprite.svg

### How to use
To use "icon-carrot.svg" just call {{ svg_path('icon-carrot') }} in your html

### Styling
You can overwrite the default svg params with css but do wrap this class in
a wrapper class or you will change all the carrots of the website
```
.class-wrapper {
	.icon-carrot {
		fill: $overwrite_default_black;
		width: 15px;
		height: 15px;
	}
}
```

### Convention
* Call any new svg "icon-name-secondpart.svg"
* SVG size do not matter but for consistency try to upload files that are 32x32px
* Although SVG whitespace on each border DO matter
* Set any stroke color to #0000 (better for compression)


### Useful reference
* Compare all different technique to use svg/sprites
https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/

* Reference about all blogs on svg
https://css-tricks.com/mega-list-svg-information/
