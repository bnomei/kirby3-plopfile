plop blueprint $ pages blogpost .yml {}
plop template $ blogpost .php all
plop content "Consistency made simple!" blog blogpost {}
plop snippet $ slideshow all {}
plop plugin myname myplugin '' all all
plop ext-collection myplugin allBlogpages '' ''
plop blueprint myplugin pages contactform .yml {}
plop ext-blueprint myplugin contactform
plop template myplugin contactform .php all
plop ext-template myplugin contactform
plop ext-route myplugin form/submit '' POST '' ''
plop blueprint $ pages article .yml {}
plop content Hello blog default {}
plop blueprint $ fields cd .yml {}
plop blueprint $ fields dvd .yml cd.yml
plop config config.staging all '{"debug": true, "home": "staging" }'
plop content "Consistency, made easy!" blog default n123.json
plop file tests/image.png blog/consitency-made-easy hero '{"sort": 4}'
plop language de n ltr de_DE Deutsch de trans_de.yml
plop blueprint myplugin pages merch .yml {}
plop ext-blueprint myplugin merch
plop ext-blueprint myplugin pages/merch
plop snippet $ topnav all '{ "title": "title fallback", "isOpen": null }'
plop snippet myplugin slideshow all {}
plop ext-snippet myplugin slideshow
plop template $ booking .blade.php all
plop ext-hook myplugin page.changeStatus:after "if a blogpost is published make kirby send an email to client"