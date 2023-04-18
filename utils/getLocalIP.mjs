import os from 'node:os'
function getLocalIP() {
    const osType = os.type(); //系统类型
    const netInfo = os.networkInterfaces(); //网络信息
    let LocalIP = '';

    if (osType === 'Windows_NT') {
        // window操作系统
        // console.log(Object.keys(netInfo));
        for (let dev in netInfo) {
            /*
                win7的网络信息中显示为本地连接
                win10显示为以太网 以太网即插入网线的
                WLAN是连接wifi的
            */
            if (dev === 'WLAN') {
                // console.log(netInfo[dev]);
                netInfo[dev].forEach(item => {
                    if (item.family === 'IPv4') {
                        LocalIP = item.address;
                    }
                })
            } else if (dev === '本地连接' || dev === '以太网') {
                // console.log(netInfo[dev]);
                netInfo[dev].forEach(item => {
                    if (item.family === 'IPv4') {
                        LocalIP = item.address;
                    }
                })
            }
        }
    } else if (osType === 'Linux') {
        // linux操作系统
        LocalIP = netInfo.eth0[0].address;
    } else if (osType === 'Darwin') {
        // mac操作系统
        LocalIP = netInfo.eth0[0].address;
    } else {
        // 其他操作系统
        console.log(osType);
    }

    return LocalIP;
}
export default getLocalIP();