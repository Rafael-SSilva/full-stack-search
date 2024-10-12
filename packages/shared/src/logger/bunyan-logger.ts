import bunyan from 'bunyan'

export const Applogger = bunyan.createLogger({
    name: 'THM',
    level: 'info',
    serializers: bunyan.stdSerializers
})