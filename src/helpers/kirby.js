const fg = require('fast-glob');

module.exports.root = function(root)
{
    if (root == 'user' || root == 'users') root = 'accounts';

    if (root == 'index') {
        const indexphp = fg.sync(['**/index.php'], { onlyFiles: true, absolute: true });
        if (indexphp.length) return indexphp[0].replace('/index.php', ''); 
    } else {
        const folder = fg.sync(['**/' + root], { onlyDirectories: true, absolute: true });
        if (folder.length) return folder[0];
    }

    return "./";
}
