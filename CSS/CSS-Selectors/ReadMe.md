# CSS Selectors (Except)

TODO: Reformat the table

    All elements	* {..}
    All children	#container * {..}
    ALL a IN each li	li a {..}
    Only direct children IN each li	li > a {..}
    Only first immediately following p after each ul	ul + p
    All following p after each ul	ul ~ p {}
    All a with title attribut	a[title] {..}
    All a with href = “foo”	a[href=”foo”] {..}
    All a containing the given chunk somewhere it the attribut	a[href*=”chunk”] {..}
    Any Attribut containing the chunk, in this case “data”	a[data-*=”foo”]{..}
    All a with beginning “http” in the href attribut	a[href^=”http”] {..}
    … ending with “.jpg”	a[href$=”.jpg”]{..}
    foo has a spaced-separated list of values AND “xyz” is somewhere in the list	x[foo~=”xyz”]
    Checked radio buttons	input[type=radio]:checked {..}
    Checked check-boxes	input[type=checkbox]:checked {..}
    Append an element after an element	x:after {..}
    Exclude all divs with the id foo	div:not(#foo) {..}
    Exclude all divs with class bar	div:not(.bar) {..}
    All elements except each p	*:not(p) {..}
    tag::pseudoElement	x::pseudoElement {..}
    First lines of each p	p::first-line {..}
    First letter of each p	p::first-letter {..}
    nth-child (not zeo based integer)	x:nth-child(n) {..}
    nth from last child	x:nth-last-child(n) {..}
    Every second row	tr:nth-of-type(2) {..}
    From the end nth type	x:nth-last-of-type(n) {..}
    First child	x:first-child {..}
    Last child	x:last-child {..}
    With single child	x:only-child {..}
    All divs with a single p	div p:only-child {..}
    Without siblings in its parent	li:only-of-type {..}
    First children with a certain type	x:first-of-type {..}
    Link	a:link {..}
    Visited	a:visited {..}
    Hover	x:hover {..}
