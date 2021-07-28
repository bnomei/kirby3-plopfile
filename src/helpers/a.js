module.exports.flip = function ( trans )
{
    let key;
    let tmp_ar = {};
    for ( key in trans ) {
        if ( trans.hasOwnProperty(key) ) {
            tmp_ar[trans[key]] = key;
        }
    }
    return tmp_ar;
}
