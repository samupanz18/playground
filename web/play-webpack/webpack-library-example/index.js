import {converttoword, converttonum} from './converts';

function createTranslator() {
    return {
        numtoword: num => {
            return num < 0 || num > 5 ? 'This is a failure' : converttoword(num);
        },
        wordtonum: word => {
            const num = converttonum(word);
            return num === -1 ? 'This is a failure' : num;
        }
    };
}

module.exports = createTranslator();
