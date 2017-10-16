function setupNewUser(info, callback) {
    var user = {
        name: info.name,
        nameLowercase: info.name.toLowercase()
    };

    try {
        Database.save(user, callback);
    } catch (err) {
        callback(err);
    }
}
