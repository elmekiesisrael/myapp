export class Debugger {

    private static ERROR: string = 'ERROR';
    private static WARN: string = 'WARN';
    private static INFO: string = 'INFO';
    private static DEBUG: string = 'DEBUG';

    static warn(msg: string) {
        Debugger.write(Debugger.WARN, msg);
    }

    static info(msg: string) {
        Debugger.write(Debugger.INFO, msg);
    }

    static error(msg: string) {
        Debugger.write(Debugger.ERROR, msg);
    }

    static debug(msg: string) {
        Debugger.write(Debugger.DEBUG, msg);
    }

    private static write(type: string, msg: string) {
        let currentDate = new Date();
        let space = type === Debugger.ERROR || type === Debugger.DEBUG ? ' ' : '  ';
        console.log('[' + type + ']' + space + currentDate.toLocaleDateString() + ' - ' + currentDate.toLocaleTimeString() + ' - ' + msg + '.')
    }


}