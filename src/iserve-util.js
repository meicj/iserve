import fs from 'fs';

const CLIENT_PLATFORM = {
    iOS: 0,
    Android: 1,
    Other: -1
};

export default {
    CLIENT_PLATFORM,
    existsDir(path)
    {
        try {
            const stat = fs.statSync(path);
            return stat.isDirectory();
        } catch (e) {
            return false;
        }
    },
    existsFile(path) {
        try {
            const stat = fs.statSync(path);
            return stat.isFile();
        } catch (e) {
            return false;

        }
    },
    determineClientPlatform(req) {
        const userAgent = req.get('User-Agent');

        if (userAgent.indexOf('iPhone;') >= 0) {
            return CLIENT_PLATFORM.iOS;
        } else if (userAgent.indexOf('Android') >= 0) {
            return CLIENT_PLATFORM.Android;
        }
        return CLIENT_PLATFORM.Other;
    }
}
