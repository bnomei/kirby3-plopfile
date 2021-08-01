module.exports.defaults = {
'file.changeName:before' : '$file, $name',
'file.changeName:after' : '$newFile, $oldFile',
'file.changeSort:before' : '$file, $position',
'file.changeSort:after' : '$newFile, $oldFile',
'file.create:before' : '$file, $upload',
'file.create:after' : '$file',
'file.delete:before' : '$file',
'file.delete:after' : '$status, $file',
'file.replace:before' : '$file, $upload',
'file.replace:after' : '$newFile, $oldFile',
'file.update:before' : '$file, $values, $strings',
'file.update:after' : '$newFile, $oldFile',
'kirbytags:before' : '$text, $data, $options',
'kirbytags:after' : '$text, $data, $options',
'kirbytext:before' : '$text',
'kirbytext:after' : '$text',
'page.changeNum:before' : '$page, $num',
'page.changeNum:after' : '$newPage, $oldPage',
'page.changeSlug:before' : '$page, $slug, $languageCode',
'page.changeSlug:after' : '$newPage, $oldPage',
'page.changeStatus:before' : '$page, $status, $position',
'page.changeStatus:after' : '$newPage, $oldPage',
'page.changeTemplate:before' : '$page, $template',
'page.changeTemplate:after' : '$newPage, $oldPage',
'page.changeTitle:before' : '$page, $title, $languageCode',
'page.changeTitle:after' : '$newPage, $oldPage',
'page.create:before' : '$page, $input',
'page.create:after' : '$page',
'page.delete:before' : '$page, $force',
'page.delete:after' : '$status, $page',
'page.duplicate:before' : '$originalPage, $input, $options',
'page.duplicate:after' : '$duplicatePage, $originalPage',
'page.update:before' : '$page, $values, $strings',
'page.update:after' : '$newPage, $oldPage',
'route:before' : '$route, $path, $method',
'route:after' : '$route, $path, $method, $result, $final',
'site.changeTitle:before' : '$site, $title, $languageCode',
'site.changeTitle:after' : '$newSite, $oldSite',
'site.update:before' : '$site, $values, $strings',
'site.update:after' : '$newSite, $oldSite',
'user.changeEmail:before' : '$user, $email',
'user.changeEmail:after' : '$newUser, $oldUser',
'user.changeLanguage:before' : '$user, $language',
'user.changeLanguage:after' : '$newUser, $oldUser',
'user.changeName:before' : '$user, $name',
'user.changeName:after' : '$newUser, $oldUser',
'user.changePassword:before' : '$user, $password',
'user.changePassword:after' : '$newUser, $oldUser',
'user.changeRole:before' : '$user, $role',
'user.changeRole:after' : '$newUser, $oldUser',
'user.create:before' : '$user, $input',
'user.create:after' : '$user',
'user.delete:before' : '$user',
'user.delete:after' : '$status, $user',
'user.login:before' : '$user, $session',
'user.login:after' : '$user, $session',
'user.logout:before' : '$user, $session',
'user.logout:after' : '$user, $session',
'user.update:before' : '$user, $values, $strings',
'user.update:after' : '$newUser, $oldUser',
'system.loadPlugins:after' : '',
'custom': '',
};

module.exports.all = function()
{
	let objects = [];
	Object.entries(this.defaults).forEach(function (value, index, arr) {
		const o = {
			index: index,
			name: value[0],
			value: value[0],
			params: value[1],
		};
		objects.push(o);
	})
	return objects;
}

module.exports.params = function(key) {
	return this.defaults[key];
}